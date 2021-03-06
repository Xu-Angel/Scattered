### 一、CSRF攻击原理

CSRF是什么呢？CSRF全名是Cross-site request forgery，是一种对网站的恶意利用，CSRF比XSS更具危险性。想要深入理解CSRF的攻击特性我们有必要了解一下网站session的工作原理。 

　　session我想大家都不陌生，无论你用.net或PHP开发过网站的都肯定用过session对象，然而session它是如何工作的呢？如果你不清楚请往下看。 
先问个小问题：如果我把浏览器的cookie禁用了，大家认为session还能正常工作吗？ 

　　答案是否定的，我在这边举个简单的例子帮助大家理解session。 
比如我买了一张高尔夫俱乐部的会员卡，俱乐部给了我一张带有卡号的会员卡。我能享受哪些权利（比如我是高级会员卡可以打19洞和后付费喝饮料，而初级会员卡只能在练习场挥杆）以及我的个人资料都是保存在高尔夫俱乐部的数据库里的。我每次去高尔夫俱乐部只需要出示这张高级会员卡，俱乐部就知道我是谁了，并且为我服务了。

　　这里我们的高级会员卡卡号 = 保存在cookie的sessionid； 
而我的高级会员卡权利和个人信息就是服务端的session对象了。 

　　我们知道http请求是无状态的，也就是说每次http请求都是独立的无关之前的操作的，但是每次http请求都会将本域下的所有cookie作为http请求头的一部分发送给服务端，所以服务端就根据请求中的cookie存放的sessionid去session对象中找到该会员资料了。 
当然session的保存方法多种多样，可以保存在文件中，也可以内存里，考虑到分布式的横向扩展我们还是建议把它保存在第三方媒介中，比如redis或者mongodb。 

　　我们理解了session的工作机制后，CSRF也就很容易理解了。CSRF攻击就相当于恶意用户A复制了我的高级会员卡，哪天恶意用户A也可以拿着这张假冒的高级会员卡去高尔夫俱乐部打19洞，享受美味的饮料了，而我在月底就会收到高尔夫俱乐部的账单！ 

　　了解CSRF的机制之后，危害性我相信大家已经不言而喻了，我可以伪造某一个用户的身份给其好友发送垃圾信息，这些垃圾信息的超链接可能带有木马程序或者一些欺骗信息（比如借钱之类的），如果CSRF发送的垃圾信息还带有蠕虫链接的话，那些接收到这些有害信息的好友万一打开私信中的连接就也成为了有害信息的散播着，这样数以万计的用户被窃取了资料种植了木马。整个网站的应用就可能在瞬间奔溃，用户投诉，用户流失，公司声誉一落千丈甚至面临倒闭。曾经在MSN上，一个美国的19岁的小伙子Samy利用css的background漏洞几小时内让100多万用户成功的感染了他的蠕虫，虽然这个蠕虫并没有破坏整个应用，只是在每一个用户的签名后面都增加了一句“Samy 是我的偶像”，但是一旦这些漏洞被恶意用户利用，后果将不堪设想，同样的事情也曾经发生在新浪微博上面。 

　　举例： 

　　CSRF攻击的主要目的是让用户在不知情的情况下攻击自己已登录的一个系统，类似于钓鱼。如用户当前已经登录了邮箱，或bbs，同时用户又在使用另外一个，已经被你控制的站点，我们姑且叫它钓鱼网站。这个网站上面可能因为某个图片吸引你，你去点击一下，此时可能就会触发一个js的点击事件，构造一个bbs发帖的请求，去往你的bbs发帖，由于当前你的浏览器状态已经是登陆状态，所以session登陆cookie信息都会跟正常的请求一样，纯天然的利用当前的登陆状态，让用户在不知情的情况下，帮你发帖或干其他事情。

### 二、CSRF防御

- 通过 referer、token 或者 验证码 来检测用户提交。

> 验证 HTTP Referer 字段

根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。在通常情况下，访问一个安全受限页面的请求来自于同一个网站，比如需要访问 http://bank.example/withdraw?account=bob&amount=1000000&for=Mallory，用户必须先登陆 bank.example，然后通过点击页面上的按钮来触发转账事件。这时，该转帐请求的 Referer 值就会是转账按钮所在的页面的 URL，通常是以 bank.example 域名开头的地址。而如果黑客要对银行网站实施 CSRF 攻击，他只能在他自己的网站构造请求，当用户通过黑客的网站发送请求到银行时，该请求的 Referer 是指向黑客自己的网站。因此，要防御 CSRF 攻击，银行网站只需要对于每一个转账请求验证其 Referer 值，如果是以 bank.example 开头的域名，则说明该请求是来自银行网站自己的请求，是合法的。如果 Referer 是其他网站的话，则有可能是黑客的 CSRF 攻击，拒绝该请求。

