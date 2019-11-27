/* 
TODO:splice 方法 
splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
!该方法会改变原始数组。
arrayObject.splice(index,howmany,item1,.....,itemX)
如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。
*/
var lang = ["php", "java", "javascript"];
//删除 
var removed = lang.splice(1, 1);
console.log(lang); //php,javascript 
console.log(removed); //java ,//!返回删除的项 
//插入 
var insert = lang.splice(0, 0, "asp"); //!从第0个位置开始插入 
console.log(insert); //返回空数组 
console.log(lang); //asp,php,javascript 
//替换 
var replace = lang.splice(1, 1, "c#", "ruby"); //删除一项，插入两项 
console.log(lang); //asp,c#,ruby ,javascript
console.log(replace); //php,返回删除的项 

/* TODO:slice()
!返回从原数组中指定开始下标到结束下标之间的项组成的新数组。 浅拷贝
slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。
!如果有两个参数，!包括 begin，不包括end
!begin 可选
提取起始处的索引（从 0 开始），从该索引开始提取原数组元素。
如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
如果省略 begin，则 slice 从索引 0 开始。
如果 begin 大于原数组的长度，则会返回空数组。
!end 可选
提取终止处的索引（从 0 开始），在该索引处结束提取原数组元素。slice 会提取原数组中索引从 begin 到 end 的所有元素（包含 begin，但不包含 end）。
slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。
如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
如果 end 被省略，则 slice 会一直提取到原数组末尾。
如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。
*/
var arr = [1, 3, 5, 7, 9, 11];
var arrCopy = arr.slice(1);
var arrCopy2 = arr.slice(1, 4);
var arrCopy3 = arr.slice(1, -2);
var arrCopy4 = arr.slice(-4, -1);
var arrCopy5 = arr.slice(-4);
var arrCopy6 = arr.slice(1, -1);
var arrCopy7 = arr.slice(999);
console.log(arr); //[1, 3, 5, 7, 9, 11](原数组没变)
console.log(arrCopy); //[3, 5, 7, 9, 11]
console.log(arrCopy2); //[3, 5, 7]
console.log(arrCopy3); //[3, 5, 7]
console.log(arrCopy4); //[5, 7, 9]
console.log(arrCopy5); //[5, 7, 9, 11]
console.log(arrCopy6); //[3,5, 7, 9]
console.log(arrCopy7); //[]

/* 
TODO:join 组成字符串 ,数组不变
*/
/* let arr = [1,2,3,]
console.log(arr.join());//1,2,3
console.log(arr.join('-'));//1-2-3
console.log(arr.join(''));//123
console.log(arr); //[1,2,3,] 
//通过join()方法可以实现重复字符串，只需传入字符串以及重复的次数，就能返回重复后的字符串，函数如下：
function repeatString(str, n) {
return new Array(n + 1).join(str);
}
console.log(repeatString("abc", 3)); // abcabcabc
console.log(repeatString("Hi", 5)); // HiHiHiHiHi*/
/* 
TODO:push() 和 pop()
push(): 可以接收任意数量的参数，把它们逐个添加到数组末尾，并
!返回修改后数组的长度。 
pop()：数组末尾移除最后一项，减少数组的 length 值，然后
!返回移除的项。
*/
/* 
var arr = ["Lily","lucy","Tom"];
var count = arr.push("Jack","Sean");
console.log(count); // 5
console.log(arr); // ["Lily", "lucy", "Tom", "Jack", "Sean"]
var item = arr.pop();
console.log(item); // Sean
console.log(arr); // ["Lily", "lucy", "Tom", "Jack"]
 */
/* 
TODO:shift() 和 unshift()
shift()：删除原数组第一项，并
!返回删除元素的值；如果数组为空则返回undefined 。 
unshift:将参数添加到原数组开头，并
!返回数组的长度 。
*/
/* 
var arr = ["Lily","lucy","Tom"];
var count = arr.unshift("Jack","Sean");
console.log(count); // 5
console.log(arr); //["Jack", "Sean", "Lily", "lucy", "Tom"]
var item = arr.shift();
console.log(item); // Jack
console.log(arr); // ["Sean", "Lily", "lucy", "Tom"]
 */
/*TODO:sort()

sort()：按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。
在排序时，sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， sort()方法比较的也是字符串，因此会出现以下的这种情况：
var arr1 = ["a", "d", "c", "b"];
console.log(arr1.sort()); // ["a", "b", "c", "d"]
arr2 = [13, 24, 51, 3];
console.log(arr2.sort()); // [13, 24, 3, 51]
console.log(arr2); // [13, 24, 3, 51](元数组被改变)
为了解决上述问题，sort()方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。以下就是一个简单的比较函数：
function compare(value1, value2) {
if (value1 < value2) {
return -1;
} else if (value1 > value2) {
return 1;
} else {
return 0;
}
}
arr2 = [13, 24, 51, 3];
console.log(arr2.sort(compare)); // [3, 13, 24, 51]
如果需要通过比较函数产生降序排序的结果，只要交换比较函数返回的值即可：

function compare(value1, value2) {
if (value1 < value2) {
return 1;
} else if (value1 > value2) {
return -1;
} else {
return 0;
}
}
arr2 = [13, 24, 51, 3];
console.log(arr2.sort(compare)); // [51, 24, 13, 3]  */
/* TODO:reverse()：反转数组项的顺序。 */
/* 

var arr = [13, 24, 51, 3];
console.log(arr.reverse()); //[3, 51, 24, 13]
console.log(arr); //[3, 51, 24, 13](原数组改变) */
/*
TODO:concat()
!concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组(返回一个浅拷贝)。
!注意：数组/值在连接时保持不变。此外，对于新数组的任何操作（仅当元素不是对象引用时）都不会对原始数组产生影响，反之亦然。
!它不会递归到嵌套数组参数中。
var arr = [1,3,5,7];
var arrCopy = arr.concat(9,[11,13]);
console.log(arrCopy); //[1, 3, 5, 7, 9, 11, 13]
console.log(arr); // [1, 3, 5, 7](原数组未被修改)
var arrCopy2 = arr.concat([9,[11,13]]);
console.log(arrCopy2); //[1, 3, 5, 7, 9, Array[2]]
console.log(arrCopy2[5]); //[11, 13]
*/

