https://segmentfault.com/a/1190000014596047

https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size：
单张图片的背景大小可以使用以下三种方法中的一种来规定：

使用关键词 contain
使用关键词 cover
设定宽度和高度值
当通过宽度和高度值来设定尺寸时，你可以提供一或者两个数值:

如果仅有一个数值被给定，这个数值将作为宽度值大小，高度值将被设定为auto。
如果有两个数值被给定，第一个将作为宽度值大小，第二个作为高度值大小。
每个值可以是<length>, 是 <percentage>, 或者 auto.

示例：

background-size: contain;

background-size: 50%;
background-size: 3em;

background-size: auto 1em;
background-size: 50% 25%;

为了设定超过一张以上的图片尺寸时，需要提供多项数值，它们通过逗号分隔。

background-size: 50% 25%, contain, 3em;