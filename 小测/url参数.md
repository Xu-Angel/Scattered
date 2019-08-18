https://github.com/zhangxinxu/quiz/issues/35

https://github.com/WebReflection/url-search-params

### 查询字符串转对象

### 获取url地址栏？后面的查询内容，包括？

```js
const object1 = {
  userid: 123,
  username: '王二',
  tel: '13208033621'
}
```

encodeURI() 函数假设参数是完整的 URIs ，encodeURIComponent() 函数假设参数是 URI 中单独的一部分
因为这两种假设差异，encodeURI 不会将 URI 保留字符编码，encodeURIComponent 会忽略保留字符，把这些代码当作普通字符编码

```js
let entries = Object.entries(object1)

let kvList = entries.map(kv => {
    let [key, value] = [...kv]
    return `${key}=${encodeURIComponent(value)}`
})

let result = kvList.join('&')

// 一行版本：

Object.entries(object1).map(kv => `${kv[0]}=${encodeURIComponent(kv[1])}`).join('&')
```

当然是 location.search 啦~ 不过也可以用 new URL(location.href).search

```js
var urlSearchParams = new URLSearchParams(urlString)
var urlObj = {}
for (let [key, value] of urlSearchParams.entries()) {
  urlObj[key] = value
}
```

```js
var s = decodeURIComponent(location.search);
var p = {}
s.replace(/([^?=&]+)=([^&]+)/g,($,k,v)=>p[k]=v);
//console.log(p)
//test

var s =  'userid=123&username=王二&tel=13208033621';
var p = {}
s.replace(/([^?=&]+)=([^&]+)/g,($,k,v)=>p[k]=v);
console.log(p)
```

```js
var p = {}
s.replace(/([^?=&]+)=([^&]+)/g,($,k,v)=>p[k]=p[k]?(Array.isArray(p[k])?[...p[k],v]:[p[k],v]):v);
//console.log(p)
//test

var s =  'userid=123&username=王二&tel=13208033621&tel=2222&tel=333';
var p = {}
s.replace(/([^?=&]+)=([^&]+)/g,($,k,v)=>p[k]=p[k]?(Array.isArray(p[k])?[...p[k],v]:[p[k],v]):v);
console.log(p)
```

```js
// 题意是如果只有1个值，还是字符串，多值才是数组
const obj1 = {}
const myParams = new URLSearchParams(location.search)
for (var p of myParams.keys()){
obj[p]=myParams.getAll(p)
};
console.log(obj1)
// zxx: 调整下
const obj1 = {}
const myParams = new URLSearchParams(location.search)
for (var p of myParams.keys()){
obj[p]=myParams.getAll(p).length > 1 ? myParams.getAll(p) : myParams.get(p);
};
```
