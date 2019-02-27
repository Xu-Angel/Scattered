
>https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox
>http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
- 理解主轴、交叉轴
  ```js
  // flexbox 的特性是沿着主轴或者交叉轴对齐之中的元素。
      flex-direction: row <-a-b-c->

      flex-direction: column
      ↑
      a
      |
      b
      |
      c
      ↓
  ```

- 起始线和终止线

  在这两种情况下，交叉轴的起始线是flex容器的顶部，终止线是底部，因为两种语言都是水平书写模式。
  ```js
  // 英文 start---end
  -------------
  |a b c       |
  -------------
  // 阿拉伯 end---start
  -------------
  |     c  b a |
  -------------
  ```

- flex容器初始值

  容器中的直系子元素就会变为 flex 元素。所有CSS属性都会有一个初始值，所以 flex 容器中的所有 flex 元素都会有下列行为：

    - 元素排列为一行 (flex-direction 属性的初始值是 row)。
    - 元素从主轴的起始线开始。
    - 元素不会在主维度方向拉伸，但是可以缩小。
    - 元素被拉伸来填充交叉轴大小。
    - flex-basis 属性为 auto。
    - flex-wrap 属性为 nowrap。
    
  这会让你的元素呈线形排列，并且把自己的大小作为主轴上的大小。如果有太多元素超出容器，它们会溢出而不会换行。如果一些元素比其他元素高，那么元素会沿交叉轴被拉伸来填满它的大小。

- 一维模型——多行Flex容器

    flexbox是一维模型，但可以使我们的flex项目应用到多行中
    为了实现多行效果，请为属性flex-wrap添加一个属性值wrap。 项目太大而无法全部显示在一行中，则会换行显示，若将其设置为nowrap，这也是初始值，它们将会缩小以适应容器，因为它们使用的是允许缩小的初始Flexbox值。 如果项目的子元素无法缩小，使用nowrap会导致溢出，或者缩小程度还不够小

- 空白布局（available space）

  假设500px 容器中存放3个100px的元素，默认行为是剩余200px紧跟在后面
  ```js
  ------
  abc200
  ------
  ```
  
  如何控制空白

  - 控制基准值-flex-basis

     flex-basis 定义了该元素的布局空白（available space）的基准值。 该属性的默认值是 auto 。此时，浏览器会检测这个元素是否具有确定的尺寸。 在上面的例子中, 所有元素都设定了宽度（width）为100px，所以 flex-basis 的值为100px。

  - 分配布局空白-flex-grow

    flex-grow 属性可以按比例分配空间(grow 生长，让元素生长)。如果第一个元素 flex-grow 值为2， 其他元素值为1，则第一个元素将占有2/4（上例中，即为 200px 中的 100px）, 另外两个元素各占有1/4（各50px）。

    如果我们给上例中的所有元素设定 flex-grow 值为1， 容器中的布局空白会被这些元素平分。它们会延展以填满容器主轴方向上的空间。

    flex-grow 若被赋值为一个正整数， flex 元素会以 flex-basis 为基础，沿主轴方向增长尺寸。这会使该元素延展，并占据此方向轴上的布局空白（available space）。如果有其他元素也被允许延展，那么他们会各自占据布局空白的一部分。

   - 控制元素在容器内收缩-flex-shrink
   
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax">算法原理</a>

      flex-grow属性是处理flex元素在主轴上增加空间的问题，相反flex-shrink属性是处理flex元素收缩的问题。如果我们的容器中没有足够排列flex元素的空间，那么可以把flex元素flex-shrink属性设置为正整数来缩小它所占空间到flex-basis以下。与flex-grow属性一样，可以赋予不同的值来控制flex元素收缩的程度 —— 给flex-shrink属性赋予更大的数值可以比赋予小数值的同级元素收缩程度更大。

      在计算flex元素收缩的大小时，它的最小尺寸也会被考虑进去，就是说实际上flex-shrink属性可能会和flex-grow属性表现的不一致。因此，我们可以在文章《控制Flex子元素在主轴上的比例》中更详细地看一下这个算法的原理。

      **给 flex-grow 和 flex-shrink 赋值要注意比例。如果我们给所有flex元素的flex属性赋值为 1 1 200px ，并且希望其中一个元素可以增加到2倍，我们可以给该元素的flex属性赋值为2 1 200px。然而，你也可以选择赋值为flex: 10 1 200px 和 flex: 20 1 200px 。**

- 简写
  ```css
  flex-direction,flex-wrap === flex-wrap
  flex-grow,flex-shrink,flex-basis === flex
  ```

