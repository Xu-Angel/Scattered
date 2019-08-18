https://github.com/zhangxinxu/quiz/issues/37

https://www.zhangxinxu.com/study/201801/html-details-summary-example-toggle-more.html

https://jsbin.com/kuzemig/edit?html,css,output

- 视觉还原才是重点。
- details > summary 是最好的实现。可以进一步注意语义化。这个方法IE/Edge是不支持。所以可以用来判断是否是IE内核浏览器，var isIE = !('open' in document.createElement('details'))。所以如果要兼容IE，可以写个polyfill。
- :checked方法交互也可以实现，但语义欠佳，不是这种交互的最佳实践。注意优化选择器。
- :target方法有触发锚点定位的问题，可以使用一个隐藏的空div元素曲线救国。
- :focus-within只要子元素有focus，就能匹配。是目前最先支持的具有“父选择器”特性的伪类。最佳实践是下拉菜单。类似的选择器还有 :target-within。
- /* 元素聚焦，同时聚焦轮廓浏览器认为应该显示。 */- :focus:not(:focus-visible) { outline: 0; }
- 注意不要过度无障碍设置