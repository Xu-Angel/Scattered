# 查找元素&属性获取
 - 兄弟元素
  ```javascript
  // jQuery
  $el.siblings();
  // Native - latest, Edge13+
  [...el.parentNode.children].filter((child) =>
    child !== el
  );
  // Native (alternative) - latest, Edge13+
  Array.from(el.parentNode.children).filter((child) =>
    child !== el
  );
  // Native - IE10+
  Array.prototype.filter.call(el.parentNode.children, (child) =>
    child !== el
  );
  ```
  - 上一个元素
  ```javascript
    // jQuery
    $el.prev();
    // Native
    el.previousElementSibling;
  ```
  - 下一个元素
  ```javascript
    // next
    $el.next();
    // Native
    el.nextElementSibling;
  ```
  - 获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
  ```javascript
  // jQuery
$el.closest(queryString);

// Native - Only latest, NO IE
el.closest(selector);

// Native - IE10+
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    } else {
      el = el.parentElement;
      }
    }
  return null;
}
  ```
  - 获取当前每一个匹配元素集的祖先，不包括匹配元素的本身。
  ```javascript
  // jQuery
$el.parentsUntil(selector, filter);

// Native
function parentsUntil(el, selector, filter) {
  const result = [];
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  // match start from parent
  el = el.parentElement;
  while (el && !matchesSelector.call(el, selector)) {
    if (!filter) {
      result.push(el);
    } else {
      if (matchesSelector.call(el, filter)) {
        result.push(el);
      }
    }
    el = el.parentElement;
  }
  return result;
}
  ```
  - Form 表单下获取 e.currentTarget 在 .radio 中的数组索引
  ```javascript
  // jQuery
$('.radio').index(e.currentTarget);

// Native
Array.prototype.indexOf.call(document.querySelectorAll('.radio'), e.currentTarget);
  ```
  - jQuery 对象的 iframe contents() 返回的是 iframe 内的 document
  ```javascript
  // jQuery
$iframe.contents();

// Native
iframe.contentDocument;
  ```
  - 获取 data- 属性
```javascript
// jQuery
$el.data('foo');

// Native (use `getAttribute`)
el.getAttribute('data-foo');

// Native (use `dataset` if only need to support IE 11+)
el.dataset['foo'];
```
# CSS&Style
- Get style
```javascript
// jQuery
$el.css("color");
// Native
// 注意：此处为了解决当 style 值为 auto 时，返回 auto 的问题
const win = el.ownerDocument.defaultView;
// null 的意思是不返回伪类元素
win.getComputedStyle(el, null).color;
```
- Add class
```javascript
// jQuery
$el.addClass(className);

// Native
el.classList.add(className);
```
 - Remove Class
 ```javascript
 // jQuery
$el.removeClass(className);

// Native
el.classList.remove(className);
 ```
 - Has Class
 ```javascript
 // jQuery
$el.hasClass(className);

// Native
el.classList.contains(className);
 ```
 - Toggle Class
 ```javascript
 // jQuery
$el.toggleClass(className);

// Native
el.classList.toggle(className);
```
# Width && Height
 - Window height
 ```javascript
 // window height
$(window).height();

// 含 scrollbar
window.document.documentElement.clientHeight;

// 不含 scrollbar，与 jQuery 行为一致
window.innerHeight;
 ```
 - Document height
 ```javascript
 // jQuery
$(document).height();

// Native
const body = document.body;
const html = document.documentElement;
const height = Math.max(
  body.offsetHeight;
  body.scrollHeight;
  html.clientHeight;
  html.offsetHeight;
  html.scrollHeight;
)
 ```
 - Element height
 ```javascript
 // jQuery
$el.height();

// Native
function getHeight(el) {
  const styles = this.getComputedStyle(el);
  const height = el.offsetHeight;
  const borderTopWidth = parseFloat(styles.borderTopWidth);
  const borderBottomWidth = parseFloat(styles.borderBottomWidth);
  const paddingTop = parseFloat(styles.paddingTop);
  const paddingBottom = parseFloat(styles.paddingBottom);
  return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
}

// 精确到整数（border-box 时为 height - border 值，content-box 时为 height + padding 值）
el.clientHeight;

// 精确到小数（border-box 时为 height 值，content-box 时为 height + padding + border 值）
el.getBoundingClientRect().height;
 ```
 - Position & Offset

   - Position 获得匹配元素相对父元素的偏移
   ```javascript
   // jQuery
    $el.position();

    // Native
    { left: el.offsetLeft, top: el.offsetTop }
   ```
    - Offset 获得匹配元素相对文档的偏移
    ```javascript
        // jQuery
    $el.offset();

    // Native
    function getOffset (el) {
      const box = el.getBoundingClientRect();

      return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
      }
    }
    ```
 - Scroll Top 获取元素滚动条垂直位置
 ```javascript
 // jQuery
$(window).scrollTop();

// Native
(document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
 ```
