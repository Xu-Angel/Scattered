https://github.com/zhangxinxu/quiz/issues/36

- document.getElementById('loginForm');  // 方法1：经典的 id 选择器
document.querySelector('#loginForm');  // 方法2：万能的 querySelector
document.forms.loginForm;  // 方法3：表单原生方法，还可以写作：document.forms['loginForm']
- loginForm;   // 方法4：标签的 id 可以直接当变量来用
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  // 其他操作...
});
- new FormData(loginForm)    // IE10+
- setAttribute('disabled', '')或者loginForm.querySelector('[type="submit"]').disabled = true;
- `<input name="from" type="hidden" form="loginForm">   // IE10`

```js
1
var form = document.getElementById('loginForm');
2

form.addEventListener('submit',function(ev){
    ev.preventDefault();
})
3

var formdata = new FormData(form);
4

form[submit].addEventListener('click',function(){
    this.disabled = true;
    var request = new XMLHttpRequest();
    request.open("POST", "XXX");
    request.send(formdata);
    request.onload = function(oEvent) {
        //其他业务逻辑
       form[submit].disabled = false;
    };
})

//题目说直接通过什么属性控制，感觉有什么更简单的方法？
5

给隐藏的输入框加上form属性即可。

<form id="loginForm">
...
</from>
<input type="hidden" name="form" form="loginForm">
```