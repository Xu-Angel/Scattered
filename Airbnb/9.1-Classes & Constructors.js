/* FIXME:Classes & Constructors */
/* 
TODO:用Class的方式声明  而不是用prototype上弄 */
/* 
//*旧方法
function Queue(contents = []) {
  this.queue = [...contents]
}
Queue.prototype.pop = function () {
  const value = this.queue[0]
  this.queue.splice(0,1)
  return value
}
//*好方法
Class Queue {
  constructor(contents = []) {
    this.queue = [...contents]
  }
  pop(){
    const value = this.queue[0]
    this.queue.splice(0,1)
    return value
  }
}
*/
/* 
TODO: 使用extends 来继承 */
/* 
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
};
//good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
 */

/* 
It’s okay to write a custom toString() method, just make sure it works successfully and causes no side effects.
class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }
  getName() {
    return this.name;
  }
  toString() {
    return `Jedi - ${this.getName()}`;
  }
}let num = 8888
TODO:toString方法 可以用字符串模板
console.log({...[`${num}`]}); 
*/
/*
 TODO:类继承中 构造器 的继承 */
/* 
// bad
class Jedi {
  constructor() {}
  getName() {
    return this.name;
  }
}
// bad
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
  }
}
// good
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
    this.name = 'Rey';
  }
} */
