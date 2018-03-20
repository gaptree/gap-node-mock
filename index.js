const resolveFile = require('./lib/ResolveFile');
const geneRouter = require('./lib/GeneRouter');
const path = require('path');

module.exports = (opts) => {
    const mockDir = opts.mockDir || path.resolve(process.cwd(), 'mock');
    const routersDir = path.join(mockDir, 'routers');

    return geneRouter(resolveFile(routersDir));
}
