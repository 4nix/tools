// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^\)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^\/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],6:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
};

module.exports = reloadCSS;

},{"./bundle-url":7}],3:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":6}],4:[function(require,module,exports) {
class Form {
  contructor () {

  }

  // ---- File ---
  // min 5k, max 2M
  static checkFileSize (file, maxSize = 2097152, minSize = 5120) {
    return file.size >= minSize && file.size <= maxSize
  }

  static checkFileType (file) {
    return file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png'
  }

  // -- String --
  static checkEmpty (val) {
    return val.trim() ? true : false
  }

  static checkLength (val, min = 2, max = 50) {
    return val.length >= min && val.length <= max
  }

  // 长度, 中文2个字符, 其它1个字符
  static checkBLength (val, min = 2, max = 50) {
    let match = val.match(/[^\x00-\xff]/g)
    let len = val.length + (!match ? 0 : match.length)

    return len >= min && len <= max
  }

  // 检查真实姓名, 不支持\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}范围的字符
  static checkRealname (val) {
    // return Form.checkBLength(val, 4, 30) && /^[\u4e00-\u9fa5\u9FA6-\u9FCB\u3400-\u4DB5\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}]{2,6}$/u.test(val)
    // return Form.checkBLength(val, 4, 30) && /^[\u4e00-\u9fa5\u9FA6-\u9FCB\u3400-\u4DB5]{2,6}$/.test(val)
    return /^[\u4e00-\u9fa5\u9FA6-\u9FCB\u3400-\u4DB5]{2,6}$/.test(val)
  }

  static checkChineseame (val) {
    return /^[\u4e00-\u9fa5\u9FA6-\u9FCB\u3400-\u4DB5]{2,4}$/.test(val)
  }

  static checkTel (val) {
    return /^1[3|4|5|7|8][0-9]{9}$/.test(val)
  }

  static checkIde (val) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)
  }

  static check (value, type, tips, msg, ...args) {
    let test = args ? eval('Form.check' + type.replace(/\w/, L => L.toUpperCase()) + '(value, ...args)') : eval('Form.check' + type.replace(/\w/, L => L.toUpperCase()) + '(value)')

    if (test) {
      // yes 
    } else {
      // no
    }

    return test
  }

}
},{}],5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Layer {
  constructor() {
    if (Layer.instance !== undefined) {
      return Layer.instance;
    }

    this.mask = null;

    this.initMask();

    Layer.instance = this;
  }

  initMask() {
    if (this.mask) {
      return;
    }

    let dom = document.createElement('div');
    dom.style.position = 'fixed';
    dom.style.width = '100%';
    dom.style.height = '100%';
    dom.style.zIndex = 900;
    dom.style.left = 0;
    dom.style.right = 0;
    dom.style.backgroundColor = '#333';
    dom.style.opacity = 0.4;

    document.body.append(dom);
  }
}

exports.default = Layer;
},{}],2:[function(require,module,exports) {
"use strict";

var _Form = require("./components/Form");

var _Form2 = _interopRequireDefault(_Form);

var _Layer = require("./components/Layer");

var _Layer2 = _interopRequireDefault(_Layer);

require("./assets/layer.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let layer = new _Layer2.default();

console.log('s');
},{"./assets/layer.scss":3,"./components/Form":4,"./components/Layer":5}],0:[function(require,module,exports) {
var global = (1,eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent) {
  var ws = new WebSocket('ws://localhost:52572/');
  ws.onmessage = (e) => {
    var data = JSON.parse(e.data);

    if (data.type === 'update') {
      for (let asset of data.assets) {
        hmrApply(global.require, asset);
      }

      for (let asset of data.assets) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error(`[parcel] 🚨 ${data.error.message}\n${data.error.stack}`);
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  let parents = [];
  for (let k in modules) {
    for (let d in modules[k][1]) {
      let dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    let fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  let cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(id => hmrAccept(global.require, id));
}
},{}]},{},[0,2])