// !一模一样的完全继承
class Point {}
class DocPoint extends Point {}
const doc = new DocPoint()

// DocPoint 继承了 Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。

// 进行一些改造
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

//todo constructor方法和 toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，用来新建父类的this对象。


// todo子类必须在 constructor方法中调用 super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
class Point {}
class DocPoint extends Point {
  constructor() {}
}
const doc = new DocPoint() // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor  它的构造函数没有调用super方法，导致新建实例时报错。

//! ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

//todo 另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。
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

const doc = new Doc() 
console.log(doc instanceof Doc, doc instanceof Point) // true true // 实例对象 doc 同时是 Doc 和 Point两个类的实例，这与 ES5 的行为完全一致。
//todo上面代码中，子类的 constructor方法没有调用 super之前，就使用this关键字，结果报错，而放在super方法之后就是正确的。

// ! 父类的静态方法也会被子类继承
class A {
  static hello() {
    console.log('hello')
  }
}

class B extends A {}

const b = new B()
// !Object.getPrototypeOf方法可以用来从子类上获取父类。
console.log(Object.getPrototypeOf(B) === A);
B.hello()
b.hello() // TypeError: b.hello is not a function 
//!子类可以继承父类的静态方法，而子类的实例对象是不能继承和使用父类的静态方法。