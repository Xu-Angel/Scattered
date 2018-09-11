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



/*!todo:函数闭包写法 ！tddo: jQuery时期流行s;*/
var TextCount = (function(){
  //私有方法，外面将访问不到
  var _bind = function(that){
    that.input.on('keyup',function(){
      that.render();
    });
  }

  var _getNum = function(that){
    return that.input.val().length;
  }

  var TextCountFun = function(config){

  }

  TextCountFun.prototype.init = function(config) {
    this.input = $(config.id);
    _bind(this);

    return this;
  };

  TextCountFun.prototype.render = function() {
    var num = _getNum(this);

    if ($('#J_input_count').length == 0) {
      this.input.after('<span id="J_input_count"></span>');
    };

    $('#J_input_count').html(num+'个字');
  };
  //返回构造函数
  return TextCountFun;

})();

$(function() {
  new TextCount().init({id:'#J_input'}).render();
})