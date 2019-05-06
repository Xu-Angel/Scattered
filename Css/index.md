- rec:https://github.com/chokcoco/CSS-Inspiration
- you need css : https://lhammer.cn/

- 色调旋转滤镜 实现按钮多状态响应  
  .btn { filter: hue-rotate(60deg); }
    https://www.zhangxinxu.com/wordpress/2018/11/css-filter-hue-rotate-button/

- CSS -webkit-伪元素选择器不再导致整行无效  https://www.zhangxinxu.com/wordpress/2018/12/css-webkit-%e4%bc%aa%e5%85%83%e7%b4%a0-%e9%80%89%e6%8b%a9%e5%99%a8-%e6%97%a0%e6%95%88/

## 文字两端对齐

css有一个文字两端对齐的属性text-align: justify, 它可以在多行文字(中英数字符号交错)导致一行不能很好的占满时, 实现两端对齐的效果. 但是有个问题是, 在一行没有占满时, 这个属性就不起作用了.
想要让它起效, 需要添加一个行内空标签.

```html
<div>添加一个行内空标签就有效了！<i></i></div>
```

```css
div i{
  display:inline-block;
  /*padding-left: 100%;*/
  width:100%;
}
```

padding-left: 100%和width:100%都可以达到效果,选用其一即可
也可改用after、before伪元素

```css
div::after {
  content: " ";
  display: inline-block;
  width: 100%;
}
```

## inline-block元素设置overflow:hidden属性导致相邻行内元素向下偏移

常用的解决方法是

- [#](https://blog.csdn.net/iefreer/article/details/50421025)

- [##](https://blog.csdn.net/w390058785/article/details/80567583#)