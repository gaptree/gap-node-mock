const express = require('express');
const klawSync = require('klaw-sync');
const _ = require('lodash');
const path = require('path');


module.exports = (opts) => {
    const baseDir = opts.baseDir || process.cwd();
    const routerDir = path.join(baseDir, 'mock/routers');

    const methods = ['$get', '$post'];

    let files = klawSync(routerDir, {nodir: true});

    function destructFile(fileArr) {
        let target = {};
        for (let i = 0; i < fileArr.length; i++) {
            let filePath = fileArr[i].path;
            try {
                let routeObj = require(filePath);
                if (routeObj.$root) {
                    target[routeObj.$root] = Object.assign({}, target[routeObj.$root], routeObj);
                    delete target[routeObj.$root].$root;
                } else {
                    //自定义 '/' 根路由
                    target['/'] = Object.assign({}, target['/'], routeObj);
                }
            } catch (error) {
                console.log(error);
            }
        }

        return target;
    }

    function geneRouter(confs) {
        let router = express.Router();
        Object.keys(confs).forEach(key => {
            let routerConf = confs[key];
            if (key === '/') { //根路径
                Object.keys(routerConf).forEach(routeKey => {
                    bindRoute(routerConf, routeKey, '', router);
                })
            } else {
                Object.keys(routerConf).forEach(routeKey => {
                    bindRoute(routerConf, routeKey, key, router);
                })
            }
        })

        return router;
    }

    function bindRoute(routerConf, routeKey, rootPath, router) {
        let handler = routerConf[routeKey];
        routeKey = rootPath + routeKey;

        if (_.isFunction(handler)) {
            router.use(routeKey, handler)
        } else if (_.isObject(handler)) {
            if (methods.some((item) => {
                return handler[item];
            })) {
                methods.forEach(item => {
                    if (handler[item] && _.isFunction(handler[item])) {
                        router[item.toLowerCase().replace('$', '')](routeKey, handler[item]);
                    } else if (handler[item] && _.isObject(handler[item])) {
                        router[item.toLowerCase().replace('$', '')](routeKey, (req, res, next) => {
                            res.send(handler[item]);
                            next();
                        })
                    }
                })
            } else {
                router.use(routerKey, (req, res, next) => {
                    res.rend(handler[item]);
                    next();
                })
            }
        }
    }

    return geneRouter(destructFile(files));
}
