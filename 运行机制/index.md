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

### 理解任务队列(消息队列)

题目

  ```js
  function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  await wait();
  await wait();
  await wait();
  console.timeEnd();
}
main();
  ```

  结果，大概30秒多点，30秒是因为每个等待10秒，同步执行。  
  其实还有一个变种：
```js
  function wait() {
    return new Promise(resolve =>
      setTimeout(resolve, 10 * 1000)
    )
  }

  async function main() {
    console.time();
    let a = wait();
    let b = wait();
    let c = wait();
    await a;
    await b;
    await c;
    console.timeEnd();
  }
  main();
```

  这个的运行时间是10s多一点，这是因为：a，b，c的异步请求会按顺序发起。而这个过程是不需要互相依赖等待的。等到wait的时候，其实是比较那个异步耗时最多。就会等待最长。最长的耗时就是整体的耗时。

  如果在业务中，两个异步没有依赖关系。应该是后面这种写法。

-----

#### 解析

一种是同步任务（synchronous），另一种是异步任务（asynchronous）
```js
    // 请问最后的输出结果是什么？
    console.log("A");
    while(true){ }
    console.log("B");
```
如果你的回答是A,恭喜你答对了，因为这是同步任务，程序由上到下执行，遇到while()死循环，下面语句就没办法执行。
```js
    // 请问最后的输出结果是什么？
    console.log("A");
    setTimeout(function(){
    	console.log("B");
    },0);
    while(true){}
```
如果你的答案是A，恭喜你现在对js运行机制已经有个粗浅的认识了！  
题目中的setTimeout()就是个异步任务。在所有同步任务执行完之前，任何的异步任务是不会执行的

```js
// new Promise(xx)相当于同步任务, 会立即执行, .then后面的是微任务
console.log('----------------- start -----------------');
setTimeout(() => {
    console.log('setTimeout');
}, 0)
new Promise((resolve, reject) =>{  // new Promise(xx)相当于同步任务, 会立即执行, .then后面的是微任务
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    resolve();  
}).then(() => {  
    console.log('promise实例成功回调执行');
})
console.log('----------------- end -----------------');

> ----------------- start -----------------
> 0
> 1
> 2
> 3
> 4
> ----------------- end -----------------
> promise实例成功回调执行
> setTimeout
```

new Promise(xx)相当于同步任务, 会立即执行

所以: x,y,z 三个任务是几乎同时开始的, 最后的时间依然是10*1000ms (比这稍微大一点点, 超出部分在1x1000ms之内)
