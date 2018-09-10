;(function (underfined) {
  "use strict"
  var _global;
  //插件函数
  /*
  var plugin = {
      add: function (n1, n2) {
          return n1 + n2;
      },
      sub: function (n1, n2) {
          return n1 - n2;
      },
      mul: function (n1, n2) {
          return n1 * n2;
      }
  }
  */

  //插件API设置参数
  function result(args,fn) {
      var str = Array.prototype.slice.call(args);
      if (str.length > 0){
          return str.reduce(fn);
      } else {
          return 0;
      }
  }

  var plugin = {
      add: function () {                                           //加
          return result(arguments,function (pre,cur) {
              return pre + cur;
          });
      },
      mul: function () {                                            //减
          return result(arguments,function (pre,cur) {
              return pre + cur;
          });
      }
  }




  //最后将插件函数暴露给全局
  _global = (function () {
      return this || (0, eval)('this');
  }());
  if (typeof module !== 'undefined' && module.exports) {
      module.exports = plugin;
  } else if (typeof define === 'function' && define.amd) {
      define(function () {
          return plugin;
      });
  } else {
      !('plugin' in _global) && (_global.plugin = plugin);
  }

}());