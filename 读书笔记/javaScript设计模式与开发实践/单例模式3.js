// 编写通用单例函数

const getSingle = function (fn) {
  let result
  return function () {
    return result || (result = fn.applyh(this, arguments))
  }
}

/* 
将用于创建登录浮窗的方法用参数fn的形式传入getSingle，我们不仅可以传入createLoginLayer，还能传入createScript、createIframe、createXhr等。之后再让getSingle 返回一个新的函数，并且用一个变量result来保存fn的计算结果。result变量因为身在闭包中，它永远不会被销毁。在将来的请求中，如果result已经被赋值，那么它将返回这个值。
*/
var createLoginLayer = function(){
  var div = document.createElement( 'div' );
  div.innerHTML = '我是登录浮窗';
  div.style.display = 'none';
  document.body.appendChild( div );
  return div;
};

var createSingleLoginLayer = getSingle( createLoginLayer );

document.getElementById( 'loginBtn' ).onclick = function(){
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
};