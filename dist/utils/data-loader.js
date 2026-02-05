import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '../../data');
let tokensCache = null;
let dashboardComponentsCache = null;
let componentsCache = null;
let layoutCache = null;
let uxCache = null;
let accessibilityCache = null;
let chartsCache = null;
let landingComponentsCache = null;
let effectsCache = null;
let pageTemplatesCache = null;
let screenshotsCache = null;
function loadJSON(filename) {
    const filePath = join(DATA_DIR, filename);
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
}
export function loadTokens() {
    if (!tokensCache) {
        tokensCache = loadJSON('tokens.json');
    }
    return tokensCache;
}
export function loadComponents() {
    if (!componentsCache) {
        componentsCache = loadJSON('components.json');
    }
    return componentsCache;
}
export function loadLayout() {
    if (!layoutCache) {
        layoutCache = loadJSON('layout.json');
    }
    return layoutCache;
}
export function loadUX() {
    if (!uxCache) {
        uxCache = loadJSON('ux.json');
    }
    return uxCache;
}
export function loadAccessibility() {
    if (!accessibilityCache) {
        accessibilityCache = loadJSON('accessibility.json');
    }
    return accessibilityCache;
}
export function loadDashboardComponents() {
    if (!dashboardComponentsCache) {
        dashboardComponentsCache = loadJSON('dashboard-components.json');
    }
    return dashboardComponentsCache;
}
export function loadCharts() {
    if (!chartsCache) {
        chartsCache = loadJSON('charts.json');
    }
    return chartsCache;
}
export function loadLandingComponents() {
    if (!landingComponentsCache) {
        landingComponentsCache = loadJSON('landing-components.json');
    }
    return landingComponentsCache;
}
export function loadEffects() {
    if (!effectsCache) {
        effectsCache = loadJSON('effects.json');
    }
    return effectsCache;
}
export function loadPageTemplates() {
    if (!pageTemplatesCache) {
        pageTemplatesCache = loadJSON('page-templates.json');
    }
    return pageTemplatesCache;
}
export function listPageTemplateNames() {
    const templates = loadPageTemplates();
    return Object.keys(templates).filter(key => !key.startsWith('_'));
}
export function getPageTemplate(name) {
    const templates = loadPageTemplates();
    return templates[name] || null;
}
export function loadScreenshots() {
    if (!screenshotsCache) {
        screenshotsCache = loadJSON('screenshots.json');
    }
    return screenshotsCache;
}
export function listScreenshotNames() {
    const screenshots = loadScreenshots();
    return Object.keys(screenshots).filter(key => !key.startsWith('_'));
}
export function getScreenshotMeta(name) {
    const screenshots = loadScreenshots();
    return screenshots[name] || null;
}
export function getScreenshotBase64(name) {
    const meta = getScreenshotMeta(name);
    if (!meta || !meta.file)
        return null;
    const filePath = join(DATA_DIR, meta.file);
    if (!existsSync(filePath))
        return null;
    const buffer = readFileSync(filePath);
    const base64 = buffer.toString('base64');
    return { meta, base64 };
}
export function listLandingComponentNames() {
    const components = loadLandingComponents();
    return Object.keys(components).filter(key => !key.startsWith('_'));
}
export function getLandingComponentSpec(name) {
    const components = loadLandingComponents();
    return components[name] || null;
}
export function listEffectNames() {
    const effects = loadEffects();
    return Object.keys(effects).filter(key => !key.startsWith('_'));
}
export function getEffectSpec(name) {
    const effects = loadEffects();
    return effects[name] || null;
}
export function listChartNames() {
    const charts = loadCharts();
    return ['AreaChart', 'BarChart', 'LineChart', 'PieChart', 'RadialBarChart', 'ComposedChart'];
}
export function getChartSpec(name) {
    const charts = loadCharts();
    const chartMap = {
        AreaChart: charts.AreaChart,
        BarChart: charts.BarChart,
        LineChart: charts.LineChart,
        PieChart: charts.PieChart,
        RadialBarChart: charts.RadialBarChart,
        ComposedChart: charts.ComposedChart,
    };
    return chartMap[name] || null;
}
export function getChartCommonProps() {
    const charts = loadCharts();
    return charts.commonProps;
}
export function getChartSharedComponents() {
    const charts = loadCharts();
    return charts.sharedComponents;
}
export function listDashboardComponentNames() {
    const components = loadDashboardComponents();
    return Object.keys(components);
}
export function getDashboardComponentSpec(name) {
    const components = loadDashboardComponents();
    return components[name] || null;
}
export function getFullDesignSystem() {
    return {
        tokens: loadTokens(),
        components: loadComponents(),
        dashboardComponents: loadDashboardComponents(),
        landingComponents: loadLandingComponents(),
        effects: loadEffects(),
        charts: loadCharts(),
        pageTemplates: loadPageTemplates(),
        layout: loadLayout(),
        ux: loadUX(),
        accessibility: loadAccessibility(),
    };
}
export function listComponentNames() {
    const components = loadComponents();
    return Object.keys(components);
}
export function getComponentSpec(name) {
    const components = loadComponents();
    return components[name] || null;
}
export function getTokenCategory(category) {
    const tokens = loadTokens();
    const categoryMap = {
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
export function getLayoutPattern(pattern) {
    const layout = loadLayout();
    const patternMap = {
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
export function getUXGuideline(topic) {
    const ux = loadUX();
    const topicMap = {
        interactions: ux.interactions,
        feedback: ux.feedback,
        forms: ux.forms,
        modals: ux.modals,
        navigation: ux.navigation,
        responsiveness: ux.responsiveness,
        animations: ux.animations,
        copywriting: ux.copywriting,
        darkMode: ux.darkMode,
        carousel: ux.carousel,
        countdown: ux.countdown,
        dataVisualization: ux.dataVisualization,
        emptyStates: ux.emptyStates,
        onboarding: ux.onboarding,
        notifications: ux.notifications,
        tables: ux.tables,
        errorBoundary: ux.errorBoundary,
    };
    return topicMap[topic] || null;
}
export function listUXTopics() {
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
//# sourceMappingURL=data-loader.js.map