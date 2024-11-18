## 背景

看到有人发这个表情包：

![图片](https://user-images.githubusercontent.com/8554143/112715697-d4624b80-8f1c-11eb-9740-f531bdb51e48.gif)

刚好最近在看 SVG，脑海中就把这个表情包的效果和 `feTurbulence` 滤镜关联了起来。

如果我们有一张类似上图表情包的静态图，利用 `feTurbulence` 生成的噪声函数，运用在静态的表情包之上，再添加些许动画，是不是也能制作一张类似的动图效果呢？

## 什么是 SVG `feTurbulence` 滤镜？

SVG 滤镜与 CSS 滤镜类似，是 SVG 中用于创建复杂效果的一种机制。

在自然界中，很多物体，很多材质的纹理都表现为不规则。

例如[飘忽不定的云朵](http://www.baidu.com/s?wd=%E4%BA%91%E6%9C%B5%E5%9B%BE%E7%89%87)，[变幻莫测的水流](http://www.baidu.com/s?wd=%20%E6%B0%B4%E6%B5%81%E5%9B%BE%E7%89%87)，[时隐时现的光线](http://www.baidu.com/s?wd=%E5%8F%98%E5%B9%BB%E8%8E%AB%E6%B5%8B%E5%85%89%E7%BA%BF%E5%9B%BE%E7%89%87)，随机的木质和石质纹理等。

想要使用代码实现上面这些效果是不太容易的，因为通常的图形算法都是规律的，质感都是扁平的。

实际开发，自然质感一般的视觉表现，通常都是使用 PNG 或者 JPG 这类位图进行表现的。

但是，位图体积大，图片一旦确定，里面的效果再去改变就不太容易。例如，有一个云朵 JPG 图片，想要让这个图片中的云朵慢慢变形，移动，就很难实现。

有没有什么办法可以模拟自然界真实事物那样的随机样式效果呢？

feTurbulence 湍流滤镜就有这样的能力， turbulence 是“湍流”的意思，也就是混乱无章的气流。因此 feTurbulence 滤镜也叫作湍流滤镜。 可以用来实现云朵、大理石质感、烟雾、火焰效果等很多很酷的效果。

feTurbulence 滤镜创建的图像效果采用的是 Perlin 湍流函数算法，可以生成 Perlin Noise（Perlin 噪声、柏林噪声）。

Perlin 噪声是 1983 年 Ken Perlin 开发的一种梯度噪声，其原因是当时他对计算机生成图像（CGI）的“机器式”外观感到失望。

Ken Perlin 于 1985 年在一份名为图像合成器的 SIGGRAPH 论文中正式描述了他的发现，并于 1997 年因为创造了这个算法而获得了奥斯卡技术成就奖。

技术成就奖是美国电影艺术与科学院不时颁发的三项科技奖项之一，技术成就奖是一项荣誉奖，每年颁发给那些有特殊技术成就为电影工业进步作出贡献的人。这个奖项是一种证书，它描述了所取得的成就，并列出了那些因特殊贡献而获得荣誉的人的名字。这些奖项通常是在奥斯卡颁奖典礼播出前几周举行的晚宴上颁发的，奥斯卡电视转播中会播放一段简短的节选。

**之所以 Ken Perlin 获得奥斯卡技术成就奖，是因为 Ken Perlin 开发的 Perlin 噪声可以在计算机中让物体的表面产生自然纹理以，于是可以得到非常真实自然的电影视觉效果，平常我们口中说道的电影特效，尤其那些复杂的自然现象的模拟，其背后都离不开 Perlin 噪声。**

换句话说，玩转了 feTurbulence 滤镜，也就获得了在 Web 中模拟自然现象视觉表现的能力，那可就是不可多得的视觉表现领域的人才了。

[feTurbulence](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feTurbulence)滤镜。

[SVG feTurbulence 滤镜 baseFrequency 属性实例](https://www.zhangxinxu.com/study/202007/svg-feturbulence-basefrequency-demo.php)

[SVG feTurbulence 滤镜深入介绍](https://www.zhangxinxu.com/wordpress/2020/10/svg-feturbulence/)

### `feTurbulence` 滤镜

简单看个 DEMO：

```html
<div>Coco</div>
<div class="turbulence">Coco</div>

<svg>
  <filter id="fractal" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence id="turbulence" type="fractalNoise" baseFrequency="0.03" numOctaves="1" />
    <feDisplacementMap in="SourceGraphic" scale="50"></feDisplacementMap>
  </filter>
</svg>
```

```css
.turbulence {
  filter: url(#fractal);
}
```

左边是正常的效果，后边是应用了 `<feTurbulence>` 的效果，你可以试着点进 Demo，更改 `baseFrequency` 和 `numOctaves` 参数的大小，可以看到不同的效果：

[![image](https://user-images.githubusercontent.com/8554143/112003559-f6924d00-8b5b-11eb-8d80-c9309fb3c9a9.png)](https://user-images.githubusercontent.com/8554143/112003559-f6924d00-8b5b-11eb-8d80-c9309fb3c9a9.png)

[CodePen Demo -- feTurbulence text demo](https://codepen.io/xu-angel/pen/abadzGm)

### 将 `feTurbulence` 滤镜应用于图片

我们尝试把上述 DEMO 中的文字转换成图片。让其纹理扭曲化，用一张静态的哭的表情包：

[![image](https://user-images.githubusercontent.com/8554143/112721686-4730ee00-8f40-11eb-92a6-78e6f06a6804.png)](https://user-images.githubusercontent.com/8554143/112721686-4730ee00-8f40-11eb-92a6-78e6f06a6804.png)

简单改造下代码：

```html
<div></div>
<svg>
  <filter id="fractal" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence id="turbulence" type="fractalNoise" baseFrequency="0.09" numOctaves="1"></feTurbulence>
    <feDisplacementMap in="SourceGraphic" scale="15"></feDisplacementMap>
  </filter>
</svg>
```

```css
div {
  background: url(image.jpg);
  filter: url(#fractal);
}
```

效果如下：

[![image](https://user-images.githubusercontent.com/8554143/112721742-a858c180-8f40-11eb-8f51-a4eb0eed5ca5.png)](https://user-images.githubusercontent.com/8554143/112721742-a858c180-8f40-11eb-8f51-a4eb0eed5ca5.png)

有点那个意思了，我们通过 `feTurbulence` 滤镜得到了噪声图形，然后通过 `feDisplacementMap` 滤镜根据 `feTurbulence` 所产生的噪声图形进行形变，扭曲，液化，得到最终的效果。

通过调整 `feTurbulence` 中的 `baseFrequency` 和 `numOctaves` 以及 `feDisplacementMap` 中的 `scale` 参数，我们可以调试得到不同的效果。

接下来，我们再给上述滤镜添加一个动画，利用 SVG 的 `animate` 标签，动态的改变 `baseFrequency` 参数：

```html
<svg>
  <filter id="fractal" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence id="turbulence" type="fractalNoise" baseFrequency="0.1 0.1" numOctaves="1">
      <animate attributeName="baseFrequency" from="0.1 0.1" to="0.08 0.01" dur="3.5s" repeatCount="indefinite" />
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" scale="15"></feDisplacementMap>
  </filter>
</svg>
```

添加了动画之后，同样作用于图片之上，我们就可以得到如下的效果：

[![6](https://user-images.githubusercontent.com/8554143/112725701-8c5f1b00-8f54-11eb-96e7-ad5a5b83b9f3.gif)](https://user-images.githubusercontent.com/8554143/112725701-8c5f1b00-8f54-11eb-96e7-ad5a5b83b9f3.gif) [![6](https://user-images.githubusercontent.com/8554143/112725701-8c5f1b00-8f54-11eb-96e7-ad5a5b83b9f3.gif)](https://user-images.githubusercontent.com/8554143/112725701-8c5f1b00-8f54-11eb-96e7-ad5a5b83b9f3.gif)

[CodePen Demo -- 使用 SVG 滤镜 feTurbulence 让图片动起来](https://codepen.io/xu-angel/pen/KKxVwQL)

## 巧用 `feTurbulence` 滤镜实现各种动效

嘿，`feTurbulence` 当然不是仅能实现这个而已，下面我们再探索一些有意思的场景。

首先，再明确下我们主要使用到的两个滤镜 `feTurbulence` 和 `feDisplacementMap`，它们的核心代码：

```html
<svg>
  <filter id="feDisplacementMap" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="64">
    <feTurbulence type="fractalNoise" baseFrequency="0.0995" numOctaves="1" result="img" />
    <feDisplacementMap id="feDis" in="SourceGraphic" in2="img" scale="600" />
  </filter>
</svg>
```

其中滤镜中的几个参数 \-\- `baseFrequency`、`numOctaves`、`scale` 的改变其实都会得到不一样的效果。我们动态的变化其中的一个或多个也都可以得到不同的动画效果。

### 动态改变 `feDisplacementMap` 的 `scale` 的参数

`feDisplacementMap` 映射置换滤镜，该滤镜用来自图像中从 in2 (en-US)到空间的像素值置换图像从 in 到空间的像素值。简单来说就是是用于改变元素和图形的像素位置的。在这里例子该滤镜通过遍历原图形的所有像素点，通过 `feTurbulence` 滤镜产生的噪声函数将原图像的每个像素点重新映射到一个新的位置，形成一个新的图形。

而 `scale` 表示新得到的图像的扭曲程度，这个值越大，图像越加扭曲不可识别。

通过设置一个非常大初始值，我们可以完全将输入的任何源图像粒子化，看看这个 Demo：

```html
<div></div>
<div class="fractal"></div>

<svg viewBox="0 0 200 200" width="200px" height="200px">
  <defs>
    <filter id="fractal" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
      <feTurbulence type="fractalNoise" baseFrequency="0.995" numOctaves="10" seed="1" stitchTiles="noStitch" result="img" />
      <feDisplacementMap in="SourceGraphic" in2="img" xChannelSelector="R" yChannelSelector="G" scale="600" />
    </filter>
  </defs>
</svg>
```

```css
div {
  width: 200px;
  height: 200px;
  background: url(image.jpeg);
}

.fractal {
  filter: url(#fractal);
}
```

左边为正常的图像，右边为作用了设置了 SVG 滤镜效果的图像，并且设置了 `scale="600"`，完全将图片粒子化了：

[![image](https://user-images.githubusercontent.com/8554143/112752664-abb68080-9006-11eb-9742-be50b7adbe9b.png)](https://user-images.githubusercontent.com/8554143/112752664-abb68080-9006-11eb-9742-be50b7adbe9b.png)

这个时候，让滤镜的 `scale="600"` 动态变化回 `scale="1"`（当此参数为 1 时，图像表示为正常状态），也就能实现一个图形从粒子化到正常化的转变：

```html
<svg viewBox="0 0 200 200" width="200px" height="200px">
  <filter id="fractal" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
    <feTurbulence type="fractalNoise" baseFrequency="0.995" numOctaves="10" seed="1" result="img" />
    <feDisplacementMap in="SourceGraphic" in2="img" xChannelSelector="R" yChannelSelector="G" scale="600">
      <animate attributeName="scale" values="600;0;0" keyTimes="0;0.75;1" begin="0s" dur="2s" repeatCount="indefinite" />
    </feDisplacementMap>
  </filter>
</svg>
```

效果如下：

[![](https://user-images.githubusercontent.com/8554143/112752819-6b0b3700-9007-11eb-9b0d-a90e0e758b75.gif)](https://user-images.githubusercontent.com/8554143/112752819-6b0b3700-9007-11eb-9b0d-a90e0e758b75.gif) [![112752819-6b0b3700-9007-11eb-9b0d-a90e0e758b75.gif](https://user-images.githubusercontent.com/8554143/112752819-6b0b3700-9007-11eb-9b0d-a90e0e758b75.gif)](https://user-images.githubusercontent.com/8554143/112752819-6b0b3700-9007-11eb-9b0d-a90e0e758b75.gif)

[CodePen -- SVG Filter feTurbulence & feDisplacementMap 实现图片粒子化复原动画](https://codepen.io/xu-angel/pen/RwYrNQx)

### 动态改变 `feDisplacementMap` 的 `scale` 的参数实现一些开奖动效

基于上述的效果，我们可以实现这样一类效果，譬如一些开奖结果，一开始它是模糊的，但是用户点击之后，模糊的结果逐渐从模糊到真实。

但是点击事件，由于 `SVG Animate` 标签的一些限制，需要借助一些 `Javascript` 代码，这里借用 `JQuery` 简单做个示意。

我们有一串开奖数组 `745846`，实现点击之后从模糊到真实：

```html
<div id="fe1" class="fe1">745846</div>
<svg>
  <filter id="feDisplacementMap" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="64">
    <feTurbulence type="fractalNoise" baseFrequency="0.0995" numOctaves="1" result="img" />
    <feDisplacementMap id="feDis" in="SourceGraphic" in2="img" scale="200" />
  </filter>
</svg>
```

```js
$('#fe1').click((e) => {
  const filter = $('#feDis')
  const startTime = Date.now()
  const duration = 1000
  const target = 200

  requestAnimationFrame(function aniMove() {
    const t = Math.min(1, (Date.now() - startTime) / duration)
    const nextTarget = target - t * target + 1

    filter.attr('scale', nextTarget)

    if (t < 1.0) {
      requestAnimationFrame(aniMove)
    }
  })
})
```

点击之前的状态如下：

[![image](https://user-images.githubusercontent.com/8554143/112753084-c7bb2180-9008-11eb-8a3a-31eac2c942e0.png)](https://user-images.githubusercontent.com/8554143/112753084-c7bb2180-9008-11eb-8a3a-31eac2c942e0.png)

点击之后：

[![8](https://user-images.githubusercontent.com/8554143/112753133-e8837700-9008-11eb-80d3-4f1287788ba5.gif)](https://user-images.githubusercontent.com/8554143/112753133-e8837700-9008-11eb-80d3-4f1287788ba5.gif) [![8](https://user-images.githubusercontent.com/8554143/112753133-e8837700-9008-11eb-80d3-4f1287788ba5.gif)](https://user-images.githubusercontent.com/8554143/112753133-e8837700-9008-11eb-80d3-4f1287788ba5.gif)

上述效果，你可以套用到任何地方，完整的 Demo 地址：

[CodePen Demo -- SVG Filter Button Effects](https://codepen.io/xu-angel/pen/BaOjyJO)

### 动态改变 `feDisplacementMap` 的 `scale` 的参数实现一些 fadeOut 动画

当然，上述的效果也是可以反着来的，就是一张图（或者任何元素），点击之后粒子化，然后渐变的消失，进阶版的 `fadeOut` 效果。

通过动态的改变滤镜的参数和图片的透明度，当然，也需要借助一些 `JavaScript` 代码，完整的代码就不贴了（与上述 DEMO 非常类似），直接上效果图：

[![Kapture 2021-03-29 at 21 02 03](https://user-images.githubusercontent.com/8554143/112841146-bb9b9680-90d2-11eb-863d-36bc511fec2f.gif)](https://user-images.githubusercontent.com/8554143/112841146-bb9b9680-90d2-11eb-863d-36bc511fec2f.gif) [![Kapture 2021-03-29 at 21 02 03](https://user-images.githubusercontent.com/8554143/112841146-bb9b9680-90d2-11eb-863d-36bc511fec2f.gif)](https://user-images.githubusercontent.com/8554143/112841146-bb9b9680-90d2-11eb-863d-36bc511fec2f.gif)

[CodePen Demo -- 使用 SVG 滤镜实现任意元素粒子化 FadeOut 效果](https://codepen.io/xu-angel/pen/xxaZbLO)

是不是非常类似灭霸把人物消失的效果？之前看过这样一篇文章 \- [谷歌灭霸彩蛋的效果实现](https://zhuanlan.zhihu.com/p/64895648)，其中介绍了一种使用 Canvas 实现类似效果的方式，这里使用 SVG 滤镜达成了近似的效果。

分享一句梵高的名言

> 不要吹灭你的灵感和你的想象力; 不要成为你的模型的奴隶。 ——文森特・梵高
