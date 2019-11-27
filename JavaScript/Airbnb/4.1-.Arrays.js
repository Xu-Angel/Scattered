/* FIXME:Arrays */
/* 
TODO:4.3复制数组，用...展开运算符 */
/* // bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items]; */
/* 
TODO:4.4类数组转换，用...展开运算符，而不是Array.from() */
/* const foo = document.querySelectorAll('.foo');
// good
const nodes = Array.from(foo);
// best
const nodes = [...foo]; */

/*
TODO:4.5 map类数组的时候，直接用Array.from（）进行转换Use Array.from instead of spread ... for mapping over iterables, because it avoids creating an intermediate array.
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// bad
const baz = [...foo].map(bar);
// good
const baz = Array.from(foo, bar); // 第一个参数想要转换成数组的伪数组对象或可迭代对象。第二个参数如果指定了该参数，新数组中的每个元素会执行该回调函数。返回值：一个新的数组实例。
 */
/* 4.6 还没懂 */
