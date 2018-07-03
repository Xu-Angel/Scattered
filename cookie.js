const Cookie = {
  set (key, value) {

  }
}



let ret = {}
let old = [
  'hello', 'helo',
  'hi', 'i',
  'test', 'est'
]
old.forEach((key, val) => {
  ret[key] = val
})

console.log(ret)