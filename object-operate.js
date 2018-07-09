/* 
TODO:获取对象长度 
*/
/* var obj = {"c1":1,"c2":2};
function countProperties(obj){
　　var count = 0;
    for(var property in obj){
        if(obj.hasOwnProperty(property)){
            count++;
        }
    }
    return count;
}
//TODO:Object.keys()  枚举对象的属性（键），形成一个数组
var len = countProperties(obj);
console.log(len);//结果为2
var obj2 = {"c1":1,"c2":2};
 var arr = Object.keys(obj);
 var len = arr.length;
 console.log(len);//结果为2  */

 /*TODO:用另一个对象替换当前对象，接收两个参数，第一个参数表示需要绑定的this变量，第二个参数是数组，表示函数本身的参数 var xiaoming = {
    "name":"xiaoming",
     "birth":1990,
     "age":function(){
            var y = new Date().getFullYear();
            return y - this.birth ;
    }
}
var fn = xiaoming.age;
alert(fn.apply(xiaoming,[]));    //26
alert(fn());//NaN
//变量fn获取到age对应的函数，此时函数中的this指向window,故fn()返回NaN，调用apply使fn中的this指向xiaoming，故返回26
  */
 /*
 TODO: Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。 它将返回目标对象。
 IE不支持
 !复制一个对象
 var obj = {
   a: 1
 };
 var copy = Object.assign({}, obj);
 console.log(copy); // { a: 1 }
 !拷贝问题
 针对深拷贝， 需要使用其他方法， 因为 Object.assign() 拷贝的是属性值。 假如源对象的属性值是一个指向对象的引用， 它也只拷贝那个引用值。
 function test() {
   'use strict';

   let obj1 = {
     a: 0,
     b: {
       c: 0
     }
   };
   let obj2 = Object.assign({}, obj1);
   console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

   obj1.a = 1;
   console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
   console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

   obj2.a = 2;
   console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
   console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}

   obj2.b.c = 3;
   console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
   console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}

   // Deep Clone
   obj1 = {
     a: 0,
     b: {
       c: 0
     }
   };
   let obj3 = JSON.parse(JSON.stringify(obj1));
   obj1.a = 4;
   obj1.b.c = 4;
   console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}
 }

 test();

 !合并对象
 var o1 = {
   a: 1
 };
 var o2 = {
   b: 2
 };
 var o3 = {
   c: 3
 };

 var obj = Object.assign(o1, o2, o3);
 console.log(obj); // { a: 1, b: 2, c: 3 }
 console.log(o1); // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
 !合并具有相同属性的对象
 var o1 = {
   a: 1,
   b: 1,
   c: 1
 };
 var o2 = {
   b: 2,
   c: 2
 };
 var o3 = {
   c: 3
 };

 var obj = Object.assign({}, o1, o2, o3);
 console.log(obj); // { a: 1, b: 2, c: 3 }
 */
 /*
 TODO:Object.getPrototypeOf(object)给定对象的原型。如果没有继承属性，则返回 null 。
 var proto = {};
 var obj = Object.create(proto);
 Object.getPrototypeOf(obj) === proto; // true
 var reg = /a/;
 Object.getPrototypeOf(reg) === RegExp.prototype; // true
 !JavaScript中的 Object 是构造函数（ 创建对象的包装器）。
 一般用法是：
 var obj = new Object();
 所以：
 Object.getPrototypeOf(Object); // ƒ () { [native code] }
 Object.getPrototypeOf(Function); // ƒ () { [native code] }
 Object.getPrototypeOf(Object) === Function.prototype; // true
 Object.getPrototypeOf(Object) 是把Object这一构造函数看作对象，
 返回的当然是函数对象的原型， 也就是 Function.prototype。
 正确的方法是， Object.prototype是构造出来的对象的原型。
 var obj = new Object();
 Object.prototype === Object.getPrototypeOf(obj); // true
 Object.prototype === Object.getPrototypeOf({}); // true
 */
/*
TODO： Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组， 其排列与使用for... in 循环遍历该对象时返回的顺序一致（ 区别在于for - in 循环也枚举原型链中的属性）。
IE不兼容
*Object.entries() 返回一个数组， 其元素是与直接在object上找到的可枚举属性键值对相对应的数组。 属性的顺序与通过手动循环对象的属性值所给出的顺序相同。
const obj = {
  foo: 'bar',
  baz: 42
};
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

// array like object
const obj = {
  0: 'a',
  1: 'b',
  2: 'c'
};
console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

// array like object with random key ordering
const anObj = {
  100: 'a',
  2: 'b',
  7: 'c'
};
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

// getFoo is property which isn't enumerable
const myObj = Object.create({}, {
  getFoo: {
    value() {
      return this.foo;
    }
  }
});
myObj.foo = 'bar';
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]

// non-object argument will be coerced to an object
console.log(Object.entries('foo')); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

// iterate through key-value gracefully
const obj = {
  a: 5,
  b: 7,
  c: 9
};
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}

// Or, using array extras
Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
});
*/
/*
 TODO: Object.isSealed(obj) 
 *如果这个对象是密封的， 则返回 true， 否则返回 false。 密封对象是指那些不可 扩展 的， 且所有自身属性都不可配置且因此不可删除（ 但不一定是不可写） 的对象。
 */
/*
TODO: Object.isFrozen(obj)
*一个对象是冻结的是指它不可扩展， 所有属性都是不可配置的， 且所有数据属性（ 即没有getter或setter组件的访问器的属性） 都是不可写的。
*/
/*
TODO: Object.isExtensible(obj)
*默认情况下， 对象是可扩展的： 即可以为他们添加新的属性。 以及它们的 __proto__ 属性可以被更改。 Object.preventExtensions， Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（ non - extensible）
*/
/*
TODO: Object.is(value1, value2);
*表示两个参数是否相同的Boolean。
Object.is() 判断两个值是否相同。 如果下列任何一项成立， 则两个值相同：
两个值都是 undefined
两个值都是 null
两个值都是 true 或者都是 false
两个值是由相同个数的字符按照相同的顺序组成的字符串
两个值指向同一个对象
两个值都是数字并且
都是正零 + 0
都是负零 - 0
都是 NaN
都是除零和 NaN 外的其它同一个数字
这种相等性判断逻辑和传统的 == 运算符所用的不同， == 运算符会对它两边的操作数做隐式类型转换（ 如果它们类型不同）， 然后才进行相等性比较，（ 所以才会有类似 "" == false 为 true 的现象）， 但 Object.is 不会做这种类型转换。
这与 === 运算符也不一样。 === 运算符（ 和 == 运算符） 将数字值 - 0 和 + 0 视为相等， 并认为Number.NaN不等于NaN。
https: //developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
*/