
/* https://www.jianshu.com/p/56e41f3533de */
/* https://vince.xin/2019/11/29/Decorator-%EF%BC%88%E8%A3%85%E9%A5%B0%E5%99%A8%EF%BC%89%E5%85%A5%E9%97%A8%E4%BB%A5%E5%8F%8A%E5%9C%A8%E5%89%8D%E7%AB%AF%E6%8E%A5%E5%8F%A3%E9%80%BB%E8%BE%91%E5%B1%82%E4%B8%AD%E7%9A%84%E5%AE%9E%E8%B7%B5/ */

/* 
https://github.com/Vincedream/decorator-practice
*/
// 修饰类的行为，对一个类进行处理的函数，修饰器函数，也就是修饰类的方法，属性
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
@testable
class Fo{}
// target   === Fo就是会被修饰的类
//!todo修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。

// eg:

function dec (tar) {
  tar.isChild = true
}

@dec
class child {}
let CHILD = new child()
console.log(CHILD.isChild)


