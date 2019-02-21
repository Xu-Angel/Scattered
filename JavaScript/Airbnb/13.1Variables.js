/* FIXME:Variables */
/*
TODO: 使用const let
 */
/* 
TODO:const类型的声明 不要块声明，应该分开
*It’s easier to add new variable declarations this way, and you never have to worry about swapping out a ; for a , or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.
// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';
// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';
// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
*/
/* 
TODO:有序分组
// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;
// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;
// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
 */
/* 
TODO: 贴近使用的地方
*Assign variables where you need them, but place them in a reasonable place.let and const are block scoped and not function scoped.
// bad - unnecessary function call
function checkName(hasName) {
  !const name = getName();
  if (hasName === 'test') {
    return false;
  }
  if (name === 'test') {
    this.setName('');
    return false;
  }
  return name;
}

// good
function checkName(hasName) {
  if (hasName === 'test') {
    return false;
  }
  !const name = getName();
  if (name === 'test') {
    this.setName('');
    return false;
  }
  return name;
}
*/
/* 
TODO:连等 造成全局变量  Don’t chain variable assignments. Chaining variable assignments creates implicit global variables. 
// bad
(function example() {
  // JavaScript interprets this as
  // let a = ( b = ( c = 1 ) );
  // The let keyword only applies to variable a; variables b and c become
  // global variables.
  let a = b = c = 1;
}());
console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1
// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
}());
console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError
// the same applies for `const`
*/
/* 
TODO:使用+= -= 而不是++ -- 
// bad
const array = [1, 2, 3];
let num = 1;
num++;
--num;
let sum = 0;
let truthyCount = 0;
for (let i = 0; i < array.length; i++) {
  let value = array[i];
  sum += value;
  if (value) {
    truthyCount++;
  }
}
// good
const array = [1, 2, 3];
let num = 1;
num += 1;
num -= 1;
const sum = array.reduce((a, b) => a + b, 0);
const truthyCount = array.filter(Boolean).length;
*/
/* 
TODO: = 号后面的断行处理： Linebreaks surrounding = can obfuscate the value of an assignment.
// bad
const foo =
  superLongLongLongLongLongLongLongLongFunctionName();
// bad
const foo
  = 'superLongLongLongLongLongLongLongLongString';
// good
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
);
// good
const foo = 'superLongLongLongLongLongLongLongLongString';
 */

 
