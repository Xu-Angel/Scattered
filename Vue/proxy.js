const map = new Map()
const weakmap = new WeakMap()
console.dir(weakmap, '-1')
;(function () {
  const foo = { foo: 1 }
  const bar = { bar: 2 }

  map.set(foo, 1)
  weakmap.set(bar, 2)
  console.dir(weakmap, '0')
})()
console.dir(weakmap, '1')
// 存储副作用函数的桶
const bucket = new Set()

// 原始数据
const data = { text: 'hello world' }
// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 effect 添加到存储副作用函数的桶中
    bucket.add(effect)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal
    // 把副作用函数从桶里取出并执行
    bucket.forEach((fn) => fn())
    // 返回 true 代表设置操作成功
    return true
  },
})

setInterval(() => {
  if (new Date().getTime() === new Date('2023/01/29').getTime()) {
    auto_sign_act()
  } else {
    console.log('未到时间')
  }
}, 500)
