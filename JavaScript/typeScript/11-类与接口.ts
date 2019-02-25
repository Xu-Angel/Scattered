
/*
实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），
! 用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。
*/
interface Alarm {
  alert()
}

class Door {}
class SecurityDoor extends Door implements Alarm {
  alert() {

    // 
  }
}
class Car implements Alarm {
  alert() {

  }
}

interface Light {
  lighton()
  linghtOff()
}
// ! 一个类可以实现多个接口：
class expensiveCar extends Car implements Light, Alarm {
  lighton() {}
  linghtOff() {}
}
// ! 接口与接口之间可以是继承关系：
interface sonLight extends Light {
  sonMethod()
}

// ! 接口也可以继承类
class Point {
  x: number;
  y: number;
}
interface Point3d extends Point {
  z: number;
}