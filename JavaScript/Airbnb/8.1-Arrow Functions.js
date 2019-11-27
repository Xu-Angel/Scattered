/* FIXME:Arrow Functions */
console.log([1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
}));

/* 
TODO:箭头函数如果去掉花括号 则 体结果 直接作为返回值return出去 */
/* console.log([1,2,3].map( x => x+8
));
console.log([1, 2, 3].map(number => `A string containing the ${number}.`));
console.log([1, 2, 3].map(number => {`A string containing the ${number}.`}));
console.log([1, 2, 3].map(number => { return `A string containing the ${number}.`}));
console.log([1, 2, 3].map((number, index) => ({
  [index]: number,
})));
console.log([1, 2, 3].map((number, index) => {return{
  [index]: number,
}})); */
/* 
*为了使用箭头函数返回值的方便 ，但是又为了区分提醒 ：
// bad
(foo) =>
  bar;
(foo) =>
  (bar);
// good
(foo) => bar;
(foo) => (bar);
(foo) => (
   bar
)
 */
/* 
TODO: 一个参数的时候 不要再加花括号 减少视觉混杂  Less visual clutter.*/
/* 
// bad
[1, 2, 3].map((x) => x * x);
// good
[1, 2, 3].map(x => x * x);
 */
/* 
TODO:在有比较运算符的时候  加一下（）区分一下 */
/* 
// bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;
// bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;
// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);
// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height > 256 ? largeSize : smallSize;
};
 */