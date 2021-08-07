var defaultOptions = {
    headings: 'h1, h2, h3',
};

var HOME_HASH = '#/';

var createLink = function (src, level) {
    var a = document.createElement('a');
    var content = src.firstChild.innerHTML;

    // 设置级联
    while (--level > 0) {
        content = "&nbsp;&nbsp;&nbsp;&nbsp;" + content;
    }

    // 使用这个限制长度，未使用。
    // https://github.com/arendjr/text-clipper
    a.innerHTML = content;
    a.href = src.firstChild.href;
    // a.onclick = activeClass;
    a.style.textDecoration = 'none';
    a.addEventListener('click', activeClass);
    a.addEventListener('mouseover', function () {
        a.style.color = '#42b983';
    });
    a.addEventListener('mouseout', function () {
        a.style.color = '';
    });

    return a
};

var activeClass = function (event) {
    var divs = document.querySelectorAll('#jx-toc .toc-active');
    // 删除之前的样式
    [].forEach.call(divs, function (div) {
        div.setAttribute('class', '')
    });

    // 给当前点击的项加入新的样式
    event.target.parentNode.setAttribute('class', 'toc-active')
};

var initActivedToc = function () {
    var links = document.querySelectorAll('#jx-toc a');
    [].forEach.call(links, function (link) {
        if (link.href === window.location.href) {
            link.setAttribute('class', 'toc-active');
        }
    });
};

var initActivedSideBar = function () {
    var links = document.querySelectorAll('.sidebar a');
    [].forEach.call(links, function (link) {
        if (link.innerHTML !== $docsify.name && window.location.href.indexOf(link.href) !== -1) {
            link.setAttribute('class', 'active');
        }
    });
};

var createList = function (wrapper, count) {
    while (count--) {
        wrapper = wrapper.appendChild(
            document.createElement('ul')
        );
        if (count) {
            wrapper = wrapper.appendChild(
                document.createElement('li')
            );
        }
    }

    return wrapper;
};

var getHeaders = function (selector) {
    var allHeadings = document.querySelectorAll(selector);
    var ret = [];

    [].forEach.call(allHeadings, function (heading) {
        ret = ret.concat(heading);
    });

    return ret;
};

var getLevel = function (header) {
    var decs = header.match(/\d/g);

    return decs ? Math.min.apply(null, decs) : 1;
};

var jumpBack = function (currentWrapper, offset) {
    while (offset--) {
        currentWrapper = currentWrapper.parentElement;
    }

    return currentWrapper;
};

var buildTOC = function buildTOC(options) {
    var ret = document.createElement('ul');
    var wrapper = ret;
    var lastLi = null;
    var selector = '.markdown-section ' + options.headings
    var headers = getHeaders(selector).filter(h => h.id);

    headers.reduce(function (prev, curr, index) {
        var currentLevel = getLevel(curr.tagName);
        var offset = currentLevel - prev;

        wrapper = (offset > 0)
            ? createList(lastLi || ret, offset)
            : jumpBack(wrapper, -offset * 2)

        wrapper = wrapper || ret;

        var li = document.createElement('li');
        wrapper.appendChild(li).appendChild(createLink(curr, currentLevel));

        lastLi = li;

        return currentLevel;
    }, getLevel(options.headings));

    return ret;
};

// Docsify plugin functions
function plugin(hook, vm) {
    var userOptions = vm.config.jxtoc;

    hook.mounted(function () {
        var mainElm = document.querySelector("main");
        var content = window.Docsify.dom.find(".content");
        if (content) {

            // 小屏展示
            if (document.documentElement.clientWidth > 500) {
                var jxtoc = window.Docsify.dom.create("div", "");
                jxtoc.id = "jx-toc";

                window.Docsify.dom.before(mainElm, jxtoc);

                window.addEventListener('hashchange', function () {
                    if (window.location.hash === HOME_HASH) {
                        jxtoc.style.display = 'none';
                    } else if (localStorage.getItem('DARK_LIGHT_THEME') === 'dark') {
                        jxtoc.style.display = 'block';
                        jxtoc.style.background = '#363B40';
                        jxtoc.style.color = '#b4b4b4';
                        jxtoc.style.borderLeftColor = '#414344'
                    } else if (localStorage.getItem('DARK_LIGHT_THEME') === 'light') {
                        jxtoc.style.display = 'block';
                    }
                }, false);
            }
        }
    });

    hook.doneEach(function () {
        var jxtoc = document.getElementById('jx-toc');

        if (!jxtoc) {
            return;
        }
        jxtoc.innerHTML = null;

        const toc = buildTOC(userOptions);

        if (!toc.innerHTML) {
            return;
        }

        jxtoc.appendChild(toc);

        initActivedToc();
        initActivedSideBar();
    });

}

// Docsify plugin options
window.$docsify['jx-toc'] = Object.assign(defaultOptions, window.$docsify['jx-toc']);
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);
