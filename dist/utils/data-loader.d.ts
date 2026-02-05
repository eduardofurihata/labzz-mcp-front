export interface DesignTokens {
    colors: {
        light: Record<string, {
            value: string;
            hsl?: string;
            usage: string;
        }>;
        dark: Record<string, {
            value: string;
            hsl?: string;
            usage: string;
        }>;
        semantic: Record<string, {
            value: string;
            hsl?: string;
            usage: string;
        }>;
        chart: Record<string, {
            value: string;
            usage: string;
        }>;
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
export declare function loadTokens(): DesignTokens;
export declare function loadComponents(): Record<string, ComponentSpec>;
export declare function loadLayout(): LayoutPatterns;
export declare function loadUX(): UXGuidelines;
export declare function loadAccessibility(): AccessibilityRules;
export declare function loadDashboardComponents(): Record<string, DashboardComponentSpec>;
export declare function loadCharts(): ChartsData;
export declare function loadLandingComponents(): Record<string, any>;
export declare function loadEffects(): Record<string, any>;
export declare function loadPageTemplates(): Record<string, any>;
export declare function listPageTemplateNames(): string[];
export declare function getPageTemplate(name: string): any;
export declare function loadScreenshots(): Record<string, any>;
export declare function listScreenshotNames(): string[];
export declare function getScreenshotMeta(name: string): any;
export declare function getScreenshotBase64(name: string): {
    meta: any;
    base64: string;
} | null;
export declare function listLandingComponentNames(): string[];
export declare function getLandingComponentSpec(name: string): any;
export declare function listEffectNames(): string[];
export declare function getEffectSpec(name: string): any;
export declare function listChartNames(): string[];
export declare function getChartSpec(name: string): ChartSpec | null;
export declare function getChartCommonProps(): any;
export declare function getChartSharedComponents(): Record<string, any>;
export declare function listDashboardComponentNames(): string[];
export declare function getDashboardComponentSpec(name: string): DashboardComponentSpec | null;
export declare function getFullDesignSystem(): {
    tokens: DesignTokens;
    components: Record<string, ComponentSpec>;
    dashboardComponents: Record<string, DashboardComponentSpec>;
    landingComponents: Record<string, any>;
    effects: Record<string, any>;
    charts: ChartsData;
    pageTemplates: Record<string, any>;
    layout: LayoutPatterns;
    ux: UXGuidelines;
    accessibility: AccessibilityRules;
};
export declare function listComponentNames(): string[];
export declare function getComponentSpec(name: string): ComponentSpec | null;
export declare function getTokenCategory(category: string): any;
export declare function getLayoutPattern(pattern: string): any;
export declare function getUXGuideline(topic: string): any;
export declare function listUXTopics(): string[];
//# sourceMappingURL=data-loader.d.ts.map