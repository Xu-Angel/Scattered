---->
2th 
压缩构建fis3

---->
小雪碧图  taobao  facebook tiny-png 智图  spritecow

---->
CSS JS HTML加载
浏览器获取一个域名下的并发-- 是有限的  所以CDN会有多个
    ---词法分析--并发加载--并发上限
是否阻塞-->>css,js--->>CSS阻塞JS执行，但不阻塞外部脚本的加载
是否依赖-->>闪烁？header？
---->
懒加载，预加载--
--懒加载--图片要先设置高度--占位

--预加载--display：none；new Image();ajax;preload.js

---->
5th  重绘回流
css---一条线程
js --- 一条线程   。。》》重新操作----》》重新执行CSS渲染---依赖后--》jS执行--变慢