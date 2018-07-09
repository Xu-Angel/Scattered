/* FIXME:Blocks */
/* 
TODO:无花括号则在一行
*Use braces with all multi-line blocks. 
// bad
if (test)
  return false;
// good
if (test) return false;
// good
if (test) {
  return false;
}
// bad
function foo() { return false; }
// good
function bar() {
  return false;
}
*/
/* 
TODO:else 和{} 在一行 
// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
 */
/* 
TODO:else和return的划分
*If an if block always executes a return statement, the subsequent else block is unnecessary. A return in an else if block following an if block that contains a return can be separated into multiple if blocks
// bad
function foo() {
  if (x) {
    return x;
  } else {
    return y;
  }
}
// bad
function cats() {
  if (x) {
    return x;
  } else if (y) {
    return y;
  }
}
// bad
function dogs() {
  if (x) {
    return x;
  } else {
    if (y) {
      return y;
    }
  }
}
// good
function foo() {
  if (x) {
    return x;
  }
  return y;
}
// good
function cats() {
  if (x) {
    return x;
  }
  if (y) {
    return y;
  }
}
// good
function dogs(x) {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}
 */
