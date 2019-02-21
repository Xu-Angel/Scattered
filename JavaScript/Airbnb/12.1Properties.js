/* FIXME:Properties */
/* 
TODO: Use dot notation when accessing properties. eslint
确认的情况下 使用.
const luke = {
  jedi: true,
  age: 28,
};
// bad
const isJedi = luke['jedi'];
// good
const isJedi = luke.jedi;
*/
/* 
TODO:Use bracket notation [] when accessing properties with a variable.
变动的情况下 使用[]
const luke = {
  jedi: true,
  age: 28,
};
function getProp(prop) {
  return luke[prop];
}
const isJedi = getProp('jedi');
*/
/* 
TODO:使用指数运算符  Use exponentiation operator ** when calculating exponentiations.
// bad
const binary = Math.pow(2, 10);
// good
const binary = 2 ** 10; */