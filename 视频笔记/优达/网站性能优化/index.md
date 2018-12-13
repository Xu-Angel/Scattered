1.0  标签转为节点   <span></span>  -->> span   --> DOM树
https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model#css-object-model-cssom
      ajax 局部返回html -->> 

2.0  CSSOM      CSS  是层叠性 的      没有部分CSS树可用    
     右边到左边  因为从右具体 开始  https://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left

3.0  计算布局  （旋转手机，？尺寸改变？）
     布局可能会被以下操作触发：手机上的设备方向更改、窗口大小调节或会修改 DOM 内容的任何其他操作 - 例如，向 DOM 树添加内容或从中移除内容、在节点上切换 CSSOM 属性等等！
--->> 

渲染树构建、布局及绘制 https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction

https://developers.google.com/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations

https://hpbn.co/  <<高性能浏览器>>

  DEV-->>timeline-tool 工具使用  https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool
https://www.css88.com/doc/chrome-devtools/  Chrome 开发者工具 -- 中文文档