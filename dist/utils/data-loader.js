import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', '..', 'data');
let catalogCache = null;
export function loadCatalog() {
    if (catalogCache)
        return catalogCache;
    const raw = readFileSync(join(DATA_DIR, 'catalog.json'), 'utf-8');
    catalogCache = JSON.parse(raw);
    return catalogCache;
}
export function readPattern(filePath) {
    return readFileSync(join(DATA_DIR, filePath), 'utf-8');
}
export function getScreenshotBase64(screenshotPath) {
    const fullPath = join(DATA_DIR, screenshotPath);
    const buffer = readFileSync(fullPath);
    return buffer.toString('base64');
}
export function searchCatalog(query) {
    const catalog = loadCatalog();
    const terms = query.toLowerCase().split(/\s+/);
    const results = [];
    for (const [type, entries] of Object.entries(catalog)) {
        if (type === '_metadata')
            continue;
        for (const [name, entry] of Object.entries(entries)) {
            const searchable = [
                name,
                entry.description || '',
                entry.category || '',
                ...(entry.tags || []),
            ].join(' ').toLowerCase();
            const score = terms.filter(t => searchable.includes(t)).length;
            if (score > 0) {
                results.push({ type, name, entry, score });
            }
        }
    }
    return results
        .sort((a, b) => b.score - a.score)
        .map(({ type, name, entry }) => ({ type, name, entry }));
}
//# sourceMappingURL=data-loader.js.map