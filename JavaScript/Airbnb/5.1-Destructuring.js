/* FIXME: Destructuring 解构赋值
Use object destructuring when accessing and using multiple properties of an object
 */
/* 
TODO:对象的解构赋值 */
/* // bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  return `${firstName} ${lastName}`;
}
// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}
// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
} */
/* 
TODO:数组解构赋值 */
/* const arr = [1, 2, 3, 4];
// bad
const first = arr[0];
const second = arr[1];
// good
const [first, second] = arr; */
/* 
TODO: 函数返回值 使用对象而不是数组，不用考虑顺序 
Why? You can add new properties over time or change the order of things without breaking call sites.
*/

/* // bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}
// the caller needs to think about the order of return data
const [left, __, top] = processInput(input);
// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}
// the caller selects only the data they need
const { left, top } = processInput(input); */
