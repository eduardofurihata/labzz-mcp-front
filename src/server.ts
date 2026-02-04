import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

import {
  loadTokens,
  loadComponents,
  loadLayout,
  loadUX,
  loadAccessibility,
  loadDashboardComponents,
  loadCharts,
  getFullDesignSystem,
  listComponentNames,
  getComponentSpec,
  getTokenCategory,
  getLayoutPattern,
  getUXGuideline,
  listUXTopics,
  listDashboardComponentNames,
  getDashboardComponentSpec,
  listChartNames,
  getChartSpec,
  getChartCommonProps,
  getChartSharedComponents,
} from './utils/data-loader.js';

// Tool definitions
const tools: Tool[] = [
  // === SERVE TOOLS ===
  {
    name: 'get_design_tokens',
    description: 'Get design tokens (colors, typography, spacing, shadows, animations, etc.). Optionally filter by category.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Token category to filter by: colors, typography, spacing, borderRadius, shadows, animations, zIndex, breakpoints, containers. Leave empty for all tokens.',
          enum: ['colors', 'typography', 'spacing', 'borderRadius', 'shadows', 'animations', 'zIndex', 'breakpoints', 'containers'],
        },
      },
    },
  },
  {
    name: 'get_component_spec',
    description: 'Get the complete specification for a UI component including variants, sizes, states, and accessibility guidelines.',
    inputSchema: {
      type: 'object',
      properties: {
        component_name: {
          type: 'string',
          description: 'Name of the component (e.g., Button, Card, Input, Dialog, Tabs, Table, Alert, Badge)',
        },
      },
      required: ['component_name'],
    },
  },
  {
    name: 'get_layout_patterns',
    description: 'Get layout patterns including grid system, navigation, page structures, and responsive design patterns.',
    inputSchema: {
      type: 'object',
      properties: {
        pattern: {
          type: 'string',
          description: 'Specific pattern to retrieve: grid, flexbox, navigation, pageStructure, sections, responsive, spacing. Leave empty for all patterns.',
          enum: ['grid', 'flexbox', 'navigation', 'pageStructure', 'sections', 'responsive', 'spacing'],
        },
      },
    },
  },
  {
    name: 'get_ux_guidelines',
    description: 'Get UX guidelines for interactions, feedback, forms, modals, animations, carousel, countdown, data visualization, empty states, onboarding, notifications, tables, and more.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'Specific topic. Leave empty for all guidelines.',
          enum: ['interactions', 'feedback', 'forms', 'modals', 'navigation', 'responsiveness', 'animations', 'copywriting', 'darkMode', 'carousel', 'countdown', 'dataVisualization', 'emptyStates', 'onboarding', 'notifications', 'tables', 'errorBoundary'],
        },
      },
    },
  },
  {
    name: 'list_components',
    description: 'List all available components in the design system.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_full_design_system',
    description: 'Get the complete design system in one call. Useful for initial context loading.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_dashboard_component_spec',
    description: 'Get the specification for a dashboard-specific component (PageHeader, MetricCard, DataTable, Sidebar, TopBar, etc.).',
    inputSchema: {
      type: 'object',
      properties: {
        component_name: {
          type: 'string',
          description: 'Name of the dashboard component (e.g., PageHeader, MetricCard, DataTable, Pagination, TopBar, Sidebar, DashboardLayout)',
        },
      },
      required: ['component_name'],
    },
  },
  {
    name: 'list_dashboard_components',
    description: 'List all available dashboard-specific components.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_chart_spec',
    description: 'Get the specification for a chart component (AreaChart, BarChart, LineChart, PieChart, RadialBarChart, ComposedChart).',
    inputSchema: {
      type: 'object',
      properties: {
        chart_name: {
          type: 'string',
          description: 'Name of the chart component',
          enum: ['AreaChart', 'BarChart', 'LineChart', 'PieChart', 'RadialBarChart', 'ComposedChart'],
        },
      },
      required: ['chart_name'],
    },
  },
  {
    name: 'list_charts',
    description: 'List all available chart components with their descriptions.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_chart_shared_components',
    description: 'Get shared chart components (Tooltip, Legend, XAxis, YAxis, CartesianGrid, etc.) that are used across all chart types.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_chart_common_props',
    description: 'Get common chart properties including colors, typography, grid settings, and animation defaults.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  // === GENERATE TOOLS ===
  {
    name: 'generate_css',
    description: 'Generate pure CSS for a component based on design tokens.',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Component name (e.g., Button, Input, Card)',
        },
        variant: {
          type: 'string',
          description: 'Component variant (e.g., primary, secondary, outline)',
        },
        options: {
          type: 'object',
          description: 'Generation options',
          properties: {
            includeHover: { type: 'boolean', default: true },
            includeFocus: { type: 'boolean', default: true },
            includeDarkMode: { type: 'boolean', default: false },
          },
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'generate_tailwind_classes',
    description: 'Generate Tailwind CSS classes for a component.',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Component name (e.g., Button, Input, Card)',
        },
        variant: {
          type: 'string',
          description: 'Component variant (e.g., primary, secondary, outline)',
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'generate_css_variables',
    description: 'Generate a complete CSS variables file for the design system.',
    inputSchema: {
      type: 'object',
      properties: {
        includeLight: { type: 'boolean', default: true, description: 'Include light mode variables' },
        includeDark: { type: 'boolean', default: true, description: 'Include dark mode variables' },
      },
    },
  },
  {
    name: 'generate_component_skeleton',
    description: 'Generate HTML/JSX markup structure for a component.',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Component name (e.g., Button, Card, Dialog)',
        },
        framework: {
          type: 'string',
          description: 'Target framework: html, react, vue, svelte',
          enum: ['html', 'react', 'vue', 'svelte'],
          default: 'html',
        },
      },
      required: ['component'],
    },
  },

  // === VALIDATE TOOLS ===
  {
    name: 'validate_colors',
    description: 'Validate if colors are part of the design system and get suggestions.',
    inputSchema: {
      type: 'object',
      properties: {
        colors: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of color values to validate (hex, rgb, or hsl)',
        },
      },
      required: ['colors'],
    },
  },
  {
    name: 'validate_spacing',
    description: 'Validate if spacing values follow the design system scale.',
    inputSchema: {
      type: 'object',
      properties: {
        values: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of spacing values to validate (e.g., "8px", "1rem", "16px")',
        },
      },
      required: ['values'],
    },
  },
  {
    name: 'validate_component',
    description: 'Validate a component description against design system patterns.',
    inputSchema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'Description of the component to validate (e.g., "A blue button with rounded corners and shadow")',
        },
      },
      required: ['description'],
    },
  },
  {
    name: 'audit_design',
    description: 'Perform a complete design audit on a full description.',
    inputSchema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'Full description of the design to audit',
        },
      },
      required: ['description'],
    },
  },
];

