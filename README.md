# labzz-mcp-front

MCP Server that exposes the Labzz design system for AI-assisted frontend development. This server is **stack-agnostic** and works with any frontend technology (React, Vue, Svelte, vanilla HTML/CSS, etc.).

## Features

- **14 Tools** for serving, generating, and validating design system patterns
- **Complete Design Tokens**: Colors, typography, spacing, shadows, animations, z-index layers
- **Component Specifications**: Button, Input, Card, Dialog, Tabs, Table, Alert, Badge, and more
- **Layout Patterns**: Grid system, navigation, page structures, responsive design
- **UX Guidelines**: Interactions, feedback, forms, modals, animations
- **Accessibility Rules**: WCAG compliance, keyboard navigation, screen reader support

## Installation

### Quick Install (Claude Code CLI)

**Option 1: Install from GitHub (recommended)**
```bash
claude mcp add labzz-mcp-front -- npx --yes github:eduardofurihata/labzz-mcp-front
```

**Option 2: Install from GitHub Packages**
```bash
claude mcp add labzz-mcp-front -- npx --yes --registry=https://npm.pkg.github.com @eduardofurihata/labzz-mcp-front
```

Verify installation:
```bash
claude mcp list
```

### Manual Installation (from source)

```bash
git clone https://github.com/eduardofurihata/labzz-mcp-front.git
cd labzz-mcp-front
npm install
npm run build
```

## Configuration

### Claude Code

Add to your `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "labzz-mcp-front": {
      "command": "node",
      "args": ["/path/to/labzz-mcp-front/dist/index.js"]
    }
  }
}
```

Or add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "labzz-mcp-front": {
      "command": "node",
      "args": ["./labzz-mcp-front/dist/index.js"]
    }
  }
}
```

### Cursor / Other MCP Clients

Configure according to your client's MCP server settings with:
- **Command**: `node`
- **Args**: `["/path/to/labzz-mcp-front/dist/index.js"]`
- **Type**: `stdio`

## Available Tools

### Serve Tools (Read Design System)

| Tool | Description |
|------|-------------|
| `get_design_tokens` | Get design tokens (colors, typography, spacing, etc.). Filter by category. |
| `get_component_spec` | Get complete specification for a UI component |
| `get_layout_patterns` | Get layout patterns (grid, navigation, page structures) |
| `get_ux_guidelines` | Get UX guidelines (interactions, feedback, forms, etc.) |
| `list_components` | List all available components |
| `get_full_design_system` | Get the complete design system in one call |

### Generate Tools (Create Code)

| Tool | Description |
|------|-------------|
| `generate_css` | Generate pure CSS for a component based on tokens |
| `generate_tailwind_classes` | Generate Tailwind CSS classes for a component |
| `generate_css_variables` | Generate complete CSS variables file |
| `generate_component_skeleton` | Generate HTML/JSX/Vue/Svelte markup for a component |

### Validate Tools (Check Compliance)

| Tool | Description |
|------|-------------|
| `validate_colors` | Validate if colors are in the design system |
| `validate_spacing` | Validate if spacing follows the 4px grid |
| `validate_component` | Validate component description against patterns |
| `audit_design` | Comprehensive design audit with scoring |

## Usage Examples

### Get Design Tokens

```
// Get all tokens
get_design_tokens()

// Get specific category
get_design_tokens({ category: "colors" })
get_design_tokens({ category: "typography" })
get_design_tokens({ category: "spacing" })
```

### Get Component Specification

```
get_component_spec({ component_name: "Button" })
get_component_spec({ component_name: "Card" })
get_component_spec({ component_name: "Dialog" })
```

### Generate Code

```
// Generate CSS for a button
generate_css({ component: "Button", variant: "primary" })

// Generate Tailwind classes
generate_tailwind_classes({ component: "Button", variant: "outline" })

// Generate React component skeleton
generate_component_skeleton({ component: "Card", framework: "react" })

// Generate CSS variables
generate_css_variables({ includeLight: true, includeDark: true })
```

### Validate Design

```
// Validate colors
validate_colors({ colors: ["#0D2872", "#FF0000", "#355EC4"] })

// Validate spacing
validate_spacing({ values: ["8px", "12px", "16px", "15px"] })

// Audit a design description
audit_design({
  description: "A blue button with 15px padding and Arial font"
})
```

## Design System Overview

### Colors

**Primary Palette:**
- Primary: `#0D2872` - Main brand color, CTAs
- Secondary: `#355EC4` - Secondary actions, links
- Accent: `#FFBE00` - Highlights, badges

**Semantic Colors:**
- Success: `#10b981`
- Warning: `#f59e0b`
- Error: `#ef4444`
- Info: `#3b82f6`

### Typography

- **Headings**: Space Grotesk (700)
- **Body**: Inter (400, 500, 600)
- **Scale**: xs (12px) to 6xl (60px)

### Spacing

Based on 4px grid system:
- `space-1`: 0.25rem (4px)
- `space-2`: 0.5rem (8px)
- `space-4`: 1rem (16px)
- `space-6`: 1.5rem (24px)
- `space-8`: 2rem (32px)

### Border Radius

- `sm`: 0.125rem (2px)
- `md`: 0.375rem (6px)
- `lg`: 0.5rem (8px)
- `xl`: 0.75rem (12px)
- `full`: 9999px (circular)

### Shadows

- `sm`: Subtle elevation
- `md`: Dropdowns, popovers
- `lg`: Modals, dialogs
- `xl`: Floating elements

## Components

The design system includes specifications for:

- **Button** - 6 variants (default, secondary, destructive, outline, ghost, link)
- **Input** - Text input with validation states
- **Card** - Container with header, content, footer
- **Dialog** - Modal dialogs with overlay
- **Tabs** - 4 variants (default, pills, underline, cards)
- **Table** - Data tables with sorting
- **Alert** - 4 variants (default, destructive, warning, success)
- **Badge** - Status indicators
- **Checkbox** - Boolean selection
- **Select** - Dropdown selection
- **Switch** - Toggle control
- **Textarea** - Multi-line input
- **Sheet** - Sliding panels (4 directions)
- **DropdownMenu** - Action menus
- **Skeleton** - Loading placeholders
- **Spinner** - Loading indicator
- **Toast** - Notifications

## Development

```bash
# Build
npm run build

# Watch mode
npm run dev

# Run server
npm start
```

## License

MIT