/* 
TODO:indexOf 和 lastIndexOf（）
indexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找。 
lastIndexOf：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的末尾开始向前查找。
这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1。在比较第一个参数与数组中的每一项时，会
!使用全等操作符。
 */
/* var arr = [1,3,5,7,7,5,3,1];
console.log(arr.indexOf(5)); //2
console.log(arr.lastIndexOf(5)); //5
console.log(arr.indexOf(5,2)); //2
console.log(arr.lastIndexOf(5,4)); //2
console.log(arr.indexOf("5")); //-1
 */

/* 
TODO:forEach 
!forEach 方法按升序为数组中含有效值的每一项执行一次callback 函数，那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）。
!forEach 遍历的范围在第一次调用 callback 前就会确定。调用 forEach 后添加到数组中的项不会被 callback 访问到。
!返回undefined
*/

/* var arr = [1,2,3,4,5]
arr.forEach((val,index,arr) => {
  console.log(val,index,arr);
}) */

/* 
TODO:map()
!map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
!返回值：回调函数的结果组成了新数组的每一个元素。
!因为map生成一个新数组，当你不打算使用返回的新数组却使用map是违背设计初衷的
!map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）
!根据规范中定义的算法，如果被map调用的数组是离散的，新数组将也是离散的保持相同的索引为空。
!map 方法处理数组元素的范围是在 callback 方法第一次调用之前就已经确定了

为什么我应该用它呢？

它可以让你避免对原始数组进行修改
你可以修改你所需的元素项
代码可读性更高
 */
/* var arr = [1,2,3,4,5]

var arr2 = arr.map(function(item){
  item++
 return item*item
  });
console.log(arr2); //[ 4, 9, 16, 25, 36 ] */

/*
 TODO:filter
 !filter 不会改变原数组，它返回过滤后的新数组。
 !filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或等价于 true 的值的元素创建一个新数组。
 !返回值：一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。
 !filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。
 */
/* var arr = [1,2,3,4,5,6,7,8,9,10]
var arr2 = arr.filter(function (val,index,arr) {
  console.log(arr);
  return val >=3 || index / 2 === 0
  
})
console.log(arr2,'i am arr2'); */

/*
 TODO:every 
 !这种情况属于无条件正确：正因为一个空集合没有元素，所以它其中的所有元素都符合给定的条件。
 !every()：判断数组中每一项都是否满足条件
 !返回值：如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false。
 !every 方法为数组中的每个元素执行一次 callback 函数，直到它找到一个会使 callback 返回 falsy 的元素。如果发现了一个这样的元素，every 方法将会立即返回 false。否则，callback 为每一个元素返回 true，every 就会返回 true。callback 只会为那些已经被赋值的索引调用。不会为那些被删除或从未被赋值的索引调用。
 !every 遍历的元素范围在第一次调用 callback 之前就已确定了。
  */
/* var arr = [1,2,3,4,5,6,7,8,9,10]
var arr2 = arr.every(function (val,index,arr) {
  return arr.length<10 && val<100 && index /2 ==0
})
console.log(arr2);
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.every(function(x) {
return x < 10;
}); 
console.log(arr2); //true
var arr3 = arr.every(function(x) {
return x < 3;
}); 
console.log(arr3); // false */
/* 
TODO:some() 
!some()：方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
!返回值：数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false。
!some() 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some() 将会立即返回 true。否则，some() 返回 false。callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。
*/
/* var arr = [1,2,3,4,]

console.log(arr.some(function (x,index,arr) {
  return x == 1 || index == 5 || arr.length===3
}));
console.log(arr.some(function (x) {
  return x == 1
})); */

/* 
TODO: reduce reduceRight这两个方法都会实现迭代数组的所有项，然后构建一个最终返回的值。reduce()方法从数组的第一项开始，逐个遍历到最后。而 reduceRight()则从数组的最后一项开始，向前遍历到第一项。
!接收两个参数：一个在每一项上调用的reducer函数和作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
!reducer函数接受四个参数：
!Accumulator (acc) (累计器)
!Current Value (cur) (当前值)
!Current Index (idx) (当前索引)
!Source Array (src) (源数组)
! 返回值：函数累计处理的结果
*/

var arr = [1,2,3,4,5]
console.log(arr.reduce(function(pre,cur){
  return pre+cur
}, 10)); // 25

var arr = [1,2,3,4,5]
console.log(arr.reduce(function(pre,cur){
  return pre+cur
}));  // 15



//!TODO 数组的对象解构 */
/* 数组的对象解构
数组也可以对象解构，可以方便的获取数组的第n个值 */
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');

country // US
state // New Yourk
