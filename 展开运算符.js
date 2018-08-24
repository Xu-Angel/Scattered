展开运算符
展开运算符是在 ES6 中引入的，使用展开运算符能够让 JavaScript 代码更加有效和有趣。

使用展开运算符可以替换某些数组函数。

// joining arrays
const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);
 
// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice( )
简写为：

// joining arrays
const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]
 
// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = [...arr];
和 concat( ) 功能不同的是，用户可以使用扩展运算符在任何一个数组中插入另一个数组。

const odd = [1, 3, 5 ];
const nums = [2, ...odd, 4 , 6];
也可以将展开运算符和 ES6 解构符号结合使用：

const { a, b, ...z } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a) // 1
console.log(b) // 2
console.log(z) // { c: 3, d: 4 }