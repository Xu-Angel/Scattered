//! 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）
/* 上面代码中，x 和 y都是实例对象 point自身的属性（因为定义在this变量上），所以hasOwnProperty 方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以 hasOwnProperty方法返回 false。这些都与 ES5 的行为保持一致。

与 ES5 一样，类的所有实例共享一个原型对象。 */
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
   
  }
  toString() {
    console.log(this.x)
  }
}
const point = new Point(2,3)
const point2 = new Point(3, 4)
console.log(point.toString())
console.log(
  point.hasOwnProperty('x'), //t
  point.hasOwnProperty('y'), //t
  point.hasOwnProperty('toString'),  //f
  point.__proto__.hasOwnProperty('toString'), //t
  point.__proto__ === point2.__proto__ //t
)
/* 上面代码中，point 和 point2都是Point的实例，它们的原型都是Point.prototype，所以__proto__属性是相等的。

!这也意味着，可以通过实例的__proto__属性为“类”添加方法。

__proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。 */

//通过__proto__ 给类添加方法

point.__proto__.printName = function () { console.log('__proto__');}

point.printName() // __proto__
point2.printName() // __proto__
const point3 = new Point()
point3.printName() // __proto__

/* 上面代码在 point 的原型上添加了一个 printName方法，由于 point 的原型就是 point2的原型，因此point也可以调用这个方法。而且，此后新建的实例point3也可以调用这个方法。
!这意味着，使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。
 */