# DOM 混合操作
 - Text
     - Get Text 返回指定元素及其后代的文本内容。
      ```javascript
            // jQuery
      $el.text();

      // Native
      el.textContent;
      ```
      - Set text 设置元素的文本内容。
      ```javascript
          // jQuery
    $el.text(string);

    // Native
    el.textContent = string;
      ```
 - Append 插入到子节点的末尾
```javascript
// jQuery
$el.append("<div id='container'>hello</div>");

// Native (HTML string)
el.insertAdjacentHTML('beforeend', '<div id="container">Hello World</div>');

// Native (Element)
el.appendChild(newEl);
```
 - Prepend
 ```javascript
 // jQuery
$el.prepend("<div id='container'>hello</div>");

// Native (HTML string)
el.insertAdjacentHTML('afterbegin', '<div id="container">Hello World</div>');

// Native (Element)
el.insertBefore(newEl, el.firstChild);
 ```
 - insertBefore 在选中元素前插入新节点
 ```javascript
 // jQuery
$newEl.insertBefore(queryString);

// Native (HTML string)
el.insertAdjacentHTML('beforebegin ', '<div id="container">Hello World</div>');

// Native (Element)
const el = document.querySelector(selector);
if (el.parentNode) {
  el.parentNode.insertBefore(newEl, el);
}
 ```
  - insertAfter 在选中元素后插入新节点
  ```javascript
  // jQuery
$newEl.insertAfter(queryString);

// Native (HTML string)
el.insertAdjacentHTML('afterend', '<div id="container">Hello World</div>');

// Native (Element)
const el = document.querySelector(selector);
if (el.parentNode) {
  el.parentNode.insertBefore(newEl, el.nextSibling);
}
  ```
- is 如果匹配给定的选择器，返回true
```javascript
// jQuery
$el.is(selector);

// Native
el.matches(selector);
```
- wrap 把每个被选元素放置在指定的HTML结构中。
```javascript
//jQuery
$(".inner").wrap('<div class="wrapper"></div>');

//Native
Array.prototype.forEach.call(document.querySelector('.inner'), (el) => {
   const wrapper = document.createElement('div');
   wrapper.className = 'wrapper';
   el.parentNode.insertBefore(wrapper, el);
   el.parentNode.removeChild(el);
   wrapper.appendChild(el);
});
```
- unwrap  移除被选元素的父元素的DOM结构
```javascript
// jQuery
$('.inner').unwrap();

// Native
Array.prototype.forEach.call(document.querySelectorAll('.inner'), (el) => {
      let elParentNode = el.parentNode

      if(elParentNode !== document.body) {
          elParentNode.parentNode.insertBefore(el, elParentNode)
          elParentNode.parentNode.removeChild(elParentNode)
      }
});
```
- replaceWith 用指定的元素替换被选的元素
```javascript
//jQuery
$('.inner').replaceWith('<div class="outer"></div>');

//Native
Array.prototype.forEach.call(document.querySelectorAll('.inner'),(el) => {
  const outer = document.createElement("div");
  outer.className = "outer";
  el.parentNode.insertBefore(outer, el);
  el.parentNode.removeChild(el);
});
```
- simple parse 解析 HTML/SVG/XML 字符串
```javascript 
// jQuery
$(`<ol>
  <li>a</li>
  <li>b</li>
</ol>
<ol>
  <li>c</li>
  <li>d</li>
</ol>`);

// Native
range = document.createRange();
parse = range.createContextualFragment.bind(range);

parse(`<ol>
  <li>a</li>
  <li>b</li>
</ol>
<ol>
  <li>c</li>
  <li>d</li>
</ol>`);
```