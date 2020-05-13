### HTML5 DOM

1. getElementsByClassName
2. 遍历相关, 如下左侧属性

> 只涉及元素节点的操作(不涉及其它节点), 建议使用左侧的属性替代右侧的属性:

| 属性名 | 被替代的属性 |
| :-: | :-: |
| children | childNodes |
| childElementCount | childNodes.length |
| previousElementSibling | previousSibling |
| nextElementSibling | nextSibling |
| firstElementChild | firstChild |
| lastElementChild | lastChild |

3. ele.scrollIntoView()

调用 ele.scrollIntoView(), ele 元素顶端会移动到可视区域的顶端; 若传入参数 alignToTop: false, 则 ele 移到屏幕底部;

### HTML5 事件

1. contextmenu

<details>
  <summary>contextmenu 使用 demo</summary>

```html
<ul id="myMenu" style="position: absolute;visibility: hidden;background-color: silver">
  <li>111</li>
  <li>222</li>
  <li>333</li>
</ul>
<script>
  var menu = document.getElementById('myMenu')
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    menu.style.left = event.clientX + 'px'
    menu.style.top = event.clientY + 'px'
    menu.style.visibility = 'visible'
  }, false)
  document.addEventListener('click', (event) => {
    menu.style.visibility = 'hidden'
  }, false)
</script>
```
</details>

2. DOMContentLoaded

优于 window.onload 执行

3. readystatechange

可用来判断动态载入的 script、link 标签是否加载完成。demo 如下:

```js
const script = document.createElement('script')
script.addEventListener('readystatechange', function eventListener(event) {
  if (event.readyState === 'loaded' || event.readyState === 'complete') { // hack 的手段, 浏览器自身的问题
    script.removeEventListener('readystatechange', eventListener)
  }
})

script.src = 'example.js'
document.body.appendChild(script)
```

4. hashchange

### HTML5 表单

* input/textarea 里新增 `autoFocus()` 字段
* 表单校验 api

使用 `checkValidate()` 校验 `required`、`pattern="\d+"` 属性

### HTML5 脚本

* 跨文档消息传输(XDM), 核心是 `postMessage`
* 拖放 api

<details>
<summary>拖放 api 使用示例</summary>

```html
<head>
	<style>
		#draggable {
			width: 200px;
			height: 20px;
			text-align: center;
			background: white;
		}

		.dropzone {
			width: 200px;
			height: 20px;
			background: blueviolet;
			margin-bottom: 10px;
			padding: 10px;
		}
	</style>
</head>

<body>
	<div class="dropzone">
		<div id="draggable" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)">
			This div is draggable
		</div>
	</div>
	<div class="dropzone"></div>
	<div class="dropzone"></div>
	<div class="dropzone"></div>
	<script>
		window.onload = function () {
			var dragged

			document.addEventListener("dragstart", function (event) {
				dragged = event.target
			}, false)

			document.addEventListener("dragover", function (event) {
				// prevent default to allow drop
				event.preventDefault()
			}, false)

			document.addEventListener("drop", function (event) {
				// prevent default action (open as link for some elements)
				event.preventDefault()
				if (event.target.className == "dropzone") {
					dragged.parentNode.removeChild(dragged)
					event.target.appendChild(dragged)
				}
			}, false)
		}
	</script>
</body>
```
</details>

* 媒体元素 `<video>`、`<audio>`
* 浏览器状态管理(history)

### HTML5 存储

* `sessionStorage`: 大小上限为 2.5Mb(不同浏览器会有差异), 页面关闭时便清空;
* `localStorage`: 大小上限为 2.5Mb(不同浏览器会有差异), 页面关闭时不会清空;

它们的 api 也是一致的, 有如下几个:

* setItem(key, value)
* getItem(key)
* removeItem(key)
* clear()

> 在 HTML5 范围之外与存储相关的技术还有 cookie(存放在客户端, 可以由客户端也可以由服务端生成, 大小上限为 4 kb)、IndexedDB(大小上限为 5 Mb)、cacheStorage(ServiceWorker)。

### HTML5 JavaScript Api

* `requestAnimationFrame(callback)`: 表示在下次重绘前执行指定的回调函数，下面通过一个简单的 demo 来认识它。

```js
let frame
let n = 5
function callback(timeStamp) {
	console.log(timeStamp) // 开始执行回调的时间戳
	// 如果想要产生循环动画的效果, 需在回调函数中再次调用 requestAnimationFrame()
	while (n > 0) {
		requestAnimationFrame(callback)
		console.log('测试执行顺序')
		n--
	}
}

frame = requestAnimationFrame(callback) // 在下次重绘之前调用回调

// 如果想要销毁该回调, 可以执行 cancelAnimationFrame(frame)
```

执行上述代码, 控制台(chrome)打印如下数据:

```
先输出 5 次 '测试执行顺序'
1795953.649
1795970.318
1795986.987
1796003.656
1796020.325
...
```

可以看到在浏览器上一帧的时间大致为 `16ms`。同时可以看到 `requestAnimation(callback)` 中的 callback 也是异步的(只不过它是基于帧与帧间的异步), 所以上述打印结果是先打印出 5 次 '测试执行顺序' 后再依次打印出 5 个时间戳。requestAnimation 不仅可以用在动画上, 更是被 React 团队用来 hack requestIdleCallback 的实现。

* `Web Worker`

JavaScript 是一门单线程的语言, 借助 Web Worker 能在浏览器上模拟线程的概念。

* `Service Worker`: 基于 Web Worker 的 api 来处理网络请求以及缓存, 可以将其理解为是 `Web Worker + cache storage` 的组合。同时其也是 PWA 依赖的最为重要的技术。