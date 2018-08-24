/* 
TODO:splice 方法 
splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

注释：
!该方法会改变原始数组。

语法
arrayObject.splice(index,howmany,item1,.....,itemX)
参数	描述
index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
item1, ..., itemX	可选。向数组添加的新项目。
返回值
类型	描述
Array	包含被删除项目的新数组，如果有的话。
说明
splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。

如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。
*/
var lang = ["php","java","javascript"]; 
//删除 
var removed = lang.splice(1,1); 
console.log(lang); //php,javascript 
console.log(removed); //java ,返回删除的项 
//插入 
var insert = lang.splice(0,0,"asp"); //!从第0个位置开始插入 
console.log(insert); //返回空数组 
console.log(lang); //asp,php,javascript 
//替换 
var replace = lang.splice(1,1,"c#","ruby"); //删除一项，插入两项 
console.log(lang); //asp,c#,ruby ,javascript
console.log(replace); //php,返回删除的项 

/* TODO:slice()
!返回从原数组中指定开始下标到结束下标之间的项组成的新数组。
slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。
!如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。
 */
var arr = [1,3,5,7,9,11];
var arrCopy = arr.slice(1);
var arrCopy2 = arr.slice(1,4);
var arrCopy3 = arr.slice(1,-2);
var arrCopy4 = arr.slice(-4,-1);
console.log(arr); //[1, 3, 5, 7, 9, 11](原数组没变)
console.log(arrCopy); //[3, 5, 7, 9, 11]
console.log(arrCopy2); //[3, 5, 7]
console.log(arrCopy3); //[3, 5, 7]
console.log(arrCopy4); //[5, 7, 9]
/* arrCopy只设置了一个参数，也就是起始下标为1，所以返回的数组为下标1（包括下标1）开始到数组最后。 
arrCopy2设置了两个参数，返回起始下标（包括1）开始到终止下标（不包括4）的子数组。 
arrCopy3设置了两个参数，终止下标为负数，当出现负数时，将负数加上数组长度的值（6）来替换该位置的数，因此就是从1开始到4（不包括）的子数组。 
arrCopy4中两个参数都是负数，所以都加上数组长度6转换成正数，因此相当于slice(2,5)。 */

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
这组方法和上面的push()和pop()方法正好对应，一个是操作数组的开头，一个是操作数组的结尾。
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
concat() ：将参数添加到原数组中。这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后
!返回新构建的数组。在没有给 concat()方法传递参数的情况下，它只是复制当前数组并返回副本。
var arr = [1,3,5,7];
var arrCopy = arr.concat(9,[11,13]);
console.log(arrCopy); //[1, 3, 5, 7, 9, 11, 13]
console.log(arr); // [1, 3, 5, 7](原数组未被修改)
从上面测试结果可以发现：传入的不是数组，则直接把参数添加到数组后面，如果传入的是数组，则将数组中的各个项添加到数组中。但是如果传入的是一个二维数组呢？
var arrCopy2 = arr.concat([9,[11,13]]);
console.log(arrCopy2); //[1, 3, 5, 7, 9, Array[2]]
console.log(arrCopy2[5]); //[11, 13]
上述代码中，arrCopy2数组的第五项是一个包含两项的数组，也就是说concat方法只能将传入数组中的每一项添加到数组中，如果传入数组中有些项是数组，那么也会把这一数组项当作一项添加到arrCopy2中。  */

/* 
TODO:indexOf 和 lastIndexOf（）
indexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找。 
lastIndexOf：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的末尾开始向前查找。
这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回1。在比较第一个参数与数组中的每一项时，会
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
TODO:forEach 对数组进行遍历循环，对数组中的每一项运行给定函数。这个方法没有返回值。参数都是function类型，默认有传参，这三个参数按需选择就好，参数分别为：遍历的数组内容；第对应的数组索引，数组本身。
!无返回值
*/
/* var arr = [1,2,3,4,5]
arr.forEach((val,index,arr) => {
  console.log(val,index,arr);
}) */
/* 
TODO:map()：指“映射”，参数和上面的forEach方法一样，但是有返回值，但是对数组中的每一项运行给定函数，
!函数每次的返回值组成的数组。
 */
/* var arr = [1,2,3,4,5]
arr.map(function (item,index,arr) {
 console.log(item,index,arr);
})
var arr2 = arr.map(function(item){
  item++
 return item*item
  });
console.log(arr2); //[ 4, 9, 16, 25, 36 ] */
/*
 TODO:filter “过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。也是有三个参数可选，，
 !也有返回值，返回值为 筛选满足条件的东西 组成数组
 */
/* var arr = [1,2,3,4,5,6,7,8,9,10]
var arr2 = arr.filter(function (val,index,arr) {
  console.log(arr);
  return val >=3 || index / 2 === 0
  
})
console.log(arr2,'i am arr2'); */
/*
 TODO:every every()：判断数组中每一项都是否满足条件，只有所有项都满足条件，
 !才会返回true。
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
TODO:some() some()：判断数组中是否存在满足条件的项，
!只要有一项满足条件，就会返回true。
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

这两个方法都
!接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。

!传给 reduce()和 reduceRight()的函数接收 4 个参数：
*前一个值、当前值、项的索引和数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。
*/
/* var arr = [1,2,3,4,5]
console.log(arr.reduce(function(pre,cur){
  return pre+cur
},10));
 */


 //TODO:去重
 Array.from(new Set('dd'))  //传入类数组，数组

 //TODO:
 https://juejin.im/post/5b5570a96fb9a04fa671a937?utm_source=gold_browser_extension

//TODO:数组 位置调换
  // 取消点击切到第一位
    /* const title = params.catetile
    const first = listTitle[0]
    listTitle.forEach((val, index, arr) => {
      if (val.title === title) {
        listTitle[0] = listTitle[index]
        listTitle[index] = first
      }
    }) */

//!todo/* 统计数组中相同项的个数 */
var cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];
var carsObj = cars.reduce(function (obj, name) {
  console.log(obj,name);
  obj[name] = obj[name] ? ++obj[name] : 1;
  return obj;
}, {});
carsObj; // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }


//!TODO/*  数组平铺到指定深度*/
/* 使用递归，为每个深度级别 depth 递减 1 。 使用 Array.reduce() 和 Array.concat() 来合并元素或数组。 基本情况下，depth 等于 1 停止递归。 省略第二个参数，depth 只能平铺到 1 (单层平铺) 的深度。 */
const flatten = (arr, depth = 1) =>
  depth != 1
    ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
    : arr.reduce((a, v) => a.concat(v), []);
flatten([1, [2], 3, 4]);                    		 // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2);           // [1, 2, 3, [4, 5], 6, 7, 8]

//!TODO 数组的对象解构 */
/* 数组的对象解构
数组也可以对象解构，可以方便的获取数组的第n个值 */
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');

country			// US
state			// New Yourk

//!todo使用解构删除不必要属性
/* 
有时候你不希望保留某些对象属性，也许是因为它们包含敏感信息或仅仅是太大了（just too big）。你可能会枚举整个对象然后删除它们，但实际上只需要简单的将这些无用属性赋值给变量，然后把想要保留的有用部分作为剩余参数就可以了。
下面的代码里，我们希望删除_internal和tooBig参数。我们可以把它们赋值给internal和tooBig变量，然后在cleanObject中存储剩下的属性以备后用。 */
let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal:"secret", tooBig:{}, el2: '2', el3: '3'};

console.log(cleanObject);                         // {el1: '1', el2: '2', el3: '3'}