//! 类中的方法如果含有this，它默认指向类的实例，但是，必须非常小心，一旦单独使用该方法，很可能报错。

class Logger {
  printName(name = 'angel') {
    this.print(`hello ${name}`)
  }
  print(text) {
    console.log(text)
  }
}
const logger = new Logger()
logger.printName() // hello angel
const {printName} = logger
printName() // TypeError: Cannot read property 'print' of undefined
//todo printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。

// !解决办法

// 1.在构造函数中绑定this，

class Logger {
  constructor() {
    this.printName = this.printName.bind(this)
  }
  printName(name = 'angel') {
    this.print(`hello ${name}`)
  }
  print(text) {
    console.log(text)
  }
}
const logger = new Logger()
logger.printName() // hello angel
const {printName} = logger
printName() // hello angel

//! 2.使用箭头函数

class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`hello ${name}`)
    }
  }
  print(text) {
    console.log(text)
  }
}
const logger = new Logger()
logger.printName() // hello angel
const {printName} = logger
printName() // hello angel

//! 3.Proxy 获取方法的时候，自动绑定this。
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());