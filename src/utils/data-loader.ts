import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, '../../data');

export interface DesignTokens {
  colors: {
    light: Record<string, { value: string; hsl?: string; usage: string }>;
    dark: Record<string, { value: string; hsl?: string; usage: string }>;
    semantic: Record<string, { value: string; hsl?: string; usage: string }>;
    chart: Record<string, { value: string; usage: string }>;
  };
  typography: {
    fonts: Record<string, any>;
    scale: Record<string, any>;
    weights: Record<string, number>;
  };
  spacing: {
    base: string;
    scale: Record<string, string>;
    semantic: Record<string, any>;
  };
  borderRadius: Record<string, string>;
  shadows: Record<string, any>;
  animations: {
    durations: Record<string, string>;
    easings: Record<string, string>;
    keyframes: Record<string, any>;
  };
  zIndex: Record<string, string | number>;
  breakpoints: Record<string, string>;
  containers: Record<string, string>;
}

export interface ComponentSpec {
  description: string;
  variants?: Record<string, any>;
  sizes?: Record<string, any>;
  states?: Record<string, any>;
  baseStyles?: any;
  components?: Record<string, any>;
  properties?: any;
  accessibility?: any;
  [key: string]: any;
}

export interface LayoutPatterns {
  grid: any;
  flexbox: any;
  navigation: any;
  pageStructure: any;
  sections: any;
  responsive: any;
  spacing: any;
}

export interface UXGuidelines {
  interactions: any;
  feedback: any;
  forms: any;
  modals: any;
  navigation: any;
  responsiveness: any;
  animations: any;
  copywriting: any;
  darkMode: any;
}

export interface AccessibilityRules {
  colorContrast: any;
  focusManagement: any;
  touchTargets: any;
  screenReaders: any;
  keyboard: any;
  motion: any;
  forms: any;
  images: any;
  testing: any;
}

export interface DashboardComponentSpec {
  description: string;
  components?: Record<string, any>;
  properties?: any;
  props?: any;
  variants?: Record<string, any>;
  features?: any;
  dimensions?: any;
  structure?: any;
  responsive?: any;
  [key: string]: any;
}

export interface ChartSpec {
  description: string;
  components?: Record<string, any>;
  variants?: Record<string, any>;
  styling?: any;
  example?: any;
  [key: string]: any;
}

export interface ChartsData {
  overview: any;
  commonProps: any;
  AreaChart: ChartSpec;
  BarChart: ChartSpec;
  LineChart: ChartSpec;
  PieChart: ChartSpec;
  RadialBarChart: ChartSpec;
  ComposedChart: ChartSpec;
  sharedComponents: Record<string, any>;
  ChartCard: any;
  sparkline: any;
  accessibility: any;
  emptyState: any;
  loadingState: any;
}

let tokensCache: DesignTokens | null = null;
let dashboardComponentsCache: Record<string, DashboardComponentSpec> | null = null;
let componentsCache: Record<string, ComponentSpec> | null = null;
let layoutCache: LayoutPatterns | null = null;
let uxCache: UXGuidelines | null = null;
let accessibilityCache: AccessibilityRules | null = null;
let chartsCache: ChartsData | null = null;

