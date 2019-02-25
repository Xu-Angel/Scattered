
// push(element(s))：添加一个（或几个）新元素到栈顶。
// pop() ：移除栈顶的元素，同时返回被移除的元素。
// peek() ：返回栈顶的元素，不对栈做任何修改（这个方法不会移除栈顶的元素，仅仅返回它）。
// isEmpty() ：如果栈里没有任何元素就返回 true ，否则返回 false 。
// clear() ：移除栈里的所有元素。
// size() ：返回栈里的元素个数。这个方法和数组的 length 属性很类似。
function Stack() {

  let items: any = []
  
  this.push = function (el: any) {
    items.push(el)
  }

  this.pop = function () {
    return items.pop()
  }

  this.peek = function () {
    return items[items.length - 1]
  }

  this.isEmpty = function (): boolean {
    return items.length === 0
  }

  this.size = function () {
    return items.length
  }

  this.clear = function () {
    items = []
  }

  this.print = function () {
    console.log(items.toString())
  }
}

function PriorityQueue() {
  let items = []
  function QueueEl(el, pri) {
    this.el = el
    this.pri = pri
  }
  this.enqueue = function (el, pri) {
    let queueEl = new QueueEl(el, pri)
    let added = false
    for (let i = 0; i < items.length; i++) {
      if (queueEl.pri < items[i].pri) {
        items.splice(i, 0, queueEl)
        added = true
        break
      }
    }
    if (!added) {
      items.push(queueEl)
    }
  }

  this.print = function () {
    for (let i = 0; i < items.length; i++) {
      console.log(`${items[i].element} - ${items[i].priority}`)
    }
  }
}