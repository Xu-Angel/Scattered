/* FIXME:Iterators and Generators*/
/* 
TODO:Don’t use iterators. Prefer JavaScript’s higher-order functions instead of loops like for-in or for-of
 *Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.Use map() / every() / filter() / find() / findIndex() / reduce() / some() / ... to iterate over arrays, and Object.keys() / Object.values() / Object.entries() to produce arrays so you can iterate over objects.
 使用数组遍历方法
 const numbers = [1, 2, 3, 4, 5];
// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;
//good
let sum = 0;
numbers.foreach(num => {
   sum + = num
})
sum === 15;
// *best (use the functional force)
const sum = numbers.reduce((pre, nex) =>  pre+nex, 0)
sum == 15 
// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}
//const increasedByOne = []
numbers.foreach(num => {
  increasedByOne.push(num + 1)
})
//*best (keeping it functional)
const increasedByOne = numbers.map( num => num + 1)
*/
/* 
TODO:函数规范 
// very bad
function
*
foo() {
  // ...
}
// very bad
const wat = function
*
() {
  // ...
};
// good
function* foo() {
  // ...
}
// good
const foo = function* () {
  // ...
};
*/
