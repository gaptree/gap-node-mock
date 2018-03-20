const express = require('express');
const _ = require('lodash');

module.exports = (confs) => {
    const router = express.Router();

    Object.keys(confs).forEach(key => {
        let routerConf = confs[key];
        if (key === '/') { //根路径
            Object.keys(routerConf).forEach(routeKey => {
                bindRoute(routerConf, routeKey, '', router);
            });
        } else {
            Object.keys(routerConf).forEach(routeKey => {
                bindRoute(routerConf, routeKey, key, router);
            });
        }
    });

    return router;
};

function bindRoute(routerConf, routeKey, rootPath, router) {
    let handler = routerConf[routeKey];
    routeKey = rootPath + routeKey;

    if (_.isFunction(handler)) {
        router.use(routeKey, handler);
    } else if (_.isObject(handler)) {
        if (['$get', '$post'].some((item) => {
            return handler[item];
        })) {
            ['$get', '$post'].forEach(item => {
                if (handler[item] && _.isFunction(handler[item])) {
                    router[item.toLowerCase().replace('$', '')](routeKey, handler[item]);
                } else if (handler[item] && _.isObject(handler[item])) {
                    router[item.toLowerCase().replace('$', '')](routeKey, (req, res, next) => {
                        res.send(handler[item]);
                        next();
                    });
                }
            });
        } else {
            router.use(routeKey, (req, res, next) => {
                res.rend(handler);
                next();
            });
        }
    }
}