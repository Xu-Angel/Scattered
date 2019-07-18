class Point {

}
console.log(typeof Point);
console.log(Point === Point.prototype.constructor);
class Bar {
  constructor() {
    this.name = 'Blog';
    this.age = 18;
    ////  return Object.create(null)
  }
  doStuff() {
    console.log('doStuff');
  }
}
const bar = new Bar();
const bar2 = new Bar();
bar.doStuff();
bar.age = 28;
console.log(bar.age);
console.log(bar.constructor === Bar.prototype.constructor);
console.log(Bar.prototype);
Object.assign(Bar.prototype, {
  toString() {},
  toValue() {}
})
console.log(Bar.prototype);
console.log(Object.keys(Bar.prototype))
console.log(new Bar() instanceof Bar);
console.log(bar.hasOwnProperty('name'));
console.log(bar.hasOwnProperty('doStuff'));
console.log(bar.__proto__.hasOwnProperty('doStuff'));
console.log(bar2.__proto__ === bar.__proto__);
console.log(bar.ge);

class Car extends Bar {};
console.log(new Car());