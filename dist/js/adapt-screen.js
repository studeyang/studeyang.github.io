function adaptScreenPlugin(hook, vm) {

    hook.beforeEach(function (content) {
        // alert(11);
        // 小屏展示
        if (document.documentElement.clientWidth < 500) {

        }
        return content
    });

    hook.afterEach(function (html, next) {

    });
}

// Docsify plugin options
window.$docsify.plugins = [].concat(adaptScreenPlugin, window.$docsify.plugins)
