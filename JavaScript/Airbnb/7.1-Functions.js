/* FIXME:Functions */
/* // bad
function foo() {
  // ...
}
// bad
const foo = function () {
  // ...
};
// good
// lexical name distinguished from the variable-referenced invocation(s)
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
}; */
/* 
TODO:使用（）包裹立即调用表达式，模块化思想 */
/* // immediately-invoked function expression (IIFE)
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}()); */
/*
 TODO: 不要再if where 这种非函数块中声明函数
Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears.  */
/*
 TODO:不定参数：...args展开运算符// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}
// good
function concatenateAll(...args) {
  return args.join('');
} */
/*
 TODO:使用默认参数语法，而不是或运算 */
/* 
// really bad
function handleThings(opts) {
  // No! We shouldn’t mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {};
  // ...
}
// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}
// good
function handleThings(opts = {}) {
  // ...
}
 */
/* 
TODO:对于默认参数，避免操作改变 */
/* 
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3
 */
/* 
TODO:对于默认参数 ，放在最后（===频率高的在前面） */
/* 
Always put default parameters last.
// bad
function handleThings(opts = {}, name) {
  // ...
}
// good
function handleThings(name, opts = {}) {
  // ...
}
 */
/* 
TODO:对于空格间隙的问题：保持块的连续性 Spacing in a function signature.*/
/* 
// bad
const f = function(){};
const g = function (){};
const h = function() {};
// good
const x = function () {};
const y = function a() {};
 */
/* 
TODO:对象参数 用Object.prototype.hasOwnProperty.call()*/
/* 
// bad
function f1(obj) {
  obj.key = 1;
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
} */
/* 
TODO:不要重新操作参数，除非知道边界情况 */
/* 
// bad
function f1(a) {
  a = 1;
  // ...
}
function f2(a) {
  if (!a) { a = 1; }
  // ...
}
// good
function f3(a) {
  const b = a || 1;
  // ...
}
function f4(a = 1) {
  // ...
}
 */
/* 
TODO: 用展开运算符 去展开为想要的类型*/
/* const x = [1, 2, 3, 4, 5];
console.log(x);
console.log(...x);
console.log([...x]);
let xx = {...x}
console.log(xx,xx[0]);
console.log(new Date(...[2016, 8, 5]));
console.log(new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5])));
console.log(new Date(2016, 8, 5)); */
