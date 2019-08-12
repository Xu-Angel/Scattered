# x

React 实现了一套独立于浏览器的 DOM 系统，兼顾了性能和跨浏览器的兼容性。我们借此机会完善了浏览器 DOM 实现的一些特殊情况。

## 小驼峰

在 React 中，所有的 DOM 特性和属性（包括事件处理）都应该是小驼峰命名的方式。例如，与 HTML 中的 tabindex 属性对应的 React 的属性是 tabIndex。**例外的情况是 aria-* 以及 data-* 属性，一律使用小写字母命名。比如, 你依然可以用 aria-label 作为 aria-label。**

## 属性差异

**你也可以使用自定义属性，但要注意属性名全都为小写**

checked

**defaultChecked ->受控组件的属性**

className

dangerouslySetInnerHTML

htmlFor

onChange

selected

suppressContentEditableWarning

suppressHydrationWarning

value

**defaultValue ->非受控组件的属性**

style :

style 接受一个采用小驼峰命名属性的 JavaScript 对象，而不是 CSS 字符串。这与 DOM 中 style 的 JavaScript 属性是一致的，同时会更高效的，且能预防跨站脚本（XSS）的安全漏洞。例如：

```jsx
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

注意：样式不会自动补齐前缀。如需支持旧版浏览器，请手动补充对应的样式属性：

```jsx
const divStyle = {
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};

function ComponentWithTransition() {
  return <div style={divStyle}>This should work cross-browser</div>;
}
```

Style 中的 key 采用小驼峰命名是为了与 JS 访问 DOM 节点的属性保持一致（例如：node.style.backgroundImage ）。浏览器引擎前缀都应以大写字母开头，除了 ms。因此，WebkitTransition 首字母为 ”W”。

**React 会自动添加 ”px” 后缀到内联样式为数字的属性后。如需使用 ”px” 以外的单位，请将此值设为数字与所需单位组成的字符串**。例如：

```jsx
// Result style: '10px'
<div style={{ height: 10 }}>
  Hello World!
</div>

// Result style: '10%'
<div style={{ height: '10%' }}>
  Hello World!
</div>
```

但并非所有样式属性都转换为像素字符串。有些样式属性是没有单位的(例如 zoom，order，flex)

```html
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

同样，所有的 SVG 属性也完全得到了支持
