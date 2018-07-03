# 摘要：分析DOM事件响应的三个阶段
  事件绑定常用以下三种方法，如‘点击’事件：
- 方法一：
直接在对应的`HTML`元素标签上绑定函数

`` html
<button id='submit' onclick='onClickFn()'>Click Me!</button>
`` 

- 方法二：在`JavaScript`代码里面指定元素的“onclick”方法

``js
var btn = document.getElementById('submit');
btn.onclick = onClickFn;
``

- 方法三：使用事件监听绑定方法

``js
var btn = document.getElementById('submit');
btn.addEventListener('click', onClickFn, false);
``

&emsp;&emsp;**三种方法都可以在`button`被点击的时候调用`onClickFn`函数，但是有所区别。**

第一种方法不推荐，因为违反了`HTML`与J`avaScript`分离的准则；

第二种方法只能给一个事件绑定一个响应函数，重复绑定会覆盖之前的绑定；

第三种方法比较推荐，可以绑定多个不同的函数。

 &emsp;&emsp;当鼠标点击所看到的的按钮时，其实发生了一系列的事件传递，可以想象一下，`button`实际上是被`body`“包裹”起来的，`body`是被`html`“包裹”起来的，`html`是被`document`“包裹”起来的，`document`是被`window`“包裹”起来的。所以，在你的鼠标点下去的时候，最先获得这个点击的是最外面的`window`，然后经过一系列传递才会传到最后的目标`button`，当传到`button`的时候，这个事件又会像水底的泡泡一样慢慢往外层穿出，直到`window`结束。

&emsp;&emsp;综上，一个事件的传递过程包含三个阶段，分别称为：

捕获阶段，目标阶段，冒泡阶段 　　目标指的就是包裹得最深的那个元素。

假设`HTML`有如下元素：

```html
<div id='d'>
    <p id='p'>
    <span id='s'>Click Me!</span>
    </p>
</div>
```

`JavaScript`代码如下：

```js
var div = document.getElementById('d');
var p = document.getElementById('p');
var span = document.getElementById('s');
function onClickFn (event) {
    var tagName = event.currentTarget.tagName;
    var phase = event.eventPhase;
    console.log(tagName, phase);
}
div.addEventListener('click', onClickFn, false);
p.addEventListener('click', onClickFn, false);
```

此时，点击“Click Me!”，即可在控制台看到如下结果：

```js
P 3
DIV 3
```

其中“3”和“冒泡阶段”对应。

可以看出，`p`和`div`都是在冒泡阶段相应了事件，由于冒泡的特性，裹在里层的`p`率先做出响应。

如果把上面代码里面中`addEventListener`的第三个参数设置为`true`，那么运行的结果如下：

```js
DIV 1
P 1
```

由此，`addEventListener`的第三个参数设置为`true`和`false`的区别已经非常清晰了：

`true`表示该元素在事件的“捕获阶段”（由外往内传递时）响应事件；

`false`表示该元素在事件的“冒泡阶段”（由内向外传递时）响应时间。

至此，你可能会有疑问，还有一个“目标阶段”呢？

您不妨给span元素绑定事件，自己测试一下。

在冒泡阶段，如果不希望事件继续往上传播，例如，冒泡的p的时候就停止传播，那么，可以在p的事件回调函数里面这么写：

```js
function onClickFn (event) {
    // code here
    event.stopPropagation();
}
```

这样，冒泡到`p`的时候，就不会再向上传播了，即，`div`不会收到冒泡上来的`click`事件。

如果还想把其它与`p`绑定的响应函数的事件也“屏蔽”掉，需要把`stopPropagation`换为`stopImmediatePropagation`。



【END】