// Tool handlers
function handleGetDesignTokens(args: { category?: string }) {
  if (args.category) {
    const category = getTokenCategory(args.category);
    if (!category) {
      return { error: `Unknown category: ${args.category}. Available: colors, typography, spacing, borderRadius, shadows, animations, zIndex, breakpoints, containers` };
    }
    return { [args.category]: category };
  }
  return loadTokens();
}

function handleGetComponentSpec(args: { component_name: string }) {
  const spec = getComponentSpec(args.component_name);
  if (!spec) {
    const available = listComponentNames();
    return { error: `Component "${args.component_name}" not found. Available components: ${available.join(', ')}` };
  }
  return { [args.component_name]: spec };
}

function handleGetLayoutPatterns(args: { pattern?: string }) {
  if (args.pattern) {
    const pattern = getLayoutPattern(args.pattern);
    if (!pattern) {
      return { error: `Unknown pattern: ${args.pattern}. Available: grid, flexbox, navigation, pageStructure, sections, responsive, spacing` };
    }
    return { [args.pattern]: pattern };
  }
  return loadLayout();
}

function handleGetUXGuidelines(args: { topic?: string }) {
  if (args.topic) {
    const guideline = getUXGuideline(args.topic);
    if (!guideline) {
      const available = listUXTopics();
      return { error: `Unknown topic: ${args.topic}. Available: ${available.join(', ')}` };
    }
    return { [args.topic]: guideline };
  }
  return loadUX();
}

function handleListComponents() {
  const components = listComponentNames();
  return {
    count: components.length,
    components: components,
  };
}

