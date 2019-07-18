# es6_类的继承

## 子类的构造函数

* 子类必须在`constructor`中使用 `super`关键字调用父类的构造方法，因为子类没有自己的`this`对象，必须调用父类的
否则报错

```error
VM3089:2 Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    at new myPoint1
```

* 子类也可以不显式书写构造函数，作用等同于默认调用父类的构造函数进行构造
* 子类的构造函数，其作用主要是①调用父类构造函数 ②对父类工造函数进行改造、修饰
**所以在使用`super`关键字对父类进行调用前，不可以使用`this`关键字调用属性，进行性修饰**

### 子类的实例

* **子类的实例既是子类的`实例`，也是父类的`实例`，这里的实例是我们常提到的`instance`**

```js
   class Men extents Person{};
   let Tony = new Men("tony","177");
   Tony instanceof Men;   // true
   Tony instanceof Peoson;  // true
```

### 子类可以继承父类的静态方法

* 如另一篇[文章](https://github.com/HXWfromDJTU/blog/blob/master/es6_class.md)第五点特性提到的，父类的静态方法可以被其子类所继承

```js
class A{
    static fatherFun(){
      console.log("this is father static function")
    }
}
class B extends A{}
B.fatherFun(); // this is fatehr static function
```

### 获取父类

```js
  class Son extends Father{}
  Object.getPrototypeOf(Son)  === Father;  // true
```

### 一模一样的完全继承

```js
class Point {}
class DocPoint extends Point {}
const doc = new DocPoint()
```
DocPoint 继承了 Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。

constructor方法和 toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，用来新建父类的this对象。

```js
class Point {
  constructor(x, y) {
    console.log('x+y=', x + y);
  }
  toHi() {
    console.log('hi')
  }
}
class DocPoint extends Point {
  constructor(x, y, color) {
    super(x,y) // 调用父类的constructor(x, y)
    this.color = color
  }
  sonToHi() {
    console.log('son')
    super.toHi() // 调用父类的toString()
  }
}

const p = new DocPoint(1, 2) // x+y= 3
p.sonToHi()  // son  hi
```

子类必须在 constructor方法中调用 super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。

```js
class Point {}
class DocPoint extends Point {
  constructor() {}
}
const doc = new DocPoint() // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor  它的构造函数没有调用super方法，导致新建实例时报错。
```

*ES5 的继承*，**实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）**。
*ES6 的继承机制完全不同*，**实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。**

另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。

```js
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Doc extends Point {
  constructor(x, y, color) {
    // this.color = color  // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    super(x, y)
    this.color = color  // 正确
  }
}
```

### 类不存在变量提升（hoist），这一点与 ES5 完全不同

```js
new Foo()
class Foo {}
```

Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。
