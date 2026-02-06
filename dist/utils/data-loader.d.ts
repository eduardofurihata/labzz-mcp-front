interface CatalogEntry {
    file: string;
    description: string;
    category?: string;
    tags?: string[];
    components?: string[];
    layout?: string;
    screenshot?: string;
}
interface Catalog {
    _metadata: {
        description: string;
        source: string;
        version: string;
    };
    styles: Record<string, CatalogEntry>;
    layouts: Record<string, CatalogEntry>;
    components: Record<string, CatalogEntry>;
    pages: Record<string, CatalogEntry>;
}
export declare function loadCatalog(): Catalog;
export declare function readPattern(filePath: string): string;
export declare function getScreenshotBase64(screenshotPath: string): string;
export declare function searchCatalog(query: string): Array<{
    type: string;
    name: string;
    entry: CatalogEntry;
}>;
export {};
//# sourceMappingURL=data-loader.d.ts.map