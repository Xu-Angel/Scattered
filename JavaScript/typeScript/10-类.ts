// ! 类的概念 https://ts.xcatliu.com/advanced/class.html

// ! 存取器  getter 和 setter 可以改变属性的赋值和读取行为：

class Ani {
  // t:any
  constructor(name: string, t: any) {
    this.name = name
    this.t = t // 可以直接声明t  或者用getset 来声明
  }
  get name() { // 对name 属性进行复制和读取设置
    return 'J'
  }
  set name(v) {
    console.log('s' + v);
  }
}
let aa = new Ani('K', 's')
aa.name = 'T'
console.log(aa.name);

// ! 静态方法 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

class A {
  static isA(a) {
    return a instanceof A
  }
}
let a = new A()
A.isA(a)
a.isA(a) // 报错，被实例化调用了

// TODO: es7 -> 实例属性，静态属性


// ! TS 中类的用法

// ! public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// ! private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// ! protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

class Animal {
  private name;
  public constructor(name) {
      this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
      super(name);
      console.log(this.name);
  }
}
// 如果是用 protected 修饰，则允许在子类中访问：
class Anima {
  protected name;
  public constructor(name) {
      this.name = name;
  }
}

class Ca extends Anima {
  constructor(name) {
      super(name);
      console.log(this.name);
  }
}


// ! 抽象类 abstract 用于定义抽象类和其中的抽象方法

abstract class Animm {  
  public name
  public constructor(name) {
    this.name = name
  }
  public abstract sayHi() 
}
let mm = new Animm('xx') // ! 抽象类是不允许被实例化

class mms extends Animm { // ! 报错  子类没有实现父类的抽象方法
  public eat() {
    // 
  }
}

// ! 类的类型

let aaa: Animal = new Animal('Jack');
console.log(aaa); //