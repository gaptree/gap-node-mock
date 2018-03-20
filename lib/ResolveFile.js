const path = require('path');
const klawSync = require('klaw-sync');

module.exports = (routersDir) => {
    
    let files = klawSync(routersDir, {nodir: true});
    let fruit = {};

    for (let i = 0; i < files.length; i++) {
        let filePath = files[i].path;
        try {
            let routeObj = require(filePath);
            if (routeObj.$root) {
                fruit[routeObj.$root] = Object.assign({}, fruit[routeObj.$root], routeObj);
                delete fruit[routeObj.$root].$root;
            } else {
                //自定义 '/' 根路由
                fruit['/'] = Object.assign({}, fruit['/'], routeObj);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return fruit;
}
