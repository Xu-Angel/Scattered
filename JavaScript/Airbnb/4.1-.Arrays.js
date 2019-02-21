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
TODO:4.5 使用map方法遍历的时候，直接用Array.from（）进行转换Use Array.from instead of spread ... for mapping over iterables, because it avoids creating an intermediate array.
// bad
const baz = [...foo].map(bar);
// good
const baz = Array.from(foo, bar);
 */
/* 4.6 还没懂 */
