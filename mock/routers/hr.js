const fs = require('fs');
const path = require('path');

module.exports = {
    $root: '/hr',
    '/filter-hr': {
        '$get': (req, res, next) => {
            res.send('get hr');
        },
        '$post': (req, res, next) => {
            res.send('post hr');
         }
    }
};