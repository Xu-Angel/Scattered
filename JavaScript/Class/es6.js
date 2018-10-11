/* class Point {
  constructor() {
    this.lover = 'angel'
  }

  showLove() {
    console.log(this.lover)
  }

  showTime() {
    console.log(Date())
  }
}
const point = new Point()
point.showLove() */
// === 等价

/* function Point() {
  this.lover = 'angel'
}
Point.prototype.showLove = function() {
  console.log(this.lover)
}
Point.prototype.showTime = function() {
  console.log(Date())
}
const point = new Point()
point.showLove() */

/* 原型指向 */
class B {}
const b = new B()
console.log(b.constructor === B.prototype.constructor, B.prototype.constructor === B )

/* 类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。 用处，通过对象整理 一次性添加多个方法 */
class Point {
  constructor() {
    //...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
})

//todo 类内部定义的方法 是不可枚举的  和ES5的行为不一致/

class Point {
  constructor() {
    //...
  }

  toString() {
    //...
  }
}
console.log(Object.keys(Point.prototype))
console.log(Object.getOwnPropertyNames(Point.prototype))
// []
//[ 'constructor', 'toString' ]
// 和ES5的行为不一致
function Point() {
  //...
}

Point.prototype.toString = function() {
  //...
}
console.log(Object.keys(Point.prototype))
console.log(Object.getOwnPropertyNames(Point.prototype))
//[ 'toString' ]
//[ 'constructor', 'toString' ]

//!类的属性名可以用表达式

const methodName = 'toString'
class Point{
  constructor() {
    //...
  }
  [methodName]() {
    //..
  }
}