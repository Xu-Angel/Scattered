# t

https://www.geekjc.com/post/5e22ce041092ab2060b8ae98

## 1\. 前言

做好错误监控，将用户使用时的错误日志上报，可以帮助我们更快的解决一些问题。目前开源的比较好的前端监控有

- [https://docs.sentry.io/](https://www.geekjc.com/?target=https://docs.sentry.io/ "https://docs.sentry.io/")

那前端监控是怎么实现的呢？要想了解这个，需要知道前端错误大概分为哪些以及如何捕获处理。

前端错误分为 JS 运行时错误、资源加载错误和接口错误三种。

## 2\. JS 运行时错误

JS 运行时错误一般使用 window.onerror 捕获，但是有一种特殊情况就是 promise 被 reject 并且错误信息没有被处理的时候抛出的错误

#### 2.1 一般情况的 JS 运行时错误

使用 window.onerror 和 window.addEventListener('error')捕获。其中 window.onerror 含有详细的 error 信息(error.stack)，而且兼容性更好，所以一般 JS 运行时错误使用 window.onerror 捕获处理

    window.onerror = function (msg, url, lineNo, columnNo, error)
        {
           // 处理error信息
        }

        window.addEventListener('error', event =>
        {
           console.log('addEventListener error:' + event.target);
        }, true);
        // true代表在捕获阶段调用，false代表在冒泡阶段捕获。使用true或false都可以

> 例子：[https://jsbin.com/lujahin/edit?html,console,output](https://www.geekjc.com/?target=https://jsbin.com/lujahin/edit?html,console,output "https://jsbin.com/lujahin/edit?html,console,output") 点击 button 抛出错误，分别被 window.onerror 和 window.addEventListener('error')捕获

#### 2.2 Uncaught (in promise)

当 promise 被 reject 并且错误信息没有被处理的时候，会抛出一个 unhandledrejection，并且这个错误不会被 window.onerror 以及 window.addEventListener('error')捕获，需要用专门的 window.addEventListener('unhandledrejection')捕获处理

    window.addEventListener('unhandledrejection', event =>
        {
           console.log('unhandledrejection:' + event.reason); // 捕获后自定义处理
        });

> [https://developer.mozilla.org](https://www.geekjc.com/?target=https://developer.mozilla.org "https://developer.mozilla.org")... 例子：[https://jsbin.com/jofomob/edit?html,console,output](https://www.geekjc.com/?target=https://jsbin.com/jofomob/edit?html,console,output "https://jsbin.com/jofomob/edit?html,console,output") 点击 button 抛出 unhandledrejection 错误，并且该错误仅能被 window.addEventListener('unhandledrejection')捕获

#### 2.3 console.error

一些特殊情况下，还需要捕获处理 console.error，捕获方式就是重写 window.console.error

    var consoleError = window.console.error;
    window.console.error = function () {
        alert(JSON.stringify(arguments)); // 自定义处理
        consoleError && consoleError.apply(window, arguments);
    };

> 例子：[https://jsbin.com/pemigew/edit?html,console,output](https://www.geekjc.com/?target=https://jsbin.com/pemigew/edit?html,console,output "https://jsbin.com/pemigew/edit?html,console,output")

#### 2.4 特别说明跨域日志

什么是跨域脚本 error？

> [https://developer.mozilla.org](https://www.geekjc.com/?target=https://developer.mozilla.org "https://developer.mozilla.org")... 当加载自不同域的脚本中发生语法错误时，为避免信息泄露（参见 bug 363897），语法错误的细节将不会报告，而代之简单的"Script error."。在某些浏览器中，通过在`<script>`使用 crossorigin 属性并要求服务器发送适当的 CORS HTTP 响应头，该行为可被覆盖。一个变通方案是单独处理"Script error."，告知错误详情仅能通过浏览器控制台查看，无法通过 JavaScript 访问。 例子: [http://sandbox.runjs.cn/show/](https://www.geekjc.com/?target=http://sandbox.runjs.cn/show/ "http://sandbox.runjs.cn/show/")... 请打开页面打开控制台。该页面分别加载了两个不同域的 js 脚本，配置了 crossorigin 的 window.onerror 可以报出详细的错误，没有配置 crossorigin 只能报出'script error'，并且没有错误信息

#### 2.5 特别说明 sourceMap

在线上由于 JS 一般都是被压缩或者打包（webpack）过，打包后的文件只有一行，因此报错会出现第一行第 5000 列出现 JS 错误，给排查带来困难。sourceMap 存储打包前的 JS 文件和打包后的 JS 文件之间一个映射关系，可以根据打包后的位置快速解析出对应源文件的位置。

但是出于安全性考虑，线上设置 sourceMap 会存在不安全的问题，因为网站使用者可以轻易的看到网站源码，此时可以设置.map 文件只能通过公司内网访问降低隐患

> sourceMap 配置 devtool: 'inline-source-map' 如果使用了 uglifyjs-webpack-plugin 必须把 sourceMap 设置为 true [https://doc.webpack-china.org](https://www.geekjc.com/?target=https://doc.webpack-china.org "https://doc.webpack-china.org")...

#### 2.6 其它

1.6.1 sentry 把所有的回调函数使用 try catch 封装一层 [https://github.com/getsentry/raven-js/blob/master/src/raven.js](https://www.geekjc.com/?target=https://github.com/getsentry/raven-js/blob/master/src/raven.js "https://github.com/getsentry/raven-js/blob/master/src/raven.js")

1.6.2 vue errorHandler [https://vuejs.org/v2/api/#errorHandler](https://www.geekjc.com/?target=https://vuejs.org/v2/api/#errorHandler "https://vuejs.org/v2/api/#errorHandler") 其原理也是使用 try catch 封装了 nextTick,\$emit, watch,data 等 [https://github.com/vuejs/vue/blob/dev/dist/vue.runtime.js](https://www.geekjc.com/?target=https://github.com/vuejs/vue/blob/dev/dist/vue.runtime.js "https://github.com/vuejs/vue/blob/dev/dist/vue.runtime.js")

## 3\. 资源加载错误

使用 window.addEventListener('error')捕获，window.onerror 捕获不到资源加载错误

> [https://jsbin.com/rigasek/edit?html,console](https://www.geekjc.com/?target=https://jsbin.com/rigasek/edit?html,console "https://jsbin.com/rigasek/edit?html,console") 图片资源加载错误。此时只有 window.addEventListener('error')可以捕获到 window.onerror 和 window.addEventListener('error')的异同:相同点是都可以捕获到 window 上的 js 运行时错误。区别是 1.捕获到的错误参数不同 2.window.addEventListener('error')可以捕获资源加载错误，但是 window.onerror 不能捕获到资源加载错误

## 4\. 接口错误

所有 http 请求都是基于 xmlHttpRequest 或者 fetch 封装的。所以要捕获全局的接口错误，方法就是封装 xmlHttpRequest 或者 fetch

#### 4.1 封装 xmlHttpRequest

    if(!window.XMLHttpRequest) return;
    var xmlhttp = window.XMLHttpRequest;
    var _oldSend = xmlhttp.prototype.send;
    var _handleEvent = function (event) {
        if (event && event.currentTarget && event.currentTarget.status !== 200) {
              // 自定义错误上报 }
    }
    xmlhttp.prototype.send = function () {
        if (this['addEventListener']) {
            this['addEventListener']('error', _handleEvent);
            this['addEventListener']('load', _handleEvent);
            this['addEventListener']('abort', _handleEvent);
        } else {
            var _oldStateChange = this['onreadystatechange'];
            this['onreadystatechange'] = function (event) {
                if (this.readyState === 4) {
                    _handleEvent(event);
                }
                _oldStateChange && _oldStateChange.apply(this, arguments);
            };
        }
        return _oldSend.apply(this, arguments);
    }

#### 4.2 封装 fetch

    if(!window.fetch) return;
        let _oldFetch = window.fetch;
        window.fetch = function () {
            return _oldFetch.apply(this, arguments)
            .then(res => {
                if (!res.ok) { // True if status is HTTP 2xx
                    // 上报错误
                }
                return res;
            })
            .catch(error => {
                // 上报错误
                throw error;
            })
    }

## 5\. 结论

1.  使用 window.onerror 捕获 JS 运行时错误
2.  使用 window.addEventListener('unhandledrejection')捕获未处理的 promise reject 错误
3.  重写 console.error 捕获 console.error 错误
4.  在跨域脚本上配置 crossorigin="anonymous"捕获跨域脚本错误
5.  window.addEventListener('error')捕获资源加载错误。因为它也能捕获 js 运行时错误，为避免重复上报 js 运行时错误，此时只有 event.srcElement inatanceof HTMLScriptElement 或 HTMLLinkElement 或 HTMLImageElement 时才上报
6.  重写 window.XMLHttpRequest 和 window.fetch 捕获请求错误
