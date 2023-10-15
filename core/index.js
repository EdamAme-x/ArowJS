// globalThis["div & etc..."] = (attrs, ...children) => {}
const Tags = [
    "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote",
    "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd",
    "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure",
    "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "i", "iframe", "img",
    "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "meta", "meter", "nav",
    "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress",
    "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong",
    "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead",
    "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "applet", "basefont", "big", "blink",
    "center", "command", "content", "dir", "element", "font", "frame", "frameset", "image", "isindex", "keygen",
    "listing", "marquee", "menu", "menuitem", "multicol", "nextid", "nobr", "noembed", "noframes", "plaintext",
    "shadow", "spacer", "strike", "tt", "xmp", "acronym", "bgsound", "dir", "frameset", "noframes", "tt",
    "video", "audio", "button", "details", "dialog", "summary", "template", "figcaption", "mark", "wbr"
];

for (let i = 0; i < Tags.length; i++) {
    globalThis[Tags[i]] = (attrs, ...children) => {
        const el = document.createElement(Tags[i]);

        if (attrs) {
            for (const key in attrs) {
                // $click ~ .addEventListener

                if (key.split('')[0] === '$') {
                    el.addEventListener(key.slice(1), attrs[key]);
                    continue;
                }

                el.setAttribute(key, attrs[key]);
            }
        }

        for (let j = 0; j < children.length; j++) {
            if (typeof children[j] === 'string' || typeof children[j] === 'number' || typeof children[j] === 'boolean' || typeof children[j] === 'undefined' || children[j] === null) {
                el.appendChild(document.createTextNode(children[j]));
            }
            else {
                el.appendChild(children[j]);
            }
        }
        return el;
    };
}

/**
 * Generates a universally unique identifier (UUID) in the format 'aw-xxxxxx'.
 *
 * @return {string} The generated UUID.
 */
function createUUID() {
    return 'aw-xxxxxx'.replace(/x/g, function (c) {
        var r = Math.random() * 16 | 0, v = r;
        return v.toString(16);
    });
}

/**
 * Generates a mount object for a component.
 *
 * @param {Object} componentObject - The component object.
 * @return {Object} The generated mount object.
 */

globalThis.ArowDOM = {
    DOM: null,
    initlize: function (el) {
        
    }
};

export function Arow(componentObject) {
    const mountObject = {
        ...componentObject,
        _view: null,
        renderToken: "",
        props: {},
        requestRender: function (props) {
            const uuid = createUUID();
            this.props = props;
            this.renderToken = uuid;
            this._view = this.view(this.props);
            this.changeDOM();
        },
        mount: function (element, props) {
            this.element = element;
            this.requestRender(props);
            globalThis.ArowDOM.initlize(element);
            globalThis.ArowDOM.DOM = this._view;
            this.isMount = true;
            // VDOM patch
        },
        changeDOM: function () {
            if (this.isMount) {
                return;
            }
            globalThis.ArowDOM.DOM = this._view;
        },
        patch: function (props) {
            this.requestRender(props);
            return this._view;
        },
        isMount: false
    };

    return mountObject;
}

