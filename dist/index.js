#!/usr/bin/env node
import { runServer, runHttpServer } from './server.js';
const isHttpMode = process.env.MCP_HTTP === 'true' || process.argv.includes('--http');
const port = parseInt(process.env.MCP_PORT || '3000', 10);
if (isHttpMode) {
    runHttpServer(port).catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}
else {
    runServer().catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map