# 防抖与节流

## 啥是防抖

防抖(Debouncing)与节流(throttle)都是用来控制有个函数在一定时间内，限制执行次数的技巧，两者相似而又不同。 之所以叫抖动，时间的频繁触发可能是和动物的抽搐相类似吧。

## 为何要防抖和节流

窗口的`resize`、`scroll`输入框的`input`都属于高频事件，高频率触发这些时间，会对浏览器造成过于繁重的负担。
> 防抖与节流二者最大的区别是，前者用的是“冷却时间” 而后者用的是 “保护时间” 。
> 冷却时间内，相同的事件触发，会导致冷却时间重新计算（也就是延迟）。
>“保护时间”内，相同的事件触发，不会导致保护时间重新计算。

## 防抖动的几种方法

### ① 延迟执行版

> 首次触发，立即执行，在一定时间内屏蔽后续相同的该事件。

- 1

```js
// 整体使用一个闭包的形式
const debounce = (callback,waitTime,...args) =>{
    let timeout; // 定时器
    return function(){
       const context = this;
       // 判断当前是否处于一个事件保护时间段，若是，则取消掉当前的定时器对象
       if(timeout) clearTimeout(timeout);
       // 为最新的操作的事件处理，设定一个定时器
       timeout = setTimeout(()=>{
           callback.apply(context,args);
       },waitTime)
    }
}
var zone = document.getElementById("zone");
 // 绑定事件
zone.onmousemove = debounce(function(){
    count ++;  
},1000)
```

- 2

```js
// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
// 不难看出如果用户调用该函数的间隔小于wait的情况下，上一次的时间还未到就被清除了，并不会执行函数
```

#### ② 立即执行版

> 首次触发，合并后续动作，等待+静止（没有该事件再发生）一定时间后，统一将事件触发一次。

- 1

```js
const debounce = (callback,waitTime,...args)=>{
    let timeout;
    return function(){
        const context =this;
        // 事件触发不可能累加，若有事件在栈中，则清除当前的定时器
        if(timeout) clearTimeout(timeout);
        // 若当前还有定时器存在，则证明当前处于事件冷却阶段，反之则相反
        let callNow = !timeout;
        // 给定时器本身设定一个清除的时间，冷却时间后则
        timeout = setTimeout(()=>{
            timeout = null;
        },waitTime)
        // ① 如果当前不处于冷却时间，则可以立即执行下一次事件。
        // ② 若是第一次触发，timeout对象为undefined，则时间立即被执行。
        if(callNow){
            callback.appy(context,args)
        }
    }
}
```

- 2

```js
// 这个是用来获取当前时间戳的
function now() {
  return +new Date()
}
/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce (func, wait = 50, immediate = true) {
  let timer, context, args

  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  // 这里返回的函数是每次实际调用的函数
  return function(...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
    // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
```

- 3 underscore中的解决方案

```js
/**
* underscore 防抖函数
* @param {function}  func  回调函数
* @param {number}  wait   表示时间窗口的间隔
* @param {boolean}  immediate 设置为true时，是否立即调用函数
* @return  {function}      返回调用的回调函数
*/
_.debounce  =function(func,wait,immediate){
    var timeout,        // 冷却时间
          args,         // 参数几何
          context,      // 函数的执行上下文环境
          timestamp,    // 当前的时间戳
          result;       // 返回的结果
    var later = function(){
        // 本次触发的时间与上一次相比较
        var last = _.now() - timestamp;
        // 若果当前时间间隔少于设定时间，则重置定时器 ，继续延迟执行（冷却时间的特性）
        if(last < wait && last >=0){
            timeout = setTimeOut(later,wait-last);
        }else{
            // 清除定时器
            timeout = null;
            if(!immediate){
                result = func.apply(context,args){
                    if(!timeout) context =rgs =null;
                }
            }
        }
    }
    return function(){
        context = this;
        args = arguments; // 参数列表
        timestamp = _.now();
        var callNow = immediate && !timeout;
        // 如果定时器不存在就创建一个，若当前已存在定时器，则表明处于冷却时间，接下来的操作也不会执行
        // 若是初次进行操作，则不存在定时器，需要新设定定时器
        if(!timeout) timeout =  setTimeout(latter,wait);
        // 若果需要立即执行的话，则通过apply执行
        if(callNow){
            result = func.apply(context,args);
            context = args = null;
        }
        return result;
    }
}
```