这种方法的显而易见的好处就是简单易行，网站的普通开发人员不需要操心 CSRF 的漏洞，只需要在最后给所有安全敏感的请求统一增加一个拦截器来检查 Referer 的值就可以。特别是对于当前现有的系统，不需要改变当前系统的任何已有代码和逻辑，没有风险，非常便捷。

然而，这种方法并非万无一失。Referer 的值是由浏览器提供的，虽然 HTTP 协议上有明确的要求，但是每个浏览器对于 Referer 的具体实现可能有差别，并不能保证浏览器自身没有安全漏洞。使用验证 Referer 值的方法，就是把安全性都依赖于第三方（即浏览器）来保障，从理论上来讲，这样并不安全。事实上，对于某些浏览器，比如 IE6 或 FF2，目前已经有一些方法可以篡改 Referer 值。如果 bank.example 网站支持 IE6 浏览器，黑客完全可以把用户浏览器的 Referer 值设为以 bank.example 域名开头的地址，这样就可以通过验证，从而进行 CSRF 攻击。

即便是使用最新的浏览器，黑客无法篡改 Referer 值，这种方法仍然有问题。因为 Referer 值会记录下用户的访问来源，有些用户认为这样会侵犯到他们自己的隐私权，特别是有些组织担心 Referer 值会把组织内网中的某些信息泄露到外网中。因此，用户自己可以设置浏览器使其在发送请求时不再提供 Referer。当他们正常访问银行网站时，网站会因为请求没有 Referer 值而认为是 CSRF 攻击，拒绝合法用户的访问。

> 在请求地址中添加 token 并验证

CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

这种方法要比检查 Referer 要安全一些，token 可以在用户登陆后产生并放于 session 之中，然后在每次请求时把 token 从 session 中拿出，与请求中的 token 进行比对，但这种方法的难点在于如何把 token 以参数的形式加入请求。对于 GET 请求，token 将附在请求地址之后，这样 URL 就变成 http://url?csrftoken=tokenvalue。 而对于 POST 请求来说，要在 form 的最后加上 <input type=”hidden” name=”csrftoken” value=”tokenvalue”/>，这样就把 token 以参数的形式加入请求了。但是，在一个网站中，可以接受请求的地方非常多，要对于每一个请求都加上 token 是很麻烦的，并且很容易漏掉，通常使用的方法就是在每次页面加载时，使用 javascript 遍历整个 dom 树，对于 dom 中所有的 a 和 form 标签后加入 token。这样可以解决大部分的请求，但是对于在页面加载之后动态生成的 html 代码，这种方法就没有作用，还需要程序员在编码时手动添加 token。

该方法还有一个缺点是难以保证 token 本身的安全。特别是在一些论坛之类支持用户自己发表内容的网站，黑客可以在上面发布自己个人网站的地址。由于系统也会在这个地址后面加上 token，黑客可以在自己的网站上得到这个 token，并马上就可以发动 CSRF 攻击。为了避免这一点，系统可以在添加 token 的时候增加一个判断，如果这个链接是链到自己本站的，就在后面添加 token，如果是通向外网则不加。不过，即使这个 csrftoken 不以参数的形式附加在请求之中，黑客的网站也同样可以通过 Referer 来得到这个 token 值以发动 CSRF 攻击。这也是一些用户喜欢手动关闭浏览器 Referer 功能的原因。

> 在 HTTP 头中自定义属性并验证

这种方法也是使用 token 并进行验证，和上一种方法不同的是，这里并不是把 token 以参数的形式置于 HTTP 请求之中，而是把它放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。这样解决了上种方法在请求中加入 token 的不便，同时，通过 XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去。

然而这种方法的局限性非常大。XMLHttpRequest 请求通常用于 Ajax 方法中对于页面局部的异步刷新，并非所有的请求都适合用这个类来发起，而且通过该类请求得到的页面不能被浏览器所记录下，从而进行前进，后退，刷新，收藏等操作，给用户带来不便。另外，对于没有进行 CSRF 防护的遗留系统来说，要采用这种方法来进行防护，要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。

- 尽量不要在页面的链接中暴露用户隐私信息。

- 对于用户修改删除等操作最好都使用post 操作 。

- 避免全站通用的cookie，严格设置cookie的域。