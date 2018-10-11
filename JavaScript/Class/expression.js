// 使用表达式来表示类 
// !需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。
const MyClass = class Me {
  constructor(name) {
    this.name = name
  }
  getClassName() {
    console.log(this.name)
  }
}
const me = new MyClass('angel')
me.getClassName()

// !利用表达式写出立即执行的 Class ;person是一个立即执行的类的实例。

let person = new class {
  constructor(name) {
    this.name = name
  }
  sayName() {
    console.log(this.name)
  }
}('angel')

person.sayName()