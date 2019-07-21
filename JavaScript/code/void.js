// > https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void
// void 运算符 对给定的表达式进行求值，然后返回 undefined。
// 也就是会做一次运算
// synta： void expression
// way1  IIFE  
(function (window, document) {
  // body
})(window, document);
// use void  在使用立即执行的函数表达式时，可以利用 void 运算符让 JavaScript 引擎把一个function关键字识别成函数表达式而不是函数声明（语句）。
void function iife() {
  // do something
}()

// way2 JavaScript URIs
// 当用户点击一个以 javascript: URI 时，它会执行URI中的代码，然后用返回的值替换页面内容，除非返回的值是undefined。void运算符可用于返回undefined。例如：
/* 
<a href="javascript:void(0);">
  这个链接点击之后不会做任何事情，如果去掉 void()，
  点击之后整个页面会被替换成一个字符 0。
</a>
<p> chrome中即使<a href="javascript:0;">也没变化，firefox中会变成一个字符串0 </p>
<a href="javascript:void(document.body.style.backgroundColor='green');">
  点击这个链接会让页面背景变成绿色。
</a>
虽然这么做是可行的，但利用 javascript: 伪协议来执行 JavaScript 代码是不推荐的，推荐的做法是为链接元素绑定事件。
*/