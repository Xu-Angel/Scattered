//! 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

class Foo {
  static classMethod() {
    console.log('hello')
  }
}

Foo.classMethod()  // hello

const foo = new Foo()
foo.classMethod() // foo.classMethod is not a function

// 上面代码中，Foo类的 classMethod方法前有 static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

// !，如果静态方法包含this关键字，这个this指的是类，而不是实例。
class Foo {
  static bar() {
    this.baz()
  }
  static baz() {
    console.log('class baz');
  }
  baz() {
    console.log('instance baz');
  }
}

Foo.bar() // class baz
// 静态方法 bar调用了 this.baz，这里的 this指的是 Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

// !父类静态方法可以被子类继承

class Foo {
  static classMethod() {
    console.log('hello')
  }
}

class son extends Foo{}

son.classMethod() // hello

//! 静态方法也是可以从super对象上调用的。

class Foo {
  static classMethod() {
    console.log('hello')
  }
}

class son extends Foo {
  static classMethod() {
    return super.classMethod()
  }
}

son.classMethod() // hello

// Class 的静态属性和实例属性
/* 
静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。

class Foo {
}

Foo.prop = 1;
Foo.prop // 1
上面的写法为 Foo类定义了一个静态属性 prop。

// !目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}

Foo.prop // undefined
目前有一个静态属性的提案，对实例属性和静态属性都规定了新的写法。
*/

// !实例属性

class P {
   myP = 0

  constructor() {
    console.log(this.myP)
  }
}

//! 静态属性

class P {
  static myP = 0

 constructor() {
   console.log(this.myP)
 }
}

// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}