const fs = require('fs');
const path = require('path');

module.exports = {
    $root: '/',
    '/filter-cs-order': {
        '$get': (req, res, next) => {
            res.send('get sfadfsa s');
        },
        '$post': (req, res, next) => {
            let data  = fs.readFileSync(path.join(__dirname, '../data/filterCsOrder.json'));
            res.json(JSON.parse(data));
         }
    }
};