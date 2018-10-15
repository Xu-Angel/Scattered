// 与 ES5 一样，在“类”的内部可以使用get和set关键字，
// !对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

class MyClass {
  constructor() {
    //...
  }
  
  get prop() {
    console.log('hi');
  }

  set prop(value) {
    console.log('setter: ' + value)
  }
}

const inst = new MyClass()
inst.prop = 123
inst.prop

// prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。
// !存值函数和取值函数是设置在属性的 Descriptor 对象上的。

class P {
  constructor(ele) {
    this.ele = ele
  }

  get html() {
    return this.ele
  }

  set html(val) {
    this.ele = val
  }
}

const descriptor = Object.getOwnPropertyDescriptor(P.prototype, 'html')

console.log('get' in descriptor)
console.log('set' in descriptor)
//上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。