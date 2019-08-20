## `apply` `bind` `call` `this` 的恩怨情仇

**https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind**

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this

### 性能对比，用哪个

https://github.com/noneven/__/issues/6

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/84

- Function.prototype.apply和Function.prototype.call 的作用是一样的，区别在于传入参数的不同；
- 第一个参数都是，指定函数体内this的指向；
- 第二个参数开始不同，apply是传入带下标的集合，数组或者类数组，apply把它传给函数作为参数，call从第二个开始传入的参数是不固定的，都会传给函数作为参数。
- call比apply的性能要好，平常可以多用call, call传入参数的格式正是内部所需要的格式，参考call和apply的性能对比

### this的指向

this永远指向最后调用它的那个对象。

### 几个栗子
##### eg1
```js
var name = "global";
    var a = {
        name: "inner",
        fn : function () {
            console.log(this.name);      
        }
    }
a.fn();   // inner
```
##### eg2
* 在`window`下，使用`var`定义的变量，都是挂在`window`下的
```js
  var name = "global";
    var a = {
        name : null,
        fn : function () {
            console.log(this.name);      
        }
    }
    var f = a.fn;
    f();  // global
```
##### eg3
* 在es 5中this永远指向最后一个调用它的对象
```js
 var name = "global";
    function fn() {
        var name = 'inner';
        innerFunction();
        function innerFunction() {
            console.log(this.name);      
        }
    }
    fn()  // global
```
### 如何改变 `this`的指向
___
① 使用`call`、`apply`、`bind`
② 使用`_this = this;`
③ 使用 ES6的箭头函数
④ 使用 `new` 实例化一个对象

#### apply与call的区别

apply
> function.apply(thisArg, [argsArray])

call
> fun.call(thisArg, arg1, arg2, ...)

* apply和call都是改变对象的this指向，改变方法的调用对象。

* apply传参是以数组形式，call传参是以多个参数逗号分隔依次传参。

#### bind 与  call 的区别

> fun.bind(thisArg[, arg1[, arg2[, ...]]])
* bind的返回值是`this指向`改造后的函数的拷贝，且不会自动执行，如有需要，请手动执行返回的函数。call返回的是`this`改造后的函数，并且立即执行。

* 二者传入参数的时候，都是使用逗号分隔依次传入。