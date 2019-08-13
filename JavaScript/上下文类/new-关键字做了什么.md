# new关键字都做了什么呢

### 步骤
① 创建一个新的空的对象。
② 将原构造函数的作用域赋给新的对象，这样`this`就指向了这个新对象。
③ 执行构造函数中的代码，也就是为新的对象添加各种属性。
④ 返回这个新的对象

---

- 创建了一个全新的对象。
- 这个对象会被执行[[Prototype]]（也就是__proto__）链接。
- 生成的新对象会绑定到函数调用的this。
- 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
- 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象。

链接：https://juejin.im/post/5bde7c926fb9a049f66b8b52


### 代码实现
```js
function New(fun){
    return function(){
        var o = {}                           //创建临时对象
        o.__proto__ = fun.prototype;         // 将父类的作用域赋值给新对象
        fun.apply(o,arguments);                //用新的参数，继承父类的属性，调用父类的构造器，生成新的属性
        return o;                            //返回新对象
    }
}

```

```js
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    // // 根据规范，返回 null 和 undefined 不处理，依然返回obj
    return ret instanceof Object ? ret : obj;
}
```
