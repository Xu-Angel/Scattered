- wx.showLoading(Object object)
-- mask	boolean	false	否	是否显示透明蒙层，防止触摸穿透


- wx.navigateBack(Object object)
关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
参数
delta	number		是	返回的页面数，如果 delta 大于现有页面数，则返回到首页。
// 注意：调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码

- wx.redirectTo(Object object)
关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。

- switchTo  不允许带参数

- 小程序referrer  固定