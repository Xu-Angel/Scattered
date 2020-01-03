# -

当节点处于DOM树中而且有一个父元素的时候 beforebegin 和 afterend操作才能起作用。

```html
    <!-- beforebegin -->
    <p>
    <!-- afterbegin -->
    foo
    <!-- beforeend -->
    </p>
```

## --

- [insertAdjacentText()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentText)方法将一个给定的文本节点插入在相对于被调用的元素给定的位置。

- [insertAdjacentElement()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentElement) 方法将一个给定的元素节点插入到相对于被调用的元素的给定的一个位置。

- [insertAdjacentHTML()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML)将指定的文本解析为HTML或XML，并将结果节点插入到DOM树中的指定位置。它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接innerHTML操作更快。
  使用insertAdjacentHTML插入用户输入的HTML内容的时候, 需要转义之后才能使用.
  如果只是为了插入文本内容(而不是HTML节点), 不建议使用这个方法, 建议使用node.textContent 或者 node.insertAdjacentText() . 因为这样不需要经过HTML解释器的转换, 性能会好一点.

- [innerText](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/innerText)属性表示一个节点及其后代的“渲染”文本内容.此特性最初由 Internet Explorer 引入。 被所有主要的浏览器供应商（vendor）采用后，它于 2016 年正式进入 HTML 标准。

- [textContent](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent) 属性表示一个节点及其后代的文本内容。

  - 与innerText的区别

    Internet Explorer 引入了 node.innerText。意图类似，但有以下区别：

    textContent 会获取所有元素的内容，包括 `<script>` 和 `<style>` 元素，然而 innerText 不会。

    innerText 受 CSS 样式的影响，并且不会返回隐藏元素的文本，而textContent会。
    由于 innerText 受 CSS 样式的影响，它会触发重排（reflow），但textContent 不会。

    与 textContent 不同的是, 在 Internet Explorer (对于小于等于 IE11 的版本) 中对 innerText 进行修改， 不仅会移除当前元素的子节点，而且还会永久性地破坏所有后代文本节点（所以不可能再次将节点再次插入到任何其他元素或同一元素中）。
