const resolveFile = require('./lib/resolveFile');
const geneRouter = require('./lib/geneRouter');
const path = require('path');

module.exports = (opts) => {
    const mockDir = opts.mockDir || path.resolve(process.cwd(), 'mock');
    const routersDir = path.join(mockDir, 'routers');

    return geneRouter(resolveFile(routersDir));
}
