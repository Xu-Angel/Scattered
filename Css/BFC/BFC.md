# 关于BFC
## 前言
很久以前就见过这个东西，以为是上古的东西不需要研究，在研究css布局的时候看见了，觉得应该花点时间老弄，一看确实是有很多东西在里面，是需要学习的
## 正文
### 一、什么是BFC
BFC（Block Fomatting Context）块格式化上下文，是css2.1规定的一个渲染区域的机制；而BFC中需要block box参与，及在BFC中符合及渲染和布局机制的必须是block box

    tip: 属于block box的有block table list-item
### 二、产生的条件
产生BFC的条件很多（高亮的为最容易出现和最常用的）
- 根元素（html）或者包含了根元素的元素
- `overflow：hidden`
- `行内块级元素 display: inline-block`
- `position: fixed/abslute (绝对定位)`
- `浮动元素`
- 表格元素 display: table-cell
- 弹性盒 display: flex/inline-flex
### 三、BFC中的特性
- 浮动元素不会重叠到BFC
- 计算BFC高度时，会计算float元素的高度
- BFC中元素的margin会发生塌陷（margin值以两个中最大的为准），大部分都是垂直方向
- BFC中元素会垂直排列
- BFC中的第一个子元素的左外边距会与BFC元素的左边框相接触（后面的从左往右），浮动元素也是如此
- 每个BFC都是独立的容器，内部的元素不会影响到外部，反之亦然
### 四、总结
    由于刚刚看完参考文章，心里对BFC有了大致的理解，所以先写总结
BFC可以说是一些BUG和一些布局技巧了，不用管BFC它的弊端（以为平时都不会去触发），我们应该尽量利用它的长处：
- 利用将float的父元素设置为BFC，使得父元素的高度计算包含float元素；
- 利用float元素不会与是BFC的元素重叠，来防止浮动元素的重叠
- 注意BFC内垂直方向（不一定，一般情况下）的margin collapse(margin重叠)
可以发现BFC是对于页面的float布局，提高了一些实用技巧
## 参考文章
- [学习 BFC (Block Formatting Context)](https://juejin.im/post/59b73d5bf265da064618731d)
- [史上最全面、最透彻的BFC原理剖析](https://github.com/zuopf769/notebook/blob/master/fe/BFC%E5%8E%9F%E7%90%86%E5%89%96%E6%9E%90/README.md)
