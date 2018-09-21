## 目录

1. [操作DOM](#操作DOM)
1. [操作宽高](#操作宽高)
1. [操作混合节点](#操作混合节点)
1. [请求](#请求)
1. [基本工具类](#基本工具类)
1. [包含](#包含)
1. [解析](#解析)
1. [动画](#动画)

## 操作DOM
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
  // Native - IE9+
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
  - `Form` 表单下获取 `e.currentTarget` 在 `.radio` 中的数组索引
  ```javascript
  // jQuery
$('.radio').index(e.currentTarget);

// Native
Array.prototype.indexOf.call(document.querySelectorAll('.radio'), e.currentTarget);
  ```
  - `jQuery` 对象的 `iframe contents()` 返回的是 `iframe` 内的 `document`
  ```javascript
  // jQuery
$iframe.contents();

// Native
iframe.contentDocument;
  ```
  - 获取 `data-` 属性
```javascript
// jQuery
$el.data('foo');

// Native (use `getAttribute`)
el.getAttribute('data-foo');

// Native (use `dataset` if only need to support IE 11+)
el.dataset['foo'];
```
## CSS&Style
- `Get style`
```javascript
// jQuery
$el.css("color");
// Native
// 注意：此处为了解决当 style 值为 auto 时，返回 auto 的问题
const win = el.ownerDocument.defaultView;
// null 的意思是不返回伪类元素
win.getComputedStyle(el, null).color;
```
- `Add class`
```javascript
// jQuery
$el.addClass(className);

// Native
el.classList.add(className);

// ie8+
if (el.classList)
  el.classList.add(className);
else
  el.className += ' ' + className;
```
 - `Remove Class`
 ```javascript
 // jQuery
$el.removeClass(className);

// Native
el.classList.remove(className);
 ```
 - `Has Class`
 ```javascript
 // jQuery
$el.hasClass(className);

// Native
el.classList.contains(className);

// IE8+
if (el.classList)
  el.classList.contains(className);
else
  new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
 ```
 - `Toggle Class`
 ```javascript
 // jQuery
$el.toggleClass(className);

// Native
el.classList.toggle(className);

// IE9+
if (el.classList) {
  el.classList.toggle(className);
} else {
  var classes = el.className.split(' ');
  var existingIndex = classes.indexOf(className);

  if (existingIndex >= 0)
    classes.splice(existingIndex, 1);
  else
    classes.push(className);

  el.className = classes.join(' ');
}
```
**[⬆ 回到顶部](#目录)**

## 操作宽高
 - `Window height`
 ```javascript
 // window height
$(window).height();

// 含 scrollbar
window.document.documentElement.clientHeight;

// 不含 scrollbar，与 jQuery 行为一致
window.innerHeight;
 ```
 - `Document height`
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

 // jQuery
$(el).offset();

// ie8+
var rect = el.getBoundingClientRect();

{
  top: rect.top + document.body.scrollTop,
  left: rect.left + document.body.scrollLeft
}
 ```
 - `Element height`
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

   - `Position` 获得匹配元素相对父元素的偏移
   ```javascript
   // jQuery
    $el.position();

    // Native
    { left: el.offsetLeft, top: el.offsetTop }
   ```
    - `Offset` 获得匹配元素相对文档的偏移
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
 - `Scroll Top` 获取元素滚动条垂直位置
 ```javascript
 // jQuery
$(window).scrollTop();

// Native
(document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
 ```
 - `Outer Height`
 ```javascript
 // jQuery
 $(el).outerHeight();
 // IE8+
 el.offsetHeight
 ```
 - `Outer Height With Margin`
 ```javascript
 // jQuery
 $(el).outerHeight(true);

 /// IE9+
 function outerHeight(el) {
  var height = el.offsetHeight;
  var style = getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

outerHeight(el);
 ```
**[⬆ 回到顶部](#目录)**

## 操作混合节点
 - `Text`
     - `Get Text` 返回指定元素及其后代的文本内容。
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
 - `Append` 插入到子节点的末尾
```javascript
// jQuery
$el.append("<div id='container'>hello</div>");

// Native (HTML string)
el.insertAdjacentHTML('beforeend', '<div id="container">Hello World</div>');

// Native (Element)
el.appendChild(newEl);
```
 - `Prepend`
 ```javascript
 // jQuery
$el.prepend("<div id='container'>hello</div>");

// Native (HTML string)
el.insertAdjacentHTML('afterbegin', '<div id="container">Hello World</div>');

// Native (Element)
el.insertBefore(newEl, el.firstChild);
 ```
 - `insertBefore` 在选中元素前插入新节点
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
  - `insertAfter` 在选中元素后插入新节点
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
- `is` 如果匹配给定的选择器，返回`true`
```javascript
// jQuery
$el.is(selector);
$(el).is('.my-class');

// Native
el.matches(selector);

// IE9+
var matches = function(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};

matches(el, '.my-class');
```
- ` wrap` 把每个被选元素放置在指定的HTML结构中。
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
- `unwrap`  移除被选元素的父元素的DOM结构
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
- `replaceWith` 用指定的元素替换被选的元素
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
- `simple parse` 解析 HTML/SVG/XML 字符串
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
**[⬆ 回到顶部](#目录)**

## 请求
 `Fetch API` 是用于替换 `XMLHttpRequest` 处理 `ajax` 的新标准，`Chrome` 和 `Firefox` 均支持，旧浏览器可以使用 `polyfills` 提供支持。

IE9+ 请使用 `github/fetch`，IE8+ 请使用 `fetch-ie8`，JSONP 请使用 `fetch-jsonp`。
- 从服务器读取数据并替换匹配元素的内容。
```javascript
// jQuery
$(selector).load(url, completeCallback)

// Native
fetch(url).then(data => data.text()).then(data => {
  document.querySelector(selector).innerHTML = data
}).then(completeCallback)
```
**[⬆ 回到顶部](#目录)**

## 基本工具类
- `isArray` 检测参数是不是数组。
```javascript
// jQuery
$.isArray(range);

// Native
Array.isArray(range);
isWindow
检测参数是不是 window。

// jQuery
$.isWindow(obj);

// Native
function isWindow(obj) {
  return obj !== null && obj !== undefined && obj === obj.window;
}
```
- `inArray`在数组中搜索指定值并返回索引(找不到则返回-1)
```javascript
// jQuery
$.inArray(item, array);

// Native
array.indexOf(item) > -1;

// ES6-way
array.includes(item);
```
- `isNumeric`检测传入的参数是不是数字。 `Use typeof to decide the type or the type example for better accuracy.`
```javascript
// jQuery
$.isNumeric(item);

// Native
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
```
- `isFunction` 检测传入的参数是不是 JavaScript 函数对象。
```javascript
// jQuery
$.isFunction(item);

// Native
function isFunction(item) {
  if (typeof item === 'function') {
    return true;
  }
  var type = Object.prototype.toString(item);
  return type === '[object Function]' || type === '[object GeneratorFunction]';
}
```

- `isEmptyObject` 检测对象是否为空 (包括不可枚举属性).
```javascript
// jQuery
$.isEmptyObject(obj);

// Native
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}
```
- `isPlainObject`检测是不是扁平对象 (使用 “{}” 或 “new Object” 创建).
```javascript
// jQuery
$.isPlainObject(obj);

// Native
function isPlainObject(obj) {
  if (typeof (obj) !== 'object' || obj.nodeType || obj !== null && obj !== undefined && obj === obj.window) {
    return false;
  }

  if (obj.constructor &&
      !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false;
  }

  return true;
}
```
- `extend` 合并多个对象的内容到第一个对象。 `object.assign` 是 ES6 API，也可以使用 polyfill。
```javascript
// jQuery
$.extend({}, defaultOpts, opts);

// Native
Object.assign({}, defaultOpts, opts);
```
- `trim` 移除字符串头尾空白。
```javascript
// jQuery
$.trim(string);

// Native
string.trim();
```
- `map` 将数组或对象转化为包含新内容的数组。
```javascript
// jQuery
$.map(array, (value, index) => {
});

// Native
array.map((value, index) => {
});
```
- `each` 轮询函数，可用于平滑的轮询对象和数组。
```javascript
// jQuery
$.each(array, (index, value) => {
});

// Native
array.forEach((value, index) => {
});

// IE9+ nodelist 节点操作
var elements = document.querySelectorAll(selector);
Array.prototype.forEach.call(elements, function(el, i){

});
```
- `grep` 找到数组中符合过滤函数的元素。
```javascript
// jQuery
$.grep(array, (value, index) => {
});

// Native
array.filter((value, index) => {
});

// ie9+
Array.prototype.filter.call(document.querySelectorAll(selector), filterFn);
```
- `type` 检测对象的 JavaScript [Class] 内部类型。
```javascript
// jQuery
$.type(obj);

// Native
function type(item) {
  const reTypeOf = /(?:^\[object\s(.*?)\]$)/;
  return Object.prototype.toString.call(item)
    .replace(reTypeOf, '$1')
    .toLowerCase();
}
```
- `merge` 合并第二个数组内容到第一个数组。
```javascript
// jQuery
$.merge(array1, array2);

// Native
// 使用 concat，不能去除重复值
function merge(...args) {
  return [].concat(...args)
}

// ES6，同样不能去除重复值
array1 = [...array1, ...array2]

// 使用 Set，可以去除重复值
function merge(...args) {
  return Array.from(new Set([].concat(...args)))
}
```
- `now` 返回当前时间的数字呈现。
```javascript
// jQuery
$.now();

// Native
Date.now();
```
- `proxy` 传入函数并返回一个新函数，该函数绑定指定上下文。
```javascript
// jQuery
$.proxy(fn, context);

// Native
fn.bind(context);
```
- `makeArray` 类数组对象转化为真正的 `JavaScript` 数组。
```javascript
// jQuery
$.makeArray(arrayLike);

// Native
Array.prototype.slice.call(arrayLike);

// ES6-way
Array.from(arrayLike);
```
**[⬆ 回到顶部](#目录)**

## 包含

- 检测 `DOM` 元素是不是其他 `DOM` 元素的后代.
```javascript
// jQuery
$.contains(el, child);

// Native
el !== child && el.contains(child);
```
- 全局执行 `JavaScript` 代码。
```javascript
// jQuery
$.globaleval(code);

// Native
function Globaleval(code) {
  const script = document.createElement('script');
  script.text = code;

  document.head.appendChild(script).parentNode.removeChild(script);
}

// Use eval, but context of eval is current, context of $.Globaleval is global.
eval(code);
```
**[⬆ 回到顶部](#目录)**

## 解析

- `parseHTML` 解析字符串为 `DOM` 节点数组.
```javascript
// jQuery
$.parseHTML(htmlString);

// Native
function parseHTML(string) {
  const context = document.implementation.createHTMLDocument();

  // Set the base href for the created document so any parsed elements with URLs
  // are based on the document's URL
  const base = context.createElement('base');
  base.href = document.location.href;
  context.head.appendChild(base);

  context.body.innerHTML = string;
  return context.body.children;
}
```
- `parseJSON` 传入格式正确的 `JSON` 字符串并返回 JavaScript 值
```javascript
// jQuery
$.parseJSON(str);

// Native
JSON.parse(str);
```
**[⬆ 回到顶部](#目录)**

## 动画
- `Toggle` 显示或隐藏元素。
```javascript
// jQuery
$el.toggle();

// Native
if (el.ownerDocument.defaultView.getComputedStyle(el, null).display === 'none') {
  el.style.display = ''|'inline'|'inline-block'|'inline-table'|'block';
} else {
  el.style.display = 'none';
}
```
- `FadeIn` & `FadeOut`
```javascript
// jQuery
$el.fadeIn(3000);
$el.fadeOut(3000);

// Native
el.style.transition = 'opacity 3s';
// fadeIn
el.style.opacity = '1';
// fadeOut
el.style.opacity = '0';

// IE9+
function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
}

fadeIn(el);
```
- `FadeTo` 调整元素透明度。
```javascript
// jQuery
$el.fadeTo('slow',0.15);
// Native
el.style.transition = 'opacity 3s'; // 假设 'slow' 等于 3 秒
el.style.opacity = '0.15';
```
-  `FadeToggle` 动画调整透明度用来显示或隐藏
```javascript
// jQuery
$el.fadeToggle();

// Native
el.style.transition = 'opacity 3s';
const { opacity } = el.ownerDocument.defaultView.getComputedStyle(el, null);
if (opacity === '1') {
  el.style.opacity = '0';
} else {
  el.style.opacity = '1';
}
```
- `SlideUp` & `SlideDown`
```javascript
// jQuery
$el.slideUp();
$el.slideDown();

// Native
const originHeight = '100px';
el.style.transition = 'height 3s';
// slideUp
el.style.height = '0px';
// slideDown
el.style.height = originHeight;
```
- `SlideToggle` 滑动切换显示或隐藏
```javascript
// jQuery
$el.slideToggle();

// Native
const originHeight = '100px';
el.style.transition = 'height 3s';
const { height } = el.ownerDocument.defaultView.getComputedStyle(el, null);
if (parseInt(height, 10) === 0) {
  el.style.height = originHeight;
}
else {
 el.style.height = '0px';
}
```
- `Animate` 执行一系列 CSS 属性动画。
```javascript
// jQuery
$el.animate({ params }, speed);

// Native
el.style.transition = 'all ' + speed;
Object.keys(params).forEach((key) =>
  el.style[key] = params[key];
)
```
**[⬆ 回到顶部](#目录)**
