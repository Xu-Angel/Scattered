
// joining arrays
const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);
 
// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice()

// --->

// joining arrays
const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]
 
// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = [...arr];

// !和 concat( ) 功能不同的是，用户可以使用扩展运算符在任何一个数组中插入另一个数组。

const odd = [1, 3, 5 ];
const nums = [2, ...odd, 4 , 6];

//! 扩展运算符（...）也会调用默认的 Iterator 接口。

// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']
console.log([...`${'123.s52df'}`])  // [ '1', '2', '3', '.', 's', '5', '2', 'd', 'f' ]
console.log([...`${123}`])  // [ '1', '2', '3' ]
