这个基本上就出现在table-layout为auto的表格中，想必有经验的小伙伴一定见过下面这样一柱擎天的盛况的吧！

表格一柱擎天截图示意

大家空间都不够的时候，文字能断的就断，中文是随便断的，英文单词不能断。于是乎，第一列被无情地每个字都断掉，形成一柱擎天。这种行为称之为“preferred minimum width”或者“minimum content width”。

也就是本文的重点角色之一min-content，换了一个更加规范好听的名字了。实际上，大家也看到了，min-content这种尺寸特性，display:table-cell实际上就有，但是，由于没有明确的名词或概念，大家都不知道，都是稀里糊涂有此表现，究其根本就不清楚了。


CSS代码：
```css
.box {
    width: 70%;
    height: 200px; line-height: 200px;
    padding: 10px; margin: 10px auto;
    background-color: #f0f3f9;
    resize: horizontal;
    overflow: hidden;
}
.fill-available {
    display: inline-block;
    line-height: 20px;
    padding: 20px;
    background-color: #cd0000;
    color: #fff;
    vertical-align: middle;
    
    width: -webkit-fill-available;
    width: -moz-fill-available;
    width: -moz-available;    /* FireFox目前这个生效 */
    width: fill-available;
}
```
HTML代码：

```html
<strong>width: fill-available;</strong>
<div class="box">
    <p class="fill-available">
      width:fill-available可以让元素的宽度表现为默认的block水平元素的尺寸表现。<br>
      但这里实际上是display:inline-block水平的，<br>
      于是，我们可以保证宽度满尺寸自适应的同时使用line-height实现近似的垂直居中效果。
    </p>
</div>
```

<!-- width: min-content -->
CSS代码：
```css
.box {
    background-color: #f0f3f9;
    padding: 10px;
    margin: 10px 0 20px;
    overflow: hidden;
}

.inline-block {
    display: inline-block;
}
.min-content {
    width: -webkit-min-content;
    width: -moz-min-content;
    width: min-content;    
}
```

HTML代码：

```html
<strong>display:inline-block;</strong>
<div class="box inline-block">
    <img src="mm1.jpg">
    <p>display:inline-block具有收缩特性，但这里宽度随文字。而width:min-content随图片。</p>
</div>

<strong>width: min-content;</strong>
<div class="box min-content">
    <img src="mm1.jpg">
    <p>display:inline-block具有收缩特性，但这里宽度随文字。而width:min-content随图片。</p>
</div>
```

<!-- width: max-content -->

CSS代码：
```css
.box {
    background-color: #f0f3f9;
    padding: 10px;
    margin: 10px auto 20px;
    overflow: hidden;
}

.inline-block {
    display: inline-block;
}
.max-content {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;    
}
```

HTML代码：

```html
<strong>display:inline-block;</strong>
<div class="box inline-block">
    <img src="mm1.jpg">
    <p>display:inline-block具有收缩特性，但是，当（例如这里的）描述文字超过一行显示的时候，其会这行，不会让自身的宽度超过父级容器的可用空间的，但是，width:max-content就不是酱样子哦咯！表现得好像设置了white-space:nowrap一样，科科！</p>
</div>

<strong>width: max-content;</strong>
<div class="box max-content">
    <img src="mm1.jpg">
    <p>display:inline-block具有收缩特性，但是，当（例如这里的）描述文字超过一行显示的时候，其会这行，不会让自身的宽度超过父级容器的可用空间的，但是，width:max-content就不是酱样子哦咯！表现得好像设置了white-space:nowrap一样，科科！</p>
</div>

```

<!-- width: fit-content- -->

CSS代码：
```css
.box {
    background-color: #f0f3f9;
    padding: 10px;
    /* 这里左右方向是auto */
    margin: 10px auto 20px;
    overflow: hidden;
}

.inline-block {
    display: inline-block;
}
.fit-content {
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;    
}
```

HTML代码：

```html
<strong>display:inline-block;</strong>
<div class="box inline-block">
    <img src="mm1.jpg">
    <p>display:inline-block居中要靠父元素，而width:fit-content直接margin:auto.</p>
</div>

<strong>width: fit-content;</strong>
<div class="box fit-content">
    <img src="mm1.jpg">
    <p>display:inline-block居中要靠父元素，而width:fit-content直接margin:auto.</p>
</div>
```