# -

>https://github.com/zhangxinxu/quiz/issues/28

- 题意理解要准确：.content不拉伸，不要影响浏览器默认的滚动；
- flex布局是相对大家比较容易想到的实现：.container { display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh;} 但是IE9不支持。
- 另外实现：.container{ display: table; min-height:100vh;}.footer{ display: table-footer-group; /* IE8+支持 */} Seasonley的实现。
- 如果footer高度固定，则实现方法就很多了，例如，绝对定位固定在底部，或者margin负值定位。
- grid布局也是可以实现类似效果：.container {display: grid; min-height: 100vh; align-content: space-between;}
- 满分回答：.container { display: flex; flex-direction: column; min-height: 100vh;
}footer { margin-top: auto;}
- margin:auto是非常体现CSS理解深度的一个CSS声明。
- auto 智能的剩余宽度分配。元素如果没有高宽，尺寸会拉伸（或处在可拉伸上下文中），则此时auto会智能分配剩余空间，实现上下左右或者居中对齐效果。
- flex布局下的所有元素就处于一种可尺寸可拉伸的上下文环境，所有，此时，footer设置margin-top: auto是可以顶部对齐的（margin-top自动剩余空间）。
