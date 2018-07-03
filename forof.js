let arr = ['a', 'b', 'c', 'd'];
let inter = arr[Symbol.iterator]();// 变量arr是一个数组，原生就具有遍历器接口
console.log(inter.next());
console.log(inter.next());
console.log(inter.next());
console.log(inter.next());
console.log(inter.next());
/*
**
本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。
*/

/**
 * @description 类似数据的对象（键值对，length）如何快速借用iterator借口：
 * NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
 * NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
 * 
 */
function f(m) {
  return m*2;
}
/** 
 * 求值策略：
 * 传值调用call by value  C语言     性能损失
 * 传名调用call by name   Haskell语言
 * Thunk
 */
