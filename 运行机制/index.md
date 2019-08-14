>Node.js 11为界限的区别

https://blog.insiderattack.net/new-changes-to-timers-and-microtasks-from-node-v11-0-0-and-above-68d112743eb3

>浏览器和Node 事件循环的区别 

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26

>令人费解的 async/await 执行顺序

https://juejin.im/post/5c3cc981f265da616a47e028

> 从一道题浅说 JavaScript 的事件循环

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7

> 更快的异步函数和 Promise

https://v8.js.cn/blog/fast-async/

> 浏览器到js 详细进程运行机制说明

http://www.dailichun.com/2018/01/21/js_singlethread_eventloop.html

> 从输入URL到页面加载的过程？如何由一道题完善自己的前端知识体系 

http://www.dailichun.com/2018/03/12/whenyouenteraurl.html

>不要混淆nodejs和浏览器中的event loop

https://cnodejs.org/topic/5a9108d78d6e16e56bb80882  

https://github.com/aooy/blog/issues/5

```js
//请写出输出内容
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

```js
const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);


// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```
```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```