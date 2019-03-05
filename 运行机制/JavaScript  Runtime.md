# JavaScript  Runtime 执行机制

## 前置知识：

+ **Engine** 执行引擎，Node、Chrome-V8、Safari-JavaScript Core，Firefox-SpiderMonkey，IE-Chakra
+ 实现的是ECMAScript标准 
+ **Runtime** 运行时，各种浏览器、Node
+ **浏览器的内核是多线程**，它们在内核控制下相互配合以保持同步，一个浏览器至少实现三个常驻线程：`JavaScript引擎线程`，`GUI渲染线程`，`浏览器事件触发线程`。 
  1. JavaScript引擎是单线程运行的,浏览器无论在什么时候都只且只有一个线程在运行JavaScript程序。JavaScript引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JavaScript线程在运行JavaScript程序。
  2. GUI渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流(Reflow)时,该线程就会执行。注意，GUI渲染线程与JavaScript引擎是互斥的，当JavaScript引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JavaScript引擎空闲时立即被执行。
  3. 事件触发线程，当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JavaScript引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeout、也可来自浏览器内核的其他线程如鼠标点击、Ajax异步请求等，但由于JavaScript的单线程关系所有这些事件都得排队等待JavaScript引擎处理（当线程中没有执行任何同步代码的前提下才会执行异步代码）。


+ **主线程** - JS引擎中负责解释和执行JavaScript代码的线程只有一个。
+ **事件驱动** - 将一切抽象为事件。IO操作完成是一个事件，用户点击一次鼠标是事件，Ajax完成了是一个事件，一个图片加载完成是一个事件。
+ **Event Loop** - 事件驱动的的实现过程主要靠事件循环完成（Event Loop）。主线程启动后就进入主循环。主循环的过程就是不停的从事件队列里读取事件。如果事件有关联的handle(也就是注册的callback)，就执行handle



## 一、为什么JavaScript是单线程？

JavaScript引擎是单线程运行的,浏览器无论在什么时候都只且只有一个线程在运行JavaScript程序。

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

## 二、同步与异步

操作分为：发出调用和得到结果两步。

同步 - 发出调用，立即得到结果。同步就是调用之后一直等待，直到返回结果。

异步 - 发出调用，但无法立即得到结果，需要额外的操作才能得到预期的结果。异步则是调用之后，不能直接拿到结果，通过一系列的手段才最终拿到结果（调用之后，拿到结果中间的时间可以介入其他任务）。其中就包括event loop、轮询、事件等。event loop是异步的一种实现机制。

为什么需要异步呢？

JavaScript单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。
如果排队是因为计算量大，CPU忙不过来，属于正常现象，但如果CPU是闲着的，因为IO设备很慢、网络等待，不得不等着结果出来，再往下执行。这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。所以这就是异步过程的由来。

常见的异步有 dom事件、定时器、Promise、jQuery  Deferred



## 三、任务队列 task queue

任务队列既不是事件的队列 ，也不是消息的队列。任务队列就是你在主线程上的一切调用。事实上，不是所有的事件都放置在一个队列里。不同的事件，放置在不同的队列。



## 四、Event Loop

macrotasks:

- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame
- I/O
- UI rendering

microtasks:

- process.nextTick
- Promises
- Object.observe
- MutationObserver

一个事件循环(EventLoop)中会有一个正在执行的任务(Task)，而这个任务就是从 macrotask 队列中来的。当这个 macrotask 执行结束后所有可用的 microtask 将会在同一个事件循环中执行，当这些 microtask 执行结束后还能继续添加 microtask 一直到整个 microtask 队列执行结束。通俗点来理解的话,就是microtask会在当前循环中执行完成,而macrotask会在下一个循环中执行。

开始 -> 取task queue第一个task执行 -> 取microtask全部任务依次执行 -> 取task queue下一个任务执行 -> 再次取出microtask全部任务执行 -> ... 循环执行

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop
