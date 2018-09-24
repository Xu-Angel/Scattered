### XSS的定义

跨站脚本攻击(Cross Site Scripting)，缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。

### XSS的原理

- 攻击者对含有漏洞的服务器发起XSS攻击（注入JS代码）。

- 诱使受害者打开受到攻击的服务器URL。

- 受害者在Web浏览器中打开URL，恶意脚本执行。

### XSS的攻击方式

（1）反射型： 发出请求时，XSS代码出现在URL中，作为输入提交到服务器端，服务器端解析后响应，XSS随响应内容一起返回给浏览器，最后浏览器解析执行XSS代码，这个过程就像一次发射，所以叫反射型XSS。

（2）存储型: 存储型XSS和反射型的XSS差别就在于，存储型的XSS提交的代码会存储在服务器端（数据库，内存，文件系统等），下次请求目标页面时不用再提交XSS代码。

### XSS攻击的危害

1、盗取各类用户帐号，如机器登录帐号、用户网银帐号、各类管理员帐号

2、控制企业数据，包括读取、篡改、添加、删除企业敏感数据的能力

3、盗窃企业重要的具有商业价值的资料

4、非法转账

5、强制发送电子邮件

6、网站挂马

7、控制受害者机器向其它网站发起攻击

### XSS的防御措施

（1）编码：对用户输入的数据进行HTML Entity编码

（2）过滤：移除用户上传的DOM属性，如onerror等，移除用户上传的style节点，script节点，iframe节点等。

（3）校正：避免直接对HTML Entity编码，使用DOM Prase转换，校正不配对的DOM标签。

### CSP

 CSP是网页安全政策(Content Security Policy)的缩写。是一种由开发者定义的安全性政策申明，通过CSP所约束的责任指定可信的内容来源，（内容可以是指脚本、图片、style 等远程资源）。通过CSP协定，可以防止XSS攻击，让web处一个安全运行的环境中。

 CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。CSP 大大增强了网页的安全性。攻击者即使发现了漏洞，也没法注入脚本，除非还控制了一台列入了白名单的可信主机

开启方式

　　一种是：通过 HTTP 头信息的Content-Security-Policy的字段。
　　一种是：在网页中设置<meta>标签，如：

	<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">

script-src 的特殊值

'unsafe-inline'：允许执行页面内嵌的<script>标签和事件监听函数

'unsafe-eval'：允许将字符串当作代码执行，比如使用eval、setTimeout、setInterval等函数。

'nonce'值：每次HTTP回应给出一个授权token，页面内嵌脚本必须有这个token，才会执行

'hash'值：列出允许执行的脚本代码的Hash值，页面内嵌脚本的哈希值只有吻合的情况下，才能执行