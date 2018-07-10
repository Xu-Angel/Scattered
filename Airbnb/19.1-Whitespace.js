/* FIXME:Whitespace */
/* 
TODO: 空格字符缩进 2 Use soft tabs (space character) set to 2 spaces
*/
/* 
// bad
function foo() {
∙∙∙∙let name;
}
// bad
function bar() {
∙let name;
}
// good
function baz() {
∙∙let name;
}
*/
/* 
TODO: 大括号前面加一个空格 Place 1 space before the leading brace. 
*/
/* 
// bad
function test(){
  console.log('test');
}
// good
function test() {
  console.log('test');
}
// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});
// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
}); */
/*
 TODO:判断语句块的圆括号 前后加一个空格 函数的参数括号紧跟函数名字 Place 1 space before the opening parenthesis in control statements (if, while etc.). Place no space between the argument list and the function name in function calls and declarations. 
 */
/* 
// bad
if(isJedi) {
  fight ();
}
// good
if (isJedi) {
  fight();
}
// bad
function fight () {
  console.log ('Swooosh!');
}
// good
function fight() {
  console.log('Swooosh!');
} */
/* 
TODO: 操作符前后加一个空格 Set off operators with spaces.
 */
/* 
// bad
const x=y+5;
// good
const x = y + 5; 
*/
/* 
TODO: 链式调用的时候 超过两个分行分组书写 Use indentation when making long method chains (more than 2 method chains). Use a leading dot, which emphasizes that the line is a method call, not a new statement. 
*/
/* 
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

//! good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);
//! good
const leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

//! good
const leds = stage.selectAll('.led').data(data);
*/
/* 
TODO: Leave a blank line after blocks and before the next statement. 留一行空行 在下一个声明/陈述之前
 */
/* 
// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;

// bad
const obj = {
  foo() {
  },
  bar() {
  },
};
return obj;

// good
const obj = {
  foo() {
  },

  bar() {
  },
};

return obj;

// bad
const arr = [
  function foo() {
  },
  function bar() {
  },
];
return arr;

// good
const arr = [
  function foo() {
  },

  function bar() {
  },
];

return arr;
*/
/* 
TODO:在括号里,中括号前后不加空格 Do not add spaces inside parentheses，Do not add spaces inside brackets. 
*/
/* 
// bad
function bar( foo ) {
  return foo;
}

// !good
function bar(foo) {
  return foo;
}

// bad
if ( foo ) {
  console.log(foo);
}

// !good
if (foo) {
  console.log(foo);
}
// bad
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);

// !good
const foo = [1, 2, 3];
console.log(foo[0]);
*/
/* 
TODO:花括号前后加空格 Add spaces inside curly braces
*/
/* 
// bad
const foo = {clark: 'kent'};

// good
const foo = { clark: 'kent' };
 */
/* 
TODO:一行代码不要长度超过100 Avoid having lines of code that are longer than 100 characters (including whitespace). Note: per above, long strings are exempt from this rule, and should not be broken up. eslint: max-len
*Why? This ensures readability and maintainability.
*/
/* 
TODO:每个逗号之后有个空格 Avoid spaces before commas and require a space after commas.
*/
/* 
// bad
var foo = 1,bar = 2;
var arr = [1 , 2];

// good
var foo = 1, bar = 2;
var arr = [1, 2];
*/
/* 
TODO:调用函数的时候，括号紧跟
*/
/* 
// bad
func ();

func
();

//! good
func(); */