const themePlugin = (hook, vm) => {
    let themeConfig = {
        siteFont: 'Arial',
        defaultTheme: 'light',
        codeFontFamily: 'Roboto Mono, Monaco, courier, monospace',
        bodyFontSize: '17px',
        light: {
            accent: '#42b983',
            toogleBackground: '#091a28',
            background: '#ffffff',
            textColor: '#34495e',
            codeTextColor: '#525252',
            codeBackgroundColor: '#f8f8f8',
            borderColor: 'rgba(0, 0, 0, 0.07)',
            blockQuoteColor: '#A8A8A8',
            highlightColor: '#d22778',
            sidebarSublink: '#505d6b',
            codeTypeColor: '#091a28',
            coverBackground:
                'linear-gradient(to left bottom, hsl(118, 100%, 85%) 0%,hsl(181, 100%, 85%) 100%)',
            toogleImage:
                'url(https://cdn.jsdelivr.net/npm/docsify-darklight-theme@latest/icons/moon.svg)',
        },
        dark: {
            accent: '#42b983',
            toogleBackground: '#ffffff',
            background: '#363B40',
            textColor: '#b4b4b4',
            codeTextColor: '#ffffff',
            codeBackgroundColor: '#2E3033',
            borderColor: '#0d2538',
            blockQuoteColor: '#636363',
            highlightColor: '#d22778',
            sidebarSublink: '#b4b4b4',
            codeTypeColor: '#ffffff',
            coverBackground:
                'linear-gradient(to left bottom, hsl(118, 100%, 85%) 0%,hsl(181, 100%, 85%) 100%)',
            toogleImage:
                'url(https://cdn.jsdelivr.net/npm/docsify-darklight-theme@latest/icons/sun.svg)',
        },
    };

    var setTheme = (theme) => {
        themeConfig.defaultTheme = theme;
        var toc = document.getElementById('jx-toc');

        if (theme === 'light') {
            localStorage.setItem('DARK_LIGHT_THEME', 'light');

            for (var [key, value] of Object.entries(themeConfig.light)) {
                document.documentElement.style.setProperty('--' + key, value)
            }

            // toc目录属性
            if (toc && window.location.hash === HOME_HASH) {
                toc.style.display = 'none';
            } else if (toc) {
                toc.style.background = 'var(--background)';
                toc.style.color = 'var(--textColor)';
                toc.style.borderLeftColor = 'var(--sidebar-border-color, #00000012)'
            }

        } else if (theme === 'dark') {
            localStorage.setItem('DARK_LIGHT_THEME', 'dark');
            for (var [key, value] of Object.entries(themeConfig.dark)) {
                document.documentElement.style.setProperty('--' + key, value)
            }

            // toc目录属性
            if (toc && window.location.hash === HOME_HASH) {
                toc.style.display = 'none';
            } else if (toc) {
                toc.style.background = 'var(--background)';
                toc.style.color = '#b4b4b4';
                toc.style.borderLeftColor = '#414344'
            }
        }

        document.documentElement.style.setProperty('color-scheme', theme)
    };

    if (vm.config.hasOwnProperty('darklightTheme')) {
        for (var [key, value] of Object.entries(vm.config.darklightTheme)) {
            if (key !== 'light' && key !== 'dark' && key !== 'defaultTheme') {
                themeConfig[key] = value
            }
        }

        for (var [key, value] of Object.entries(themeConfig)) {
            if (key !== 'light' && key !== 'dark') {
                themeConfig[key] = value;
                document.documentElement.style.setProperty('--' + key, value)
            }
        }

        if (vm.config.darklightTheme.hasOwnProperty('dark')) {
            for (var [key, value] of Object.entries(vm.config.darklightTheme.dark)) {
                themeConfig.dark[key] = value
            }
        }

        if (vm.config.darklightTheme.hasOwnProperty('light')) {
            for (var [key, value] of Object.entries(vm.config.darklightTheme.light))
                themeConfig.light[key] = value
        }
        setTheme(vm.config.darklightTheme)
    } else {
        for (var [key, value] of Object.entries(themeConfig)) {
            if (key !== 'light' && key !== 'dark') {
                themeConfig[key] = value;
                document.documentElement.style.setProperty('--' + key, value)
            }
        }
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeConfig.defaultTheme = 'dark'
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        themeConfig.defaultTheme = 'light'
    }

    hook.beforeEach(function (content) {
        // 小屏展示
        if (document.documentElement.clientWidth < 500) {
            var main = document.querySelector('.markdown-section');
            main.style.margin = '0 auto';
        }
        return content
    });

    hook.afterEach(function (html, next) {
        var darkEl = `<div id="docsify-darklight-theme"><p>.</p></div>`;
        html = `${darkEl}${html}`;
        next(html);
    });

    hook.doneEach(function () {
        let savedTheme = localStorage.getItem('DARK_LIGHT_THEME');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            themeConfig.defaultTheme = savedTheme;
            setTheme(themeConfig.defaultTheme)
        } else {
            setTheme(themeConfig.defaultTheme)
        }

        document.getElementById('docsify-darklight-theme')
            .addEventListener('click', function () {
                themeConfig.defaultTheme === 'light'
                    ? setTheme('dark')
                    : setTheme('light')
            })
    })
};

window.$docsify.plugins = [].concat(themePlugin, window.$docsify.plugins);