#### 是否立即

例如在搜索引擎搜索问题的时候，我们当然是希望用户输入完最后一个字才调用查询接口，这个时候适用延迟执行的防抖函数，它总是在一连串（间隔小于wait的）函数触发之后调用。
例如用户给interviewMap点star的时候，我们希望用户点第一下的时候就去调用接口，并且成功之后改变star按钮的样子，用户就可以立马得到反馈是否star成功了，这个情况适用立即执行的防抖函数，它总是在第一次调用，并且下一次调用必须与前一次调用的时间间隔大于wait才会触发。

对于按钮防点击来说的实现：如果函数是立即执行的，就立即调用，如果函数是延迟执行的，就缓存上下文和参数，放到延迟函数中去执行。一旦我开始一个定时器，只要我定时器还在，你每次点击我都重新计时。一旦你点累了，定时器时间到，定时器重置为 null，就可以再次点击了。
对于延时执行函数来说的实现：清除定时器ID，如果是延迟调用就调用函数

## 节流

> 防抖和节流都在于将一定时间内相同的事件进行合并，合理减少事件的响应。
> 防抖重点在于，在本次事件进行响应或者下次事件开始收集之前，先必须经过一段时间的冷却时间。
> 而节流是在事件连续触发时，设定一定的定时器间隔，作为保护时间，保护时间内允许触发事件，且事件的触发不导致保护时间重新计算，保护时间结束后，进入新的一轮事件响应。

### 立即响应版

```js
const throttle  = function(callback,waitTime,...args)=>{
    let pre = 0 ; // 初始值设置为0，保证第一次事件会立即执行。
    return function(){
        const context = this;
        let now = Date.now();
        if(now - pre >= waitTime){
            callback.apply(context,args);
            pre = Date.now();
        }
    }
}
```

```js
/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 */
_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 之前的时间戳
    var previous = 0;
    // 如果 options 没传则设为空对象
    if (!options) options = {};
    // 定时器回调函数
    var later = function() {
      // 如果设置了 leading，就将 previous 设为 0
      // 用于下面函数的第一个 if 判断
      previous = options.leading === false ? 0 : _.now();
      // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      // 获得当前时间戳
      var now = _.now();
        // 首次进入前者肯定为 true
        // 如果需要第一次不执行函数
        // 就将上次时间戳设为当前的
        // 这样在接下来计算 remaining 的值时会大于0
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
        // 如果当前调用已经大于上次调用时间 + wait
        // 或者用户手动调了时间
        // 如果设置了 trailing，只会进入这个条件
        // 如果没有设置 leading，那么第一次会进入这个条件
        // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
        // 其实还是会进入的，因为定时器的延时
        // 并不是准确的时间，很可能你设置了2秒
        // 但是他需要2.2秒才触发，这时候就会进入这个条件
      if (remaining <= 0 || remaining > wait) {
        // 如果存在定时器就清理掉否则会调用二次回调
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // 判断是否设置了定时器和 trailing
        // 没有的话就开启一个定时器
        // 并且不能不能同时设置 leading 和 trailing
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
```

### 参考

- [【防抖与节流-Sofia】](https://juejin.im/post/5b7b88d46fb9a019e9767405)
- [github](https://github.com/HXWfromDJTU/blog/blob/master/JS/debounce.md)
- [yck](https://yuchengkai.cn/docs/frontend/#%E9%98%B2%E6%8A%96)
