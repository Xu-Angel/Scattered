/* 
constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
*/
class Point {}
// ===
class Point {
  constructor() {}
}
//上面代码中，定义了一个空的类Point，JavaScript 引擎会自动为它添加一个空的constructor方法。

//!constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

class Point {
  constructor() {
    return Object.create(null)
  }
}

console.log(new Point() instanceof Point)
// !类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
// TypeError: Class constructor Point cannot be invoked without 'new'