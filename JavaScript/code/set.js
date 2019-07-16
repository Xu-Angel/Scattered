/* console.log(foo);
var foo=1; */
/* console.log(foo2);
let foo2=1 */
/* typeof X
let X */
// let s = Symbol();console.log( typeof s);
const s = new Set();
const arr = [2,3,4,5,6,7,3,2,4];
arr.forEach( x => s.add(x))
// for (const i of s) {
//   console.log(i);
// }
const onArr = new Set(arr);
// console.log( typeof onArr);
// console.log([...onArr]);
// function dedupe(array){
//   return Array.from(new Set(array))
// }
// console.log(dedupe(arr));
// console.log(typeof dedupe(arr));
// for (const iterator of onArr) {
//   console.log(iterator);
// }
// for (const iterator of onArr.keys()) {
//   console.log(iterator);
// }
// for (const iterator of onArr.values()) {
//   console.log(iterator);
// }
for (const iterator of onArr.entries()) {
  console.log(iterator);
}
/* 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
*/