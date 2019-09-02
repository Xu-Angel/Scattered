https://github.com/zhangxinxu/quiz/issues/40

- document.querySelector;
- myTextarea.rows = 5;
- window.getComputedStyle(myTextarea).height
- IE下textarea的高度不是行高决定的，而是font-size和font-family。
- DOMNodeInserted(DOM level 3, IE9+)以及MutationObserver(DOM level 4 IE11+)。前者不是异步的，所以如果有大量的DOM变化和事件处理，性能影响会很明显，MutationObserver则是异步的，先观察，然后一次性处理。
document.addEventListener('DOMNodeInserted', function(event) {
if (event.target.nodeName.toLowerCase() === 'textarea') {
//...
}
});

```js
//1.
var textarea = document.querySelector('textarea');
//2.
textarea .rows = 5;
//3.
getComputedStyle( textarea ).height;
//4.
function setHeight( textarea ){
    var styles = getComputedStyle(textarea);
    var lineHeight =  getComputedStyle(textarea).lineHeight;
    if ( lineHeight == 'normal' ){
        lineHeight = styles.fontSize.slice(0,-2)*1.2;//设置行高为1.2
    }else{
        lineHeight = lineHeight.slice(0,-2);
    }
    textarea.style.height = lineHeight * textarea.rows + 'px';
}
setHeight( textarea );
//5
document.addEventListener('DOMNodeInserted', function(ev) {
   var target = event.target;
   if ( target .tagName == 'TEXTAREA' ) {
      setHeight(target);
   }
});
```

另外，DOMNodeInserted是一个不太标准的事件，已从Web标准中删除，将来可用MutationObserver代替。
其次，实现监听元素插入还可以采用css动画，如下

给元素添加一点动画，记住这个动画名字show
```css
textarea{
    opacity: 0;
    animation: show .3s linear forwards;
}
@keyframes show{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
```
然后，添加animationstart回调，判断动画名称即可
```js
document.addEventListener('animationstart',function(ev){
    if(ev.animationName == 'show'){
        //新元素出现了...
        console.log(ev.target);
    }
})
```
兼容性是IE10+


---

```js
    //4  firefox 默认的行高是15.2 chrome 和ie 都是 默认都是 normal值...
    // 以上数据(本人机器实测的. 其他特殊情况或版本未知)
    var textarea_line_height = window.getComputedStyle(textarea)['line-height']
    textarea_line_height = textarea_line_height === 'normal' ? 15.2 : textarea_line_height.slice(0, -2)
    textarea.style.height = (textarea_line_height * textarea.rows) + 'px'
    console.log(textarea_line_height * textarea.rows)

    //5 DOMSubtreeModified, 实际项目还应加上防抖|节流
    // 注意这里不能用箭头函数了... 不兼容ie9 的可以用 MutationObserver() API 
    window.addEventListener('DOMSubtreeModified', function (e) {
      var textareas = document.getElementsByTagName('textarea')
      var textareasLenght = textareas.length
      for (var i = 0; i < textareasLenght; i++) {
        var textarea_line_height = window.getComputedStyle(textareas[i])['line-height']
        textarea_line_height = textarea_line_height === 'normal' ? 15.2 : textarea_line_height.slice(0, -2)
        textareas[i].style.height = (textarea_line_height * textarea[i].rows) + 'px'
        console.log(textarea_line_height * textarea.rows)
      }
    })
```