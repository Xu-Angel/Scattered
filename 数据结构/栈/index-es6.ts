let StackES6 = (function () {
  const items = new WeakMap()
  let _: any[] = items.get(this)
  class Stack{
    constructor() {
      items.set(this, [])
    }
    push() {
      return _.push()
    }
    pop() {
      return _.pop()
    }
    peek() {
      return _[_.length - 1]
    }
    isEmpty() {
      return _.length === 0
    }
    size() {
      return _.length
    }
    clear() {
      items.set(this, [])
    }
    print() {
      console.log(_.toString())
    }
  }
  return Stack
})()