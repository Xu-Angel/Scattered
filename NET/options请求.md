https://www.cnblogs.com/chris-oil/p/8042677.html
https://www.cnblogs.com/virtual/p/3720750.html
https://laravel-china.org/topics/6321/the-problem-of-sending-post-requests-to-options-when-axios-cross-domain-is-solved

一个Option请求引发的深度解析
在当前项目中，前端通过POST方式访问后端的REST接口时，发现两条请求记录，一条请求的Request Method为Options，另一条请求的Reuest Method为Post。想要解决这个疑惑还得从以下3个概念说起。

简而言之，OPTIONS请求方法的主要用途有两个：

1、获取服务器支持的HTTP请求方法；

2、用来检查服务器的性能。
 
Preflighted Requests(预检请求)

Preflighted Requests是CORS中一种透明服务器验证机制。预检请求首先需要向另外一个域名的资源发送一个 HTTP OPTIONS 请求头，其目的就是为了判断实际发送的请求是否是安全的。

发出去的请求不是 simple request，那么在每次发送请求之前，都会发送一个options请求，simple request 需要同时满足以下条件（规范可以百度查询）：

get、post、head 请求类型
不要设置列表之外的header（如： user-agent）
Content-Type 只能是：
application/x-www-from-urlencoded
multipart/from-data
text/plain
其他资料也说过，默认请求就是application/json,所以不需要自己加上头部，现在上正确的代码：

解决方法
现在问题所在已经很明显了，那么面对这种跨域预检机制造成的多次请求问题，我们可以在后台设置Access-Control-Max-Age来控制浏览器在多长时间内（单位s）无需在请求时发送预检请求，从而减少不必要的预检请求。

参考：
http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html

http://blog.csdn.net/hfahe/article/details/7730944

https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS