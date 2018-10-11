// 其实有点像叠加的意味
// mixins.js
//todo通过修饰器mixins， 把Foo对象的方法添加到了MyClass的实例上面。
export function mixins(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list)
  }
}

// main.js
import {
  mixins
} from './mixins'

const Foo = {
  foo() {
    console.log('foo')
  }
}

@mixins(Foo)
class MyClass {}

let obj = new MyClass()
obj.foo() // 'foo'
//!等价于
const Foo = {
  foo() {
    console.log('foo')
  }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'