function loadJSON<T>(filename: string): T {
  const filePath = join(DATA_DIR, filename);
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

export function loadTokens(): DesignTokens {
  if (!tokensCache) {
    tokensCache = loadJSON<DesignTokens>('tokens.json');
  }
  return tokensCache;
}

export function loadComponents(): Record<string, ComponentSpec> {
  if (!componentsCache) {
    componentsCache = loadJSON<Record<string, ComponentSpec>>('components.json');
  }
  return componentsCache;
}

export function loadLayout(): LayoutPatterns {
  if (!layoutCache) {
    layoutCache = loadJSON<LayoutPatterns>('layout.json');
  }
  return layoutCache;
}

export function loadUX(): UXGuidelines {
  if (!uxCache) {
    uxCache = loadJSON<UXGuidelines>('ux.json');
  }
  return uxCache;
}

export function loadAccessibility(): AccessibilityRules {
  if (!accessibilityCache) {
    accessibilityCache = loadJSON<AccessibilityRules>('accessibility.json');
  }
  return accessibilityCache;
}

export function loadDashboardComponents(): Record<string, DashboardComponentSpec> {
  if (!dashboardComponentsCache) {
    dashboardComponentsCache = loadJSON<Record<string, DashboardComponentSpec>>('dashboard-components.json');
  }
  return dashboardComponentsCache;
}

export function loadCharts(): ChartsData {
  if (!chartsCache) {
    chartsCache = loadJSON<ChartsData>('charts.json');
  }
  return chartsCache;
}

export function listChartNames(): string[] {
  const charts = loadCharts();
  return ['AreaChart', 'BarChart', 'LineChart', 'PieChart', 'RadialBarChart', 'ComposedChart'];
}

export function getChartSpec(name: string): ChartSpec | null {
  const charts = loadCharts();
  const chartMap: Record<string, ChartSpec> = {
    AreaChart: charts.AreaChart,
    BarChart: charts.BarChart,
    LineChart: charts.LineChart,
    PieChart: charts.PieChart,
    RadialBarChart: charts.RadialBarChart,
    ComposedChart: charts.ComposedChart,
  };
  return chartMap[name] || null;
}

export function getChartCommonProps(): any {
  const charts = loadCharts();
  return charts.commonProps;
}

export function getChartSharedComponents(): Record<string, any> {
  const charts = loadCharts();
  return charts.sharedComponents;
}

export function listDashboardComponentNames(): string[] {
  const components = loadDashboardComponents();
  return Object.keys(components);
}

export function getDashboardComponentSpec(name: string): DashboardComponentSpec | null {
  const components = loadDashboardComponents();
  return components[name] || null;
}

export function getFullDesignSystem() {
  return {
    tokens: loadTokens(),
    components: loadComponents(),
    dashboardComponents: loadDashboardComponents(),
    charts: loadCharts(),
    layout: loadLayout(),
    ux: loadUX(),
    accessibility: loadAccessibility(),
  };
}

export function listComponentNames(): string[] {
  const components = loadComponents();
  return Object.keys(components);
}

export function getComponentSpec(name: string): ComponentSpec | null {
  const components = loadComponents();
  return components[name] || null;
}

export function getTokenCategory(category: string): any {
  const tokens = loadTokens();
  const categoryMap: Record<string, any> = {
    colors: tokens.colors,
    typography: tokens.typography,
    spacing: tokens.spacing,
    borderRadius: tokens.borderRadius,
    shadows: tokens.shadows,
    animations: tokens.animations,
    zIndex: tokens.zIndex,
    breakpoints: tokens.breakpoints,
    containers: tokens.containers,
  };
  return categoryMap[category] || null;
}

export function getLayoutPattern(pattern: string): any {
  const layout = loadLayout();
  const patternMap: Record<string, any> = {
    grid: layout.grid,
    flexbox: layout.flexbox,
    navigation: layout.navigation,
    pageStructure: layout.pageStructure,
    sections: layout.sections,
    responsive: layout.responsive,
    spacing: layout.spacing,
  };
  return patternMap[pattern] || null;
}

export function getUXGuideline(topic: string): any {
  const ux = loadUX();
  const topicMap: Record<string, any> = {
    interactions: ux.interactions,
    feedback: ux.feedback,
    forms: ux.forms,
    modals: ux.modals,
    navigation: ux.navigation,
    responsiveness: ux.responsiveness,
    animations: ux.animations,
    copywriting: ux.copywriting,
    darkMode: ux.darkMode,
    carousel: (ux as any).carousel,
    countdown: (ux as any).countdown,
    dataVisualization: (ux as any).dataVisualization,
    emptyStates: (ux as any).emptyStates,
    onboarding: (ux as any).onboarding,
    notifications: (ux as any).notifications,
    tables: (ux as any).tables,
    errorBoundary: (ux as any).errorBoundary,
  };
  return topicMap[topic] || null;
}

export function listUXTopics(): string[] {
  return [
    'interactions',
    'feedback',
    'forms',
    'modals',
    'navigation',
    'responsiveness',
    'animations',
    'copywriting',
    'darkMode',
    'carousel',
    'countdown',
    'dataVisualization',
    'emptyStates',
    'onboarding',
    'notifications',
    'tables',
    'errorBoundary',
  ];
}
