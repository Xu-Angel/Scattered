https://juejin.im/post/5c2ecdc26fb9a049ed30ffab?utm_source=gold_browser_extension
https://cloud.tencent.com/developer/article/1038403

框架的核心是一个响应的数据绑定系统。
整个小程序框架系统分为两部分：视图层（View）和逻辑层（App Service）
框架可以让数据与视图非常简单地保持同步。当做数据修改的时候，只需要在逻辑层修改数据，视图层就会做相应的更新。

**逻辑层 App Service**
小程序开发框架的逻辑层使用 JavaScript 引擎为小程序提供开发者 JavaScript 代码的运行环境以及微信小程序的特有功能。
逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈。
开发者写的所有代码最终将会打包成一份 JavaScript 文件，并在小程序启动的时候运行，直到小程序销毁。这一行为类似 ServiceWorker，所以逻辑层也称之为 App Service。
在 JavaScript 的基础上，我们增加了一些功能，以方便小程序的开发：
增加 App 和 Page 方法，进行程序和页面的注册。
增加 getApp 和 getCurrentPages 方法，分别用来获取 App 实例和当前页面栈。
提供丰富的 API，如微信用户数据，扫一扫，支付等微信特有能力。
每个页面有独立的作用域，并提供模块化能力。
注意：小程序框架的逻辑层并非运行在浏览器中，因此 JavaScript 在 web 中一些能力都无法使用，如 window，document 等。

页面管理
框架 管理了整个小程序的页面路由，可以做到页面间的无缝切换，并给以页面完整的生命周期。开发者需要做的只是将页面的数据、方法、生命周期函数注册到 框架 中，其他的一切复杂的操作都交由 框架 处理。

基础组件

   
// 导航跳转
tab 底部，顶部--组件

