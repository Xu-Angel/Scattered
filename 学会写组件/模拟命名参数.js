// 使用对象解构(destructuring)模拟命名参数
// 当您需要将一组可选变量传递给某个函数时，你很可能已经在使用配置对象了，如下所示：

doSomething({ foo: 'Hello', bar: 'Hey!', baz: 42 });
function doSomething(config) {
const foo = config.foo !== undefined ? config.foo : 'Hi';
const bar = config.bar !== undefined ? config.bar : 'Yo!';
const baz = config.baz !== undefined ? config.baz : 13;
// ...
}
/* 这是一个古老但有效的模式，它试图在 JavaScript 中模拟命名参数。 函数调用看起来很好。 另一方面，配置对象处理逻辑不必要地冗长。 使用ES2015 对象解构，您可以绕过这个缺点： */

function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 }) {
  console.log(arguments);
  // ...
}

// 如果你需要使配置对象也可选，也很简单：

function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) {
// ...
}
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 }) {
  console.log(arguments);
  // ...
}
doSomething({
  foo = 'HFi', bar = 'YoF!', baz = 137
})