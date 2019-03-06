> 浏览器到js 详细进程运行机制说明
http://www.dailichun.com/2018/01/21/js_singlethread_eventloop.html

> 从输入URL到页面加载的过程？如何由一道题完善自己的前端知识体系 
http://www.dailichun.com/2018/03/12/whenyouenteraurl.html

>不要混淆nodejs和浏览器中的event loop
https://cnodejs.org/topic/5a9108d78d6e16e56bb80882  
https://github.com/aooy/blog/issues/5


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