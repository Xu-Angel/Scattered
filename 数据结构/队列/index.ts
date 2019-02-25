function Queue() {
  let items = []
  // 新加的在队尾
  this.enqueue = function (el) {
    items.push(el)
  }
  //  出队列
  this.dequeue = function () {
    return items.shift()
  }
  this.front = function () {
    return items[0]
  }
  this.isEmpty = function () {
    return items.length === 0
  }
  this.size = function () {
    return items.length
  }
  this.print = function () {
    console.log(items.toString());
  }
}