## pages
[生命周期图解](https://developers.weixin.qq.com/miniprogram/dev/image/mina-lifecycle.png)

[生命周期回调函数](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)

  - onLoad(Object query)
  
    页面加载时触发。**一个页面只会调用一次**，可以在 onLoad 的参数中获取打开当前页面路径中的参数。

    参数说明

    名称	类型	说明

    query	Object	打开当前页面路径中的参数

  - onShow()

    页面显示/切入前台时触发。

  - onReady()
  
    页面初次渲染完成时触发。**一个页面只会调用一次**，代表页面已经准备妥当，可以和视图层进行交互。

    注意：对界面内容进行设置的 API 如wx.setNavigationBarTitle，请在onReady之后进行。详见生命周期

  - onHide()

    页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等。

  - onUnload()

    页面卸载时触发。如redirectTo或navigateBack到其他页面时。

- Page.prototype.setData(Object data, Function callback)
  - 直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
  - 仅支持设置可 JSON 化的数据。
  - 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
  - 请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题。

## wxss

**尺寸单位**
rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
设备	rpx换算px (屏幕宽度/750)	px换算rpx (750/屏幕宽度)
iPhone5	1rpx = 0.42px	1px = 2.34rpx
iPhone6	1rpx = 0.5px	1px = 2rpx
iPhone6 Plus	1rpx = 0.552px	1px = 1.81rpx
建议： 开发微信小程序时设计师可以用 iPhone6 作为视觉稿的标准。
注意： 在较小的屏幕上不可避免的会有一些毛刺，请在开发时尽量避免这种情况。

## 对象处理

- wx.createSelectorQuery()

  查询节点信息对象 

- IntersectionObserver

   对象，用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见

- NodesRef.fields(Object fields)

  获取节点的相关信息。需要获取的字段在fields中指定。返回值是 nodesRef 对应的 selectorQuery

- SelectorQuery

  查询节点信息的对象

## 事件

事件分类
事件分为冒泡事件和非冒泡事件：

冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。
非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。

- 事件绑定和冒泡

  事件绑定的写法同组件的属性，以 key、value 的形式。

  key 以bind或catch开头，然后跟上事件的类型，如bindtap、catchtouchstart。自基础库版本 1.5.0 起，在非原生组件中，bind和catch后可以紧跟一个冒号，其含义不变，如bind:tap、catch:touchstart。
  value 是一个字符串，需要在对应的 Page 中定义同名的函数。不然当触发事件的时候会报错。

  >bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。

  如在下边这个例子中，点击 `inner view` 会先后调用`handleTap3`和`handleTap2`(因为tap事件会冒泡到 `middle view`，而 `middle view` 阻止了 tap 事件冒泡，不再向父节点传递)，点击 `middle view` 会触发`handleTap2`，点击 `outer view` 会触发`handleTap1`。

    ```html
    <view id="outer" bindtap="handleTap1">
      outer view
      <view id="middle" catchtap="handleTap2">
        middle view <view id="inner" bindtap="handleTap3"> inner view </view>
      </view>
    </view>
    ```

- 事件的捕获阶段

  自基础库版本 1.5.0 起，触摸类事件支持捕获阶段。捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。需要在捕获阶段监听事件时，可以采用`capture-bind`、`capture-catch`关键字，后者将中断捕获阶段和取消冒泡阶段。

  在下面的代码中，点击 `inner view` 会先后调用`handleTap2`、`handleTap4`、`handleTap3`、`handleTap1`。

  ```html
  <view
    id="outer"
    bind:touchstart="handleTap1"
    capture-bind:touchstart="handleTap2"
  >
    outer view
    <view
      id="inner"
      bind:touchstart="handleTap3"
      capture-bind:touchstart="handleTap4"
    >
      inner view
    </view>
  </view>
  ```

  如果将上面代码中的第一个`capture-bind`改为`capture-catch`，将只触发`handleTap2`。

  ```html
  <view
    id="outer"
    bind:touchstart="handleTap1"
    capture-catch:touchstart="handleTap2"
  >
    outer view
    <view
      id="inner"
      bind:touchstart="handleTap3"
      capture-bind:touchstart="handleTap4"
    >
      inner view
    </view>
  </view>
  ```

## 路由

> [#](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html#getcurrentpages)先熟悉路由的触发方式以及页面生命周期函数

- navigateTo, redirectTo 只能打开非 tabBar 页面。
- switchTab 只能打开 tabBar 页面。
- reLaunch 可以打开任意页面。
- 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
- 调用页面路由带的参数可以在目标页面的onLoad中获取。
- getCurrentPages()

  getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。

  注意：
  不要尝试修改页面栈，会导致路由以及页面状态错误。
  不要在 App.onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。

## 数据

> 全局数据？ 局部数据

  在`JavaScript`文件中声明的变量和函数只在该文件中有效；不同的文件中可以声明相同名字的变量和函数，不会互相影响。

  通过全局函数 `getApp()` 可以获取`全局的应用实例`，如果需要全局的数据可以在 `App()` 中设置，如：

  ```js
  // app.js
  App({
    globalData: 1
  })
  ```

  ```js
  // a.js
  // The localValue can only be used in file a.js.
  const localValue = 'a'
  // Get the app instance.
  const app = getApp()
  // Get the global data and change it.
  app.globalData++
  ```

  ```js
  // b.js
  // You can redefine localValue in file b.js, without interference with the localValue in a.js.
  const localValue = 'b'
  // If a.js it run before b.js, now the globalData shoule be 2.
  console.log(getApp().globalData)
  ```

>模块化导入导出

  可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。模块只有通过 `module.exports` 或者 `exports` 才能对外暴露接口。

  需要注意的是：

  `exports` 是 `module.exports` 的一个引用，因此在模块里边随意更改 `exports` 的指向会造成未知的错误。所以更推荐开发者采用 `module.exports` 来暴露模块接口，除非你已经清晰知道这两者的关系。
  小程序目前不支持直接引入 `node_modules` , 开发者需要使用到 `node_modules` 时候建议拷贝出相关的代码到小程序的目录中或者使用小程序支持的 `npm` 功能。

  ```js
  // common.js
  function sayHello(name) {
    console.log(`Hello ${name} !`)
  }
  function sayGoodbye(name) {
    console.log(`Goodbye ${name} !`)
  }

  module.exports.sayHello = sayHello
  exports.sayGoodbye = sayGoodbye
  ```

  ​在需要使用这些模块的文件中，使用 `require(path)` 将公共代码引入

  ```js
  const common = require('common.js')
  Page({
    helloMINA() {
      common.sayHello('MINA')
    },
    goodbyeMINA() {
      common.sayGoodbye('MINA')
    }
  })
  ```

  tip: `require` 暂时不支持绝对路径

  ## 渲染

> **`wx:if` vs `hidden`**

因为 `wx:if` 之中的模板也可能包含数据绑定，所以当 `wx:if` 的条件值切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。

同时 `wx:if` 也是惰性的，如果在初始渲染条件为 `false`，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。

相比之下，`hidden` 就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。

一般来说，`wx:if` 有更高的切换消耗而 `hidden` 有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用 `hidden` 更好，如果在运行时条件不大可能改变则 `wx:if` 较好。

> 模版

-  `import`可以在该文件中使用目标文件定义的`template`，如：

    在 `item.wxml` 中定义了一个叫`item`的`template`：

    ```html
    <!-- item.wxml -->
    <template name="item">
      <text>{{text}}</text>
    </template>
    ```

    在 `index.wxml` 中引用了 `item.wxml`，就可以使用`item`模板：

    ```html
    <import src="item.wxml" /> <template is="item" data="{{text: 'forbar'}}" />
    ```

    **tip:**

    `import `有作用域的概念，即只会 `import `目标文件中定义的 `template`，而不会 `import `目标文件 `import `的 `template`。

    如：`C import B`，`B import A`，在C中可以使用B定义的`template`，在B中可以使用A定义的`template`，但是C不能使用A定义的`template`。

- include

    `include` 可以将目标文件除了 `<template/>` `<wxs/>` 外的整个代码引入，相当于是拷贝到 `include` 位置，如：

    ```html
    <!-- index.wxml -->
    <include src="header.wxml" /> <view> body </view> <include src="footer.wxml" />
    <!-- header.wxml -->
    <view> header </view>
    <!-- footer.wxml -->
    <view> footer </view>
    ```

## 自定义组件

