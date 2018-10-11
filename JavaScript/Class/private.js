// 私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。

class Widget {
  //public
  foo(baz) {
    this._bar(baz)
  }
  //private
  _bar(baz) {
    return this.snaf = baz
  }
  //...others
}
//上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法,。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。因为模块内部的所有方法都是对外可见

// !方法一  讲私有方法移除模块， 再call回来 foo是公有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。

class Widget {
  foo(baz) {
    bar.call(this, baz)
  }
  //...
}
function bar(baz) {
  return this.snaf = baz
}

//!利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

const bar = Symbol('bar')
const snaf = Symbol('snaf')

class Widget {

  // public
  foo(baz) {
    // private
    this[bar](baz)
  }

  // private
  [bar](baz) {
    return this[snaf] = baz
  }
  // true public
  hello() {
    this.hello = 'hello'
  }
}
// bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。
// Object.getOwnPropertyNames(Point.prototype)
console.log(Object.getOwnPropertyNames(Widget.prototype)); //[ 'constructor', 'foo', 'hello' ]

// 新提议 #