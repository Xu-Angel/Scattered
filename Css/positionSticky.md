https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/

```html
position:sticky有个非常重要的特性，那就是sticky元素效果完全受制于父级元素们。

这和position:fixed定位有着根本性的不同，fixed元素直抵页面根元素，其他父元素对其left/top定位无法限制。

根据我简单的测试，发现了sticky元素以下一些特性表现：

父级元素不能有任何overflow:visible以为的overflow设置，否则没有粘滞效果。因为改变了滚动容器（即使没有出现滚动条）。因此，如果你的position:sticky无效，看看是不是某一个祖先元素设置了overflow:hidden，移除之即可。
同一个父容器中的sticky元素，如果定位值相等，则会重叠；如果属于不同父元素，则会鸠占鹊巢，挤开原来的元素，形成依次占位的效果。
sticky定位，不仅可以设置top，基于滚动容器上边缘定位；还可以设置bottom，也就是相对底部粘滞。如果是水平滚动，也可以设置left和right值。
```