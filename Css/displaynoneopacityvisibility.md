https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/100

结构：
display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承：
display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

性能：
displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大
visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容
opacity: 0 ： 修改元素会造成重绘，性能消耗较少

联系：它们都能让元素不可见

---

*   `display: none;`

1.  **DOM 结构**：浏览器不会渲染 `display` 属性为 `none` 的元素，不占据空间；
2.  **事件监听**：无法进行 DOM 事件监听；
3.  **性能**：动态改变此属性时会引起重排，性能较差；
4.  **继承**：不会被子元素继承，毕竟子类也不会被渲染；
5.  **transition**：`transition` 不支持 `display`。

*   `visibility: hidden;`

1.  **DOM 结构**：元素被隐藏，但是会被渲染不会消失，占据空间；
2.  **事件监听**：无法进行 DOM 事件监听；
3.  **性 能**：动态改变此属性时会引起重绘，性能较高；
4.  **继 承**：会被子元素继承，子元素可以通过设置 `visibility: visible;` 来取消隐藏；
5.  **transition**：`transition` 不支持 `display`。

*   opacity: 0;

1.  **DOM 结构**：透明度为 100%，元素隐藏，占据空间；
2.  **事件监听**：可以进行 DOM 事件监听；
3.  **性 能**：提升为合成层，不会触发重绘，性能较高；
4.  **继 承**：会被子元素继承,且，子元素并不能通过 `opacity: 1` 来取消隐藏；
5.  **transition**：`transition` 不支持 `display`。