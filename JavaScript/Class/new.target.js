//todo new是从构造函数生成实例对象的命令。
//ES6 为 new命令引入了一个 new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。
//如果构造函数不是通过new命令调用的，new.target会返回 undefined，因此这个属性可以用来确定构造函数是怎么调用的。*/

function Person(name) {
  if (new.target !== undefined) {
    // do
    this.name = name
  } else {
    throw new Error('必须使用 new 命令生成实例')
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
try {
  const perins = Person()
} catch (error) {
  console.log('hi', error)
}
// 上面代码确保构造函数只能通过new命令调用。

// Class 内部调用new.target，返回当前 Class。

class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true

//! 子类继承父类时，new.target会返回子类。
class Rectangle {
  constructor(length, width) {
    console.log(new.target, new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}
class Square extends Rectangle {
  constructor(length) {
    super(length,length)
  }
}

var obj = new Square(3) // [Function: Square] false

// !利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

class Shape {
  constructor() {
    if (new.target === Shape) throw new Error('Shape类不能被实例化，只能用于继承')
    console.log('hi son');
  }
}

class Rectangle extends Shape{
}
const R = new Rectangle() // hi son
const S = new Shape() // Error: Shape 类需要子类继承才可实例化