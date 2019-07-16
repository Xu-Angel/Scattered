https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this

> 与其他语言相比，函数的 this 关键字在 JavaScript 中的表现略有不同，此外，在严格模式和非严格模式之间也会有一些差别。
在绝大多数情况下，函数的调用方式决定了this的值。this不能在执行期间被赋值，并且在每次函数被调用时this的值也可能会不同。ES5引入了bind方法来设置函数的this值，而不用考虑函数如何被调用的，ES2015 引入了支持this词法解析的箭头函数（它在闭合的执行环境内设置this的值）。