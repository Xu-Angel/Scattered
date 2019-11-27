/* FIXME:Comparison Operators & Equality */
/* TODO:Use === and !== over == and !=. */
/* 
TODO:  布尔值判定
!the boolean
*Objects evaluate to true
*Undefined evaluates to false
*Null evaluates to false
*Booleans evaluate to the value of the boolean
*Numbers evaluate to false if +0, -0, or NaN, otherwise true
*Strings evaluate to false if an empty string '', otherwise true
eg:
if ([0] && []) {
  // true
  // an array (even an empty one) is an object, objects will evaluate to true
}
 */
/* 
TODO:如果是布尔值 直接简写， 如果不是 则判断Use shortcuts for booleans, but explicit comparisons for strings and numbers.
// bad
if (isValid === true) {
  // ...
}
// good
if (isValid) {
  // ...
}
// bad
if (name) {
  // ...
}
// good
if (name !== '') {
  // ...
}
// bad
if (collection.length) {
  // ...
}
// good
if (collection.length > 0) {
  // ...
}
*/
/*
TODO: 如果有各种类型，加{}，Use braces to create blocks in case and default clauses that contain lexical declarations (e.g. let, const, function, and class). Lexical declarations are visible in the entire switch block but only get initialized when assigned, which only happens when its case is reached. This causes problems when multiple case clauses attempt to define the same thing.
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}
 */
/* 
TODO:Avoid unneeded ternary statements. 避免不必要的三元运算符
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
 */

/* 
TODO:有歧义()起来，When mixing operators, enclose them in parentheses. The only exception is the standard arithmetic operators (+, -, *, & /) since their precedence is broadly understood.
// bad
const foo = a && b < 0 || c > 0 || d + 1 === 0;
// bad
const bar = a ** b - 5 % d;
// bad
// one may be confused into thinking (a || b) && c
if (a || b && c) {
  return d;
}
// good
const foo = (a && b < 0) || c > 0 || (d + 1 === 0);
// good
const bar = (a ** b) - (5 % d);
// good
if (a || (b && c)) {
  return d;
}
// good
const bar = a + b / c * d;
 */