function handleGetFullDesignSystem() {
  return getFullDesignSystem();
}

function handleGetDashboardComponentSpec(args: { component_name: string }) {
  const spec = getDashboardComponentSpec(args.component_name);
  if (!spec) {
    const available = listDashboardComponentNames();
    return { error: `Dashboard component "${args.component_name}" not found. Available components: ${available.join(', ')}` };
  }
  return { [args.component_name]: spec };
}

function handleListDashboardComponents() {
  const components = listDashboardComponentNames();
  return {
    count: components.length,
    components: components,
    categories: {
      layout: ['PageHeader', 'PageContainer', 'DashboardLayout'],
      navigation: ['TopBar', 'Sidebar'],
      dataDisplay: ['MetricCard', 'DataTable', 'Pagination'],
      feedback: ['SkeletonCard', 'SkeletonTable', 'SkeletonText'],
    },
  };
}

function handleGetChartSpec(args: { chart_name: string }) {
  const spec = getChartSpec(args.chart_name);
  if (!spec) {
    const available = listChartNames();
    return { error: `Chart "${args.chart_name}" not found. Available charts: ${available.join(', ')}` };
  }
  return { [args.chart_name]: spec };
}

function handleListCharts() {
  const charts = loadCharts();
  const chartNames = listChartNames();

  return {
    count: chartNames.length,
    charts: chartNames.map(name => ({
      name,
      description: (charts as any)[name]?.description || '',
    })),
    categories: {
      basic: ['LineChart', 'BarChart', 'AreaChart'],
      circular: ['PieChart', 'RadialBarChart'],
      advanced: ['ComposedChart'],
    },
    sharedComponents: ['XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'Legend', 'ReferenceLine', 'ResponsiveContainer'],
    utilities: ['ChartCard', 'sparkline', 'emptyState', 'loadingState'],
  };
}

function handleGetChartSharedComponents() {
  const sharedComponents = getChartSharedComponents();
  const charts = loadCharts();
  return {
    sharedComponents,
    ChartCard: charts.ChartCard,
    sparkline: charts.sparkline,
    accessibility: charts.accessibility,
    emptyState: charts.emptyState,
    loadingState: charts.loadingState,
  };
}

function handleGetChartCommonProps() {
  const commonProps = getChartCommonProps();
  const charts = loadCharts();
  return {
    commonProps,
    overview: charts.overview,
  };
}

function handleGenerateCSS(args: { component: string; variant?: string; options?: { includeHover?: boolean; includeFocus?: boolean; includeDarkMode?: boolean } }) {
  const spec = getComponentSpec(args.component);
  if (!spec) {
    return { error: `Component "${args.component}" not found.` };
  }

  const tokens = loadTokens();
  const variant = args.variant || 'default';
  const options = args.options || { includeHover: true, includeFocus: true, includeDarkMode: false };

  let css = `/* ${args.component} - ${variant} variant */\n`;
  css += `.${args.component.toLowerCase()} {\n`;

  // Base styles
  if (spec.baseStyles) {
    css += `  display: ${spec.baseStyles.display || 'inline-flex'};\n`;
    css += `  align-items: ${spec.baseStyles.alignItems || 'center'};\n`;
    css += `  justify-content: ${spec.baseStyles.justifyContent || 'center'};\n`;
    css += `  font-size: ${tokens.typography.scale.sm?.size || '0.875rem'};\n`;
    css += `  font-weight: ${spec.baseStyles.fontWeight || 500};\n`;
    css += `  border-radius: ${tokens.borderRadius.md || '0.375rem'};\n`;
    css += `  transition: all ${tokens.animations.durations.fast} ${tokens.animations.easings.default};\n`;
  }

  // Variant styles
  if (spec.variants && spec.variants[variant]) {
    const v = spec.variants[variant];
    if (v.background) {
      const bgColor = tokens.colors.light[v.background]?.value || v.background;
      css += `  background-color: ${bgColor};\n`;
    }
    if (v.color) {
      const textColor = tokens.colors.light[v.color]?.value || v.color;
      css += `  color: ${textColor};\n`;
    }
    if (v.border) {
      css += `  border: 1px solid ${tokens.colors.light.border?.value || '#e5e5e5'};\n`;
    }
  }

  // Size styles
  if (spec.sizes && spec.sizes.default) {
    const size = spec.sizes.default;
    css += `  height: ${size.height || '40px'};\n`;
    css += `  padding: ${size.padding || '0 16px'};\n`;
  }

  css += `}\n`;

  // Hover state
  if (options.includeHover && spec.variants?.[variant]?.hover) {
    css += `\n.${args.component.toLowerCase()}:hover {\n`;
    css += `  opacity: 0.9;\n`;
    css += `}\n`;
  }

  // Focus state
  if (options.includeFocus && spec.states?.focus) {
    css += `\n.${args.component.toLowerCase()}:focus-visible {\n`;
    css += `  outline: none;\n`;
    css += `  box-shadow: 0 0 0 2px ${tokens.colors.light.background?.value || '#fff'}, 0 0 0 4px ${tokens.colors.light.ring?.value || tokens.colors.light.primary?.value || '#0D2872'};\n`;
    css += `}\n`;
  }

  // Disabled state
  if (spec.states?.disabled) {
    css += `\n.${args.component.toLowerCase()}:disabled {\n`;
    css += `  opacity: 0.5;\n`;
    css += `  cursor: not-allowed;\n`;
    css += `  pointer-events: none;\n`;
    css += `}\n`;
  }

  // Dark mode
  if (options.includeDarkMode) {
    css += `\n@media (prefers-color-scheme: dark) {\n`;
    css += `  .${args.component.toLowerCase()} {\n`;
    if (spec.variants?.[variant]?.background) {
      const bgColor = tokens.colors.dark[spec.variants[variant].background]?.value;
      if (bgColor) css += `    background-color: ${bgColor};\n`;
    }
    css += `  }\n`;
    css += `}\n`;
  }

  return { css };
}

function handleGenerateTailwindClasses(args: { component: string; variant?: string }) {
  const spec = getComponentSpec(args.component);
  if (!spec) {
    return { error: `Component "${args.component}" not found.` };
  }

  const variant = args.variant || 'default';
  const classes: string[] = [];

  // Base classes
  if (spec.baseStyles?.classes) {
    classes.push(spec.baseStyles.classes);
  }

  // Variant classes
  if (spec.variants?.[variant]?.classes) {
    classes.push(spec.variants[variant].classes);
  } else if (spec.variants?.[variant]) {
    // Build classes from variant properties
    const v = spec.variants[variant];
    if (v.background) classes.push(`bg-${v.background}`);
    if (v.color) classes.push(`text-${v.color}`);
    if (v.hover) classes.push(`hover:bg-${v.hover}`);
  }

  // Size classes
  if (spec.sizes?.default?.classes) {
    classes.push(spec.sizes.default.classes);
  }

  // State classes
  if (spec.states?.focus?.classes) {
    classes.push(spec.states.focus.classes);
  }
  if (spec.states?.disabled?.classes) {
    classes.push(spec.states.disabled.classes);
  }

  // For components with direct classes property
  if (spec.properties?.classes) {
    classes.push(spec.properties.classes);
  }

  return {
    component: args.component,
    variant,
    classes: classes.filter(Boolean).join(' '),
    breakdown: classes.filter(Boolean),
  };
}

function handleGenerateCSSVariables(args: { includeLight?: boolean; includeDark?: boolean }) {
  const tokens = loadTokens();
  const includeLight = args.includeLight !== false;
  const includeDark = args.includeDark !== false;

  let css = '/* Labzz Design System - CSS Variables */\n\n';

  if (includeLight) {
    css += ':root {\n';
    css += '  /* Colors - Light Mode */\n';
    for (const [key, value] of Object.entries(tokens.colors.light)) {
      css += `  --${key}: ${(value as any).value};\n`;
    }
    css += '\n  /* Semantic Colors */\n';
    for (const [key, value] of Object.entries(tokens.colors.semantic)) {
      css += `  --${key}: ${(value as any).value};\n`;
    }
    css += '\n  /* Typography */\n';
    css += `  --font-heading: "${tokens.typography.fonts.heading.family}", ${tokens.typography.fonts.heading.fallback};\n`;
    css += `  --font-body: "${tokens.typography.fonts.body.family}", ${tokens.typography.fonts.body.fallback};\n`;
    for (const [key, value] of Object.entries(tokens.typography.scale)) {
      css += `  --text-${key}: ${(value as any).size};\n`;
    }
    css += '\n  /* Spacing */\n';
    for (const [key, value] of Object.entries(tokens.spacing.scale)) {
      css += `  --space-${key}: ${value};\n`;
    }
    css += '\n  /* Border Radius */\n';
    for (const [key, value] of Object.entries(tokens.borderRadius)) {
      css += `  --radius-${key}: ${value};\n`;
    }
    css += '\n  /* Shadows */\n';
    for (const [key, value] of Object.entries(tokens.shadows)) {
      if (typeof value === 'object' && 'value' in value) {
        css += `  --shadow-${key}: ${(value as any).value};\n`;
      }
    }
    css += '\n  /* Animation Durations */\n';
    for (const [key, value] of Object.entries(tokens.animations.durations)) {
      css += `  --duration-${key}: ${value};\n`;
    }
    css += '\n  /* Z-Index */\n';
    for (const [key, value] of Object.entries(tokens.zIndex)) {
      if (typeof value === 'number') {
        css += `  --z-${key}: ${value};\n`;
      }
    }
    css += '}\n';
  }

  if (includeDark) {
    css += '\n@media (prefers-color-scheme: dark) {\n';
    css += '  :root {\n';
    css += '    /* Colors - Dark Mode */\n';
    for (const [key, value] of Object.entries(tokens.colors.dark)) {
      css += `    --${key}: ${(value as any).value};\n`;
    }
    css += '  }\n';
    css += '}\n';

    css += '\n.dark {\n';
    css += '  /* Colors - Dark Mode (class-based) */\n';
    for (const [key, value] of Object.entries(tokens.colors.dark)) {
      css += `  --${key}: ${(value as any).value};\n`;
    }
    css += '}\n';
  }

  return { css };
}

function handleGenerateComponentSkeleton(args: { component: string; framework?: string }) {
  const spec = getComponentSpec(args.component);
  if (!spec) {
    return { error: `Component "${args.component}" not found.` };
  }

  const framework = args.framework || 'html';
  let code = '';

  const componentName = args.component;
  const className = componentName.toLowerCase();

  switch (framework) {
    case 'react':
      code = generateReactSkeleton(componentName, className, spec);
      break;
    case 'vue':
      code = generateVueSkeleton(componentName, className, spec);
      break;
    case 'svelte':
      code = generateSvelteSkeleton(componentName, className, spec);
      break;
    default:
      code = generateHTMLSkeleton(componentName, className, spec);
  }

  return { framework, code };
}

function generateHTMLSkeleton(name: string, className: string, spec: any): string {
  if (spec.components) {
    // Compound component
    let html = `<!-- ${name} Component -->\n`;
    for (const [subName, subSpec] of Object.entries(spec.components)) {
      const subClass = (subSpec as any).classes || '';
      html += `<div class="${subClass}">\n  <!-- ${subName} content -->\n</div>\n`;
    }
    return html;
  }

  const classes = spec.baseStyles?.classes || spec.properties?.classes || className;
  return `<!-- ${name} Component -->
<button class="${classes}">
  Button Text
</button>`;
}

function generateReactSkeleton(name: string, className: string, spec: any): string {
  const classes = spec.baseStyles?.classes || spec.properties?.classes || className;

  if (spec.components) {
    let jsx = `// ${name} Component\n`;
    jsx += `import { cn } from '@/lib/utils';\n\n`;

    for (const [subName, subSpec] of Object.entries(spec.components)) {
      const subClass = (subSpec as any).classes || '';
      jsx += `export function ${subName}({ className, children, ...props }) {\n`;
      jsx += `  return (\n`;
      jsx += `    <div className={cn("${subClass}", className)} {...props}>\n`;
      jsx += `      {children}\n`;
      jsx += `    </div>\n`;
      jsx += `  );\n`;
      jsx += `}\n\n`;
    }
    return jsx;
  }

  return `// ${name} Component
import { cn } from '@/lib/utils';

interface ${name}Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function ${name}({ className, variant = 'default', size = 'default', children, ...props }: ${name}Props) {
  return (
    <button
      className={cn(
        "${classes}",
        // Add variant and size classes here
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}`;
}

function generateVueSkeleton(name: string, className: string, spec: any): string {
  const classes = spec.baseStyles?.classes || spec.properties?.classes || className;

  return `<!-- ${name}.vue -->
<template>
  <button :class="buttonClasses" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
});

const buttonClasses = computed(() => [
  '${classes}',
  // Add variant and size classes here
]);
</script>`;
}

function generateSvelteSkeleton(name: string, className: string, spec: any): string {
  const classes = spec.baseStyles?.classes || spec.properties?.classes || className;

  return `<!-- ${name}.svelte -->
<script lang="ts">
  export let variant: 'default' | 'secondary' | 'outline' | 'ghost' = 'default';
  export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';

  $: buttonClasses = \`${classes}\`;
</script>

<button class={buttonClasses} {...$$restProps}>
  <slot />
</button>`;
}

function handleValidateColors(args: { colors: string[] }) {
  const tokens = loadTokens();
  const allColors: Record<string, string> = {};

  // Collect all color values
  for (const [key, value] of Object.entries(tokens.colors.light)) {
    allColors[(value as any).value.toLowerCase()] = key;
  }
  for (const [key, value] of Object.entries(tokens.colors.semantic)) {
    allColors[(value as any).value.toLowerCase()] = key;
  }

  const results = args.colors.map(color => {
    const normalized = color.toLowerCase().trim();
    const isValid = normalized in allColors;
    const tokenName = allColors[normalized];

    // Find closest match if not valid
    let suggestion = null;
    if (!isValid) {
      // Simple color distance check (could be improved)
      const suggestions = Object.entries(allColors)
        .map(([val, name]) => ({ value: val, name, distance: colorDistance(normalized, val) }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);
      suggestion = suggestions;
    }

    return {
      color,
      isValid,
      tokenName: tokenName || null,
      suggestions: suggestion,
    };
  });

  const validCount = results.filter(r => r.isValid).length;

  return {
    summary: {
      total: args.colors.length,
      valid: validCount,
      invalid: args.colors.length - validCount,
      score: Math.round((validCount / args.colors.length) * 100),
    },
    results,
  };
}

function colorDistance(c1: string, c2: string): number {
  // Very simple distance for hex colors
  if (!c1.startsWith('#') || !c2.startsWith('#')) return Infinity;

  const hex1 = c1.replace('#', '');
  const hex2 = c2.replace('#', '');

  if (hex1.length !== 6 || hex2.length !== 6) return Infinity;

  const r1 = parseInt(hex1.slice(0, 2), 16);
  const g1 = parseInt(hex1.slice(2, 4), 16);
  const b1 = parseInt(hex1.slice(4, 6), 16);

  const r2 = parseInt(hex2.slice(0, 2), 16);
  const g2 = parseInt(hex2.slice(2, 4), 16);
  const b2 = parseInt(hex2.slice(4, 6), 16);

  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function handleValidateSpacing(args: { values: string[] }) {
  const tokens = loadTokens();
  const validSpacing = new Set(Object.values(tokens.spacing.scale));

  // Also accept pixel equivalents
  const pxEquivalents: Record<string, string> = {};
  for (const [key, value] of Object.entries(tokens.spacing.scale)) {
    const rem = parseFloat(value);
    const px = rem * 16;
    pxEquivalents[`${px}px`] = value;
  }

  const results = args.values.map(value => {
    const normalized = value.trim().toLowerCase();
    const isValid = validSpacing.has(normalized) || normalized in pxEquivalents;

    let suggestion = null;
    if (!isValid) {
      // Find closest spacing value
      const targetPx = parseFloat(normalized);
      if (!isNaN(targetPx)) {
        const closest = Object.entries(tokens.spacing.scale)
          .map(([key, val]) => ({
            key,
            value: val,
            px: parseFloat(val) * 16,
            distance: Math.abs(parseFloat(val) * 16 - targetPx),
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3);
        suggestion = closest;
      }
    }

    return {
      value,
      isValid,
      equivalent: pxEquivalents[normalized] || null,
      suggestions: suggestion,
    };
  });

  const validCount = results.filter(r => r.isValid).length;

  return {
    summary: {
      total: args.values.length,
      valid: validCount,
      invalid: args.values.length - validCount,
      score: Math.round((validCount / args.values.length) * 100),
    },
    results,
    reference: {
      baseUnit: '4px',
      scale: tokens.spacing.scale,
    },
  };
}

function handleValidateComponent(args: { description: string }) {
  const tokens = loadTokens();
  const components = loadComponents();
  const ux = loadUX();
  const accessibility = loadAccessibility();

  const description = args.description.toLowerCase();
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Check for color mentions
  const colorKeywords = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink', 'gray', 'black', 'white'];
  const brandColors = ['primary', 'secondary', 'accent', 'destructive', 'muted'];

  for (const keyword of colorKeywords) {
    if (description.includes(keyword) && !brandColors.some(b => description.includes(b))) {
      issues.push(`Consider using semantic color names (primary, secondary, accent) instead of "${keyword}"`);
      score -= 5;
    }
  }

  // Check for proper component patterns
  const componentKeywords = ['button', 'input', 'card', 'modal', 'dialog', 'table', 'form'];
  const mentionedComponents = componentKeywords.filter(k => description.includes(k));

  if (mentionedComponents.length > 0) {
    suggestions.push(`Reference component specs: ${mentionedComponents.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}`);
  }

  // Check for spacing mentions
  const spacingPattern = /(\d+)\s*(px|rem|em)/gi;
  const spacingMatches = description.match(spacingPattern);
  if (spacingMatches) {
    for (const match of spacingMatches) {
      const px = parseInt(match);
      if (px % 4 !== 0 && !isNaN(px)) {
        issues.push(`Spacing value "${match}" doesn't follow 4px grid. Consider ${Math.round(px / 4) * 4}px`);
        score -= 3;
      }
    }
  }

  // Check for accessibility mentions
  const a11yKeywords = ['focus', 'hover', 'disabled', 'contrast', 'keyboard', 'screen reader'];
  const hasA11yConsideration = a11yKeywords.some(k => description.includes(k));
  if (!hasA11yConsideration) {
    suggestions.push('Consider adding accessibility features: focus states, keyboard navigation, ARIA labels');
  }

  // Check for responsive mentions
  const responsiveKeywords = ['mobile', 'responsive', 'tablet', 'desktop', 'breakpoint'];
  const hasResponsiveConsideration = responsiveKeywords.some(k => description.includes(k));
  if (!hasResponsiveConsideration) {
    suggestions.push('Consider responsive behavior for different screen sizes');
  }

  return {
    score: Math.max(0, score),
    conformance: score >= 80 ? 'Good' : score >= 60 ? 'Needs Improvement' : 'Poor',
    issues,
    suggestions,
    relevantSpecs: mentionedComponents.map(c => ({
      component: c.charAt(0).toUpperCase() + c.slice(1),
      hasSpec: c.charAt(0).toUpperCase() + c.slice(1) in components,
    })),
  };
}

function handleAuditDesign(args: { description: string }) {
  const colorResult = handleValidateComponent({ description: args.description });

  const tokens = loadTokens();
  const accessibility = loadAccessibility();

  const categories = {
    colors: { score: 100, issues: [] as string[], suggestions: [] as string[] },
    typography: { score: 100, issues: [] as string[], suggestions: [] as string[] },
    spacing: { score: 100, issues: [] as string[], suggestions: [] as string[] },
    accessibility: { score: 100, issues: [] as string[], suggestions: [] as string[] },
    responsiveness: { score: 100, issues: [] as string[], suggestions: [] as string[] },
    components: { score: 100, issues: [] as string[], suggestions: [] as string[] },
  };

  const description = args.description.toLowerCase();

  // Color audit
  const rawColors = ['blue', 'red', 'green', 'yellow', '#[0-9a-f]{6}', '#[0-9a-f]{3}'];
  for (const pattern of rawColors) {
    const regex = new RegExp(pattern, 'gi');
    if (regex.test(args.description)) {
      categories.colors.issues.push(`Found raw color value. Use design tokens instead.`);
      categories.colors.score -= 10;
      break;
    }
  }

  // Typography audit
  const fontKeywords = ['font-size', 'font-family', 'arial', 'helvetica', 'times'];
  for (const keyword of fontKeywords) {
    if (description.includes(keyword)) {
      categories.typography.issues.push(`Direct font specification found. Use typography tokens.`);
      categories.typography.score -= 10;
      break;
    }
  }

  // Spacing audit
  const oddSpacing = /\b(3|5|7|9|11|13|15|17|19|21|23|25|27|29|31)px\b/gi;
  if (oddSpacing.test(args.description)) {
    categories.spacing.issues.push('Non-standard spacing values found. Use 4px grid system.');
    categories.spacing.score -= 10;
  }

  // Accessibility audit
  if (!description.includes('focus') && !description.includes('keyboard')) {
    categories.accessibility.suggestions.push('No focus state mentioned. Ensure keyboard accessibility.');
    categories.accessibility.score -= 5;
  }
  if (!description.includes('contrast') && description.includes('text')) {
    categories.accessibility.suggestions.push('Consider color contrast for text elements.');
    categories.accessibility.score -= 5;
  }

  // Responsiveness audit
  if (!description.includes('mobile') && !description.includes('responsive')) {
    categories.responsiveness.suggestions.push('No responsive behavior specified. Consider mobile-first design.');
    categories.responsiveness.score -= 10;
  }

  // Calculate overall score
  const scores = Object.values(categories).map(c => c.score);
  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  return {
    overallScore,
    conformance: overallScore >= 80 ? 'Good' : overallScore >= 60 ? 'Needs Improvement' : 'Poor',
    categories,
    recommendations: [
      'Use design tokens for all colors, typography, and spacing',
      'Ensure all interactive elements have visible focus states',
      'Design mobile-first and enhance for larger screens',
      'Follow component specifications for consistency',
    ],
  };
}

// Create and configure the server
export function createServer() {
  const server = new Server(
    {
      name: 'labzz-mcp-front',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Register tool list handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  // Register tool call handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      let result: any;

      switch (name) {
        // Serve tools
        case 'get_design_tokens':
          result = handleGetDesignTokens(args as { category?: string });
          break;
        case 'get_component_spec':
          result = handleGetComponentSpec(args as { component_name: string });
          break;
        case 'get_layout_patterns':
          result = handleGetLayoutPatterns(args as { pattern?: string });
          break;
        case 'get_ux_guidelines':
          result = handleGetUXGuidelines(args as { topic?: string });
          break;
        case 'list_components':
          result = handleListComponents();
          break;
        case 'get_full_design_system':
          result = handleGetFullDesignSystem();
          break;
        case 'get_dashboard_component_spec':
          result = handleGetDashboardComponentSpec(args as { component_name: string });
          break;
        case 'list_dashboard_components':
          result = handleListDashboardComponents();
          break;
        case 'get_chart_spec':
          result = handleGetChartSpec(args as { chart_name: string });
          break;
        case 'list_charts':
          result = handleListCharts();
          break;
        case 'get_chart_shared_components':
          result = handleGetChartSharedComponents();
          break;
        case 'get_chart_common_props':
          result = handleGetChartCommonProps();
          break;

        // Generate tools
        case 'generate_css':
          result = handleGenerateCSS(args as { component: string; variant?: string; options?: any });
          break;
        case 'generate_tailwind_classes':
          result = handleGenerateTailwindClasses(args as { component: string; variant?: string });
          break;
        case 'generate_css_variables':
          result = handleGenerateCSSVariables(args as { includeLight?: boolean; includeDark?: boolean });
          break;
        case 'generate_component_skeleton':
          result = handleGenerateComponentSkeleton(args as { component: string; framework?: string });
          break;

        // Validate tools
        case 'validate_colors':
          result = handleValidateColors(args as { colors: string[] });
          break;
        case 'validate_spacing':
          result = handleValidateSpacing(args as { values: string[] });
          break;
        case 'validate_component':
          result = handleValidateComponent(args as { description: string });
          break;
        case 'audit_design':
          result = handleAuditDesign(args as { description: string });
          break;

        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ error: errorMessage }, null, 2),
          },
        ],
        isError: true,
      };
    }
  });

  return server;
}

export async function runServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Labzz MCP Front server running on stdio');
}
