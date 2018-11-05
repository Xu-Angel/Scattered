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

---->
6th 重绘回流细解
将频繁重绘回流的DOM元素单独作为一个独立图层， gif

// 性能工具---per工具，layer-ren

图层不能被滥用 如body 设置成translatZ  // will-change后 大量图层分裂，--性能工具下看到大量的偏绿色的 过程 会导致 合成图层的过程时间急剧增加


实战优化点
---->
7th 存储
cookie 中在相关域名下面 - cdn流量损耗： cdn域名和主站域名分开
lighthouse
chorme://serviceworker-internals
---->
8th 缓存
memory
disk  两种缓存   策略基于cache-control
分级缓存策略： 200。--304.--200from cahce
chrome://cache
---->
9th 服务器

VUE 服务端渲染