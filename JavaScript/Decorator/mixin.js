// 在修饰器的基础上，可以实现Mixin模式。所谓Mixin模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。
// 例子混入方法

const Foo = {
  foo () {
    console.log('foo')
  }
}

class MyClass {}

Object.assign(MyClass.prototype, Foo)

let obj = new MyClass()
obj.foo() // 'foo'

// 装饰器实现：

function mixins (...list) {
  return function (traget) {
    Object.assign(traget.prototype, ...list)
  }
}

const Foo = {
  foo () {
    console.log('foo')
  }
}

@mixins(Foo)
class MyClass {}

// 上述两种实现方式会改变prototype，可通过类继承实现，不改变prototype

class MyClass extends MyBaseClass {
  /* ... */
}

let MyMixin = superClass => class extends superClass {
  foo () {
    console.log('foo rom MyMixin')
  }
}
class MyClass extends MyMixin (MyBaseClass) {
  /* ... */
}

let c = new MyClass()
c.foo()

/* ... */
let Mixin1 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin1');
    if (super.foo) super.foo();
  }
};

let Mixin2 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin2');
    if (super.foo) super.foo();
  }
};

class S {
  foo() {
    console.log('foo from S');
  }
}

class C extends Mixin1(Mixin2(S)) {
  foo() {
    console.log('foo from C');
    super.foo();
  }
}
new C().foo()