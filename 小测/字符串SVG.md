# q

https://github.com/zhangxinxu/quiz/issues/45

```var str = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 2a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z" fill="#0067E6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 6a1 1 0 0 1 1-1h9l5 5v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V6z" fill="#FEAEA5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5l5 5h-4a1 1 0 0 1-1-1V5z" fill="#0067E6"/></svg>';```

## qa

- 老老实实用一个简单正则，然后callback中处理，虽然代码不是很简单，但是看得懂也不出错。简洁用法：/fill="(?!none")[^"]+"/gi。

- window.btoa(str)可以转base64。但是如果有中文是会报错的。可以先encodeURI下，或者encodeURIComponent也可以。可以试试这个：btoa(unescape(encodeURIComponent(str)))。base64到常规格式 window.atob(str);

- data:image/svg+xml;utf8, 加原始SVG代码是可以作为CSS background图片的，但是Chrome支持，IE浏览器不支持。我们可以部分转义，"，%，#，{，}，<，>。IE浏览器也支持，包括IE9。str.replace(/[%#{}<>]/g, encodeURI)。