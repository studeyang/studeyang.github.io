function plugin(hook) {
    hook.beforeEach(function (html) {
        return (
            html +
            '\n\n---\n' +
            '> Last modified: {docsify-updated}'
        );
    });
}

window.$docsify.formatUpdated = '{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}';
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);