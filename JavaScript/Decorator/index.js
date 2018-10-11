// 修饰类的行为，对一个类进行处理的函数，修饰器函数的，也就是修饰类的方法，属性
//!第一个参数就是要修饰的目标类
// 例如
@decorator
class A {}

// 等价于
A = decorator(A) || A

// 再如
function testable (traget) {
  // do
}

// target 就是会被修饰的类
//!todo修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。

// eg:

function dec (tar) {
  tar.isChild = true
}

@dec
class child {}
let CHILD = new child()
console.log(CHILD.isChild)


