## 前端必须要懂的浏览器缓存机制

> [左鹏飞](https://github.com/zuopf769) 2017.09.25


本文详细讲解了浏览器端缓存的分类：200 from cache和304 not modified；介绍了http1.1 header Cache-Control的max-age和http1.0 header Expires的区别；介绍了http1.1 header Etag、If-None-Match和http1.0 header Last-Modified、If-Modified-Since的区别。


### 1. 什么是浏览器缓存？

浏览器通常会将常用资源缓存在你的个人电脑的磁盘和内存中。如Chrome浏览器的缓存存放位置就在：`\Users\Your_Account\AppData\Local\Google\Chrome\User Data\Default`中的`Cache`文件夹和`Media Cache`文件夹中。

### 2. 什么是静态资源服务器？

在一般的网站中，静态资源使用频率高，流量占用大。对于访问量稍大的网站，都会把静态资源放置到 CDN 服务器，不占用业务服务器的网络带宽，而达到更好的用户体验。

### 3. 浏览器请求静态资源的流程

![](https://github.com/zuopf769/notebook/blob/master/fe/%E5%89%8D%E7%AB%AF%E5%BF%85%E9%A1%BB%E8%A6%81%E6%87%82%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/1.png)


对于前端开发者来说，我们主要跟浏览器中的缓存打交道，上图流程是简化版的;事实上在实际应用中通常采用静态资源服务器（CDN）。



### 4. 浏览器端缓存的分类

下面这张图展示了某一网站，对不同资源的请求结果，其中可以看到有的资源直接从缓存中读取，有的资源跟服务器进行了再验证，有的资源重新从服务器端获取。

![](https://github.com/zuopf769/notebook/blob/master/fe/%E5%89%8D%E7%AB%AF%E5%BF%85%E9%A1%BB%E8%A6%81%E6%87%82%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/2.png)


+ 200 from cache
+ 304 not modified

注意，我们讨论的所有关于缓存资源的问题，都仅仅针对`GET`请求。而对于`POST`, `DELETE`, `PUT`这类行为性操作通常不做任何缓存。


### 5. Cache-Control和Expires

+ Cache-Control是HTTP1.1中新增的响应头
+ Expires是HTTP1.0中的响应头
+ Cache-Control使用的是相对时间
+ Expires指定的是具体的过期日期而不是秒数。因为很多服务器跟客户端存在时钟不一致的情况，所以最好还是使用Cache-Control.
+ Cache-Control和Expires同时使用的话，Cache-Control会覆盖Expires

### 6. Cache-Control都可以设置哪些属性

+ max-age（单位为s）

> 指定设置缓存最大的有效时间，定义的是时间长短。当浏览器向服务器发送请求后，在max-age这段时间里浏览器就不会再向服务器发送请求了。

+ public 

> 指定响应可以在代理缓存中被缓存，于是可以被多用户共享。如果没有明确指定private，则默认为public。


+ private 

> 响应只能在私有缓存中被缓存，不能放在代理缓存上。对一些用户信息敏感的资源，通常需要设置为private。


+ no-cache

> 表示必须先与服务器确认资源是否被更改过（依靠If-None-Match和Etag），然后再决定是否使用本地缓存。


+ no-store 

> 绝对禁止缓存任何资源，也就是说每次用户请求资源时，都会向服务器发送一个请求，每次都会下载完整的资源。通常用于机密性资源。


关于Cache-Control的使用，见下面这张图

![](https://github.com/zuopf769/notebook/blob/master/fe/%E5%89%8D%E7%AB%AF%E5%BF%85%E9%A1%BB%E8%A6%81%E6%87%82%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/3.png)



### 7.新鲜度限值

HTTP通过缓存将服务器资源的副本保留一段时间，这段时间称为新鲜度限值。这在一段时间内请求相同资源不会再通过服务器。HTTP协议中Cache-Control 和 Expires可以用来设置新鲜度的限值，前者是HTTP1.1中新增的响应头，后者是HTTP1.0中的响应头。二者所做的事时都是相同的，但由于Cache-Control使用的是相对时间，而Expires可能存在客户端与服务器端时间不一样的问题，所以我们更倾向于选择Cache-Control。

html代码

```
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
    <title>Web Cache</title>
    <link rel="shortcut icon" href="./shortcut.png">
    <script>
    </script>
  </head>
  <body class="claro">
  <img src="./cache.png">
  </body>
</html>
```
node服务端代码

```
var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    if (req.url === '/' || req.url === '' || req.url === '/index.html') {
        fs.readFile('./index.html', function(err, file) {
            console.log(req.url)
            //对主文档设置缓存，无效果
            res.setHeader('Cache-Control', "no-cache, max-age=" + 5);
            res.setHeader('Content-Type', 'text/html');
            res.writeHead('200', "OK");
            res.end(file);
        });
    }
    if (req.url === '/cache.png') {
        fs.readFile('./cache.png', function(err, file) {
            res.setHeader('Cache-Control', "max-age=" + 5);//缓存五秒
            res.setHeader('Content-Type', 'images/png');
            res.writeHead('200', "Not Modified");
            res.end(file);
        });
    }
    
}).listen(8888);
```

当在5秒内第二次访问页面时，浏览器会直接从缓存中取得资源

![](https://github.com/zuopf769/notebook/blob/master/fe/%E5%89%8D%E7%AB%AF%E5%BF%85%E9%A1%BB%E8%A6%81%E6%87%82%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/4.png)


### 8.服务器再验证

浏览器或代理缓存中缓存的资源过期了，并不意味着它和原始服务器上的资源有实际的差异，仅仅意味着到了要进行核对的时间了。这种情况被称为服务器再验证。

+ 如果资源发生变化，则需要取得新的资源，并在缓存中替换旧资源。
+ 如果资源没有发生变化，缓存只需要获取新的响应头，和一个新的过期时间，对缓存中的资源过期时间进行更新即可。


HTTP1.1推荐使用的验证方式是If-None-Match/Etag，在HTTP1.0中则使用If-Modified-Since/Last-Modified。


### 9.Etag与If-None-Match

Etag是指根据实体内容生成一段hash字符串，标识资源的状态，由服务端产生。浏览器会将这串字符串传回服务器，验证资源是否已经修改，如果没有修改，过程如下：


![](
https://github.com/zuopf769/notebook/blob/master/fe/%E5%89%8D%E7%AB%AF%E5%BF%85%E9%A1%BB%E8%A6%81%E6%87%82%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/5.png)


![](https://github.com/zuopf769/notebook/blob/master/fe/%E5%89%8D%E7%AB%AF%E5%BF%85%E9%A1%BB%E8%A6%81%E6%87%82%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/6.png)


代码示例

```
var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    if (req.url === '/' || req.url === '' || req.url === '/index.html') {
        fs.readFile('./index.html', function(err, file) {
            console.log(req.url)
            //对主文档设置缓存，无效果
            res.setHeader('Cache-Control', "no-cache, max-age=" + 5);
            res.setHeader('Content-Type', 'text/html');
            res.writeHead('200', "OK");
            res.end(file);
        });
    }
    if (req.url === '/shortcut.png') {
        fs.readFile('./shortcut.png', function(err, file) {
            console.log(req.url)
            res.setHeader('Content-Type', 'images/png');
            res.writeHead('200', "OK");
            res.end(file);
        })
    }
    if (req.url === '/cache.png') {
        fs.readFile('./cache.png', function(err, file) {
            console.log(req.headers);
            console.log(req.url)
            if (!req.headers['if-none-match']) {
                res.setHeader('Cache-Control', "max-age=" + 5);
                res.setHeader('Content-Type', 'images/png');
                res.setHeader('Etag', "ffff");
                res.writeHead('200', "Not Modified");
                res.end(file);
            } else {
                if (req.headers['if-none-match'] === 'ffff') {
                    res.writeHead('304', "Not Modified");
                    res.end();
                } else {
                    res.setHeader('Cache-Control', "max-age=" + 5);
                    res.setHeader('Content-Type', 'images/png');
                    res.setHeader('Etag', "ffff");
                    res.writeHead('200', "Not Modified");
                    res.end(file);
                }
            }
            
        });
    }
    
}).listen(8888)
```

![](https://github.com/zuopf769/notebook/blob/master/fe/%E5%89%8D%E7%AB%AF%E5%BF%85%E9%A1%BB%E8%A6%81%E6%87%82%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/7.png)


### 10.如何计算Etag值

+ ETag值通常由服务器端计算，并在响应客户端请求时将它返回给客户端
+ 可以通过时间戳就可以最简单的得到ETag头信息；但不建议这么做，这么做和Last-Modified头信息就没什么两样了
+ ETag值可以是唯一标识资源的任何东西，如持久化存储中的某个资源关联的版本、一个或者多个文件属性，实体头信息和校验值、(CheckSum)，也可以计算实体信息的散列值。
+ 有时候，为了计算一个ETag值可能有比较大的代价，此时可以采用生成唯一值等方式(如常见的GUID)。
+ Apache默认通过FileEtag中FileEtag INode Mtime Size的配置自动生成ETag(当然也可以通过用户自定义的方式)。
+ 由于Etag由服务器构造，所以在集群环境中一定要保证Etag的唯一性


### 11. If-Modified-Since与Last-Modified

这两个是HTTP1.0中用来验证资源是否过期的请求/响应头，这两个头部都是日期，验证过程与Etag类似，这里不详细介绍。使用这两个头部来验证资源是否更新时，存在以下问题：

+ 有些文档资源周期性的被重写，但实际内容没有改变。此时文件元数据中会显示文件最近的修改日期与If-Modified-Since不相同，导致不必要的响应。
+ 有些文档资源被修改了，但修改内容并不重要，不需要所有的缓存都更新（比如代码注释）


### 12. 总结

+ 浏览器端缓存分为200 from cache和304 not modified
+ HTTP协议中Cache-Control 和 Expires可以用来设置新鲜度的限值，前者是HTTP1.1中新增的响应头，后者是HTTP1.0中的响应头。
+ max-age（单位为s）而Expires指定的是具体的过期日期而不是秒数
+ Cache-Control和Expires同时使用的话，Cache-Control会覆盖Expires
+ 客户端不用关心ETag值如何产生，只要服务在资源状态发生变更的情况下将ETag值发送给它就行
+ Apache默认通过FileEtag中FileEtag INode Mtime Size的配置自动生成ETag(当然也可以通过用户自定义的方式)。
+ ETag常与If-None-Match或者If-Match一起，由客户端通过HTTP头信息(包括ETag值)发送给服务端处理。
+ Last-Modified常与If-Modified-Since一起由客户端将Last-Modified值包括在HTTP头信息中发给服务端进行处理。
+ 有些文档资源周期性的被重写，但实际内容没有改变。此时文件元数据中会显示文件最近的修改日期与If-Modified-Since不相同，导致不必要的响应。


### 13 demo

[demo](https://github.com/zuopf769/notebook/tree/master/fe/%E5%89%8D%E7%AB%AF%E5%BF%85%E9%A1%BB%E8%A6%81%E6%87%82%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/webcache)
