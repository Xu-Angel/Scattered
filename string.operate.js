/* TODO:长度 length */
/* var str = 'hello world'
console.log(str.length) */
/* TODO: 索引 index*/
/* var str = "hello world"
console.log(str[0]);
str[0] = "H";//不会影响str,但也不会报错
console.log(str[0]); */
/* TODO: toUpperCase toLowerCase  将字符串全部转为大写/小写，并返回原字符串不变*/
/* var str = "hello world";
console.log(str.toUpperCase());
console.log(str); */
/* TODO: indexOf(val,index) 搜索指定字符串出现的位置，接收两个参数，第一个参数表示要查找的元素，第二个参数表示要开始查找的位置，若找到则返回对应元素所在的位置，否则返回-1*/
/* 
var s = 'hello world!';
alert(s.indexOf('world'));//返回6
alert(s.indexOf('World'));//返回-1
alert(s.indexOf('o'));//返回4
alert(s.indexOf('o',6));//从第六位开始查找，返回7 */
/* TODO:concat 将一个或多个字符串拼接起来，返回拼接到的新的字符串，原字符串不变*/
/* var str1 = 'hello'
var res = str1.concat(' world',' !')
console.log(res); */
/* TODO:slice(startIndex,endIndex) 返回被操作字符的子字符串，原字符串不变，接受两个参数，字符串的起始位置和结束位置，返回的字符串不包含结束位置的字符，第一个参数要小于第二个参数，否则返回"",若只有一个参数，返回起始位置到字符串结尾的所有字符串，若传递的参数为负数，将传入的负值与字符创的长度相加*/
/* var str = "hello world!";
console.log(str.slice(3,7));//返回lo w
console.log(str.slice(3));//返回lo world!
console.log(str.slice(9,5));//返回""
console.log(str.slice(-7,-3));//负数与长度相加，即str.slice(5,9)返回 wor
console.log(str.slice(5,9));//返回 wor */
/* TODO: substring(startIndex,endIndex)当传入的参数是正数时，substring与slice的功能基本相同，唯一的区别是当第一个参数大于第二个参数时，方法将第二个参数作为截取的起始位置而将第一个参数作为截取结束的位置，且截取的字符串不包含第一个参数位置对应的值，当传入的参数是负值时，该方法会将所有的负值转化为0*/
/* var str = "hello world!";
console.log(str.substring(3,7));//返回lo w
console.log(str.substring(3));//返回lo world!
console.log(str.substring(9,5));//返回 wor,即str.substring(5,9),不包含第九项
console.log(str.substring(-7,-3));//负数与长度相加，即str.substring(0,0)返回""
console.log(str.substring(-7,3));//负数与长度相加，即str.substring(0,3)返回hel
console.log(str) */
/* TODO: substr(index,length)  返回指定位置开始的指定长度的字符串，原字符串不变，若第二个参数缺省就一直截取到字符串结束，当传递的参数为负值时，方法会将负的第一个参数与字符串的长度相加，将负的第二个参数转化为0*/
/* var str = "hello world!";
console.log(str.substr(3,7));//lo worl
console.log(str.substr(3));//lo world!
console.log(str.substr(9,5));//ld！
console.log(str.substr(-7,-3));//""
console.log(str.substr(-7,3));//wo
console.log(str) */
/* TODO:split(separator,newArrlength) 基于指定的分隔符将一个字符串分割成多个字符串，并将结果存放在一个数组中，可以传两个参数，第一个参数为分隔符，第二个参数用于指定返回数组的大小，若省略该参数，则返回整个数组
 */
/* var s = "1,23,45";
var arr1 = s.split(",");
console.log(arr1);//返回数组['1','23','45']
var arr2 = s.split(",",2);
console.log(arr2);//返回数组['1','23']
var s1 = '123456'
console.log(s1.split(''))//[ '1', '2', '3', '4', '5', '6' ] */
/* TODO:trim() 去除字符串 前面和后面的空格 */
/* var str = '    hello world   '
var str1 = '    hello w0orld   '
console.log(str.trim());

//String.prototype.trim = function () {
   return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
//  }

/* TODO:typeof可以返回变量的类型，返回值为字符串，其值有

"undefined"

"boolean"

"string"

"number"

"object"

"function" */
/* console.log(typeof(null)); */

let str = '12px'
str.split('px')
(2) ["12", ""]
let str2 = '12px'
str2.slice('-2')
"px"
let str3 = '12px'
str3.slice(0,-2)
"12"
