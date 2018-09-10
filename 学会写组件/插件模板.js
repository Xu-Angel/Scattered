
(function() {
//严格模式
"user strict";
//默认参数
var options = {
    color: 'red'
}
 
var api = {
    //插件参数设定
    config: function (opts) {
        if(!opts) return options;
        for(var key in opts) {
            options[key] = opts[key];
        }
        return this;       //返回更新参数
    },
    //插件监听
    listen: function listen(elem) {
        if (typeof elem === 'string') {
            var elems = document.querySelectorAll(elem),
                i = elems.length;
                while (i--) {
                    listen(elems[i]);
                }
                return this;       //返回所有符合条件元素
        }
        //插件功能函数可以写在这...
        return this;
    }
}
//将API赋值给插件名字
this.pluginName = api;                //返回api接口
})()
 
// 对象链式调用：pluginName.config({color; ''}).listen('#elem');　　
