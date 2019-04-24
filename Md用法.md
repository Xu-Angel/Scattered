![Scion Logo](./logo.png)

# SCION
A light tool to generate projects in an easy way.

# Installation
```
npm install scion-cli -g
```
or
```
git clone https://github.com/jrainlau/scion.git

cd scion && npm install

npm link
```

# Usage
Open your terminal and type `scion` or `scion -h` , you'll see the help infomation below:
```
  Usage: scion <command>


  Commands:

    add|a      Add a new template
    list|l     List all the templates
    init|i     Generate a new project
    delete|d   Delete a template

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

> Note that if you are using `MacOS`, `sudo` was required while using commands `add` and `delete`.

# Commands
### add | a
This command would help you to add a new template to the `templates.json`, which will be used by `Scion` to generate projects.
```
$ scion add

? Set the custom name of the template: my-first-template
? Owner/name of the template: jrainlau/scion
? Branch of the template: new
┌───────────────────┬────────────────┬────────┐
│ Template Name     │ Owner/Name     │ Branch │
├───────────────────┼────────────────┼────────┤
│ my-first-template │ jrainlau/scion │ new    │
└───────────────────┴────────────────┴────────┘
✔ New template has been added successfully!
```
`Scion` use [download-git-repo](https://github.com/flipxfx/download-git-repo) to down load git repos. After answering 3 questions, you'll add a new template to `Scion`.

### list | l
It shows you the templates list.
```
$ scion list

┌────────────────────┬────────────────┬────────┐
│ Template Name      │ Owner/Name     │ Branch │
├────────────────────┼────────────────┼────────┤
│ my-first-template  │ jrainlau/scion │ new    │
├────────────────────┼────────────────┼────────┤
│ my-second-template │ jrainlau/motto │ master │
└────────────────────┴────────────────┴────────┘
```

### init | i
After adding new templates, you could use this command to generate your own project by choosing template.
```
$ scion init

? Template name: my-first-template
? Project name: my-project
? Where to init the project? ../
⠹ Downloading template...

New project has been initialized successfully!
```

It's easy, right?

### delete | d
To delete a template, you could use this command:
```
$ scion delete

? Which template you want to delete? my-second-template
┌───────────────────┬────────────────┬────────┐
│ Template Name     │ Owner/Name     │ Branch │
├───────────────────┼────────────────┼────────┤
│ my-first-template │ jrainlau/scion │ new    │
└───────────────────┴────────────────┴────────┘
✔ Template has been deleted successfully
```

MIT.


# markdown的高级用法

## 前言
本文主要整理一下，markdown一些比较不常用但是很实用的用法，所以会不定时更新哦！
## 正文
#### 1.插入视频
<video id="video" controls="" preload="none" poster="http://om2bks7xs.bkt.clouddn.com/2017-08-26-Markdown-Advance-Video.jpg">
      <source id="mp4" src="http://om2bks7xs.bkt.clouddn.com/2017-08-26-Markdown-Advance-Video.mp4" type="video/mp4">
</video>

``` html
<video id="video" controls="" preload="none" poster="">
      <source id="mp4" src="" type="video/mp4">
</video>
```

#### 2.插入音频
<audio id="audio" controls="" preload="none">
      <source id="mp3" src="http://oht4nlntk.bkt.clouddn.com/Music_iP%E8%B5%B5%E9%9C%B2%20-%20%E7%A6%BB%E6%AD%8C%20%28Live%29.mp3">
</audio>

``` html
<audio id="audio" controls="" preload="none">
      <source id="mp3" src="">
</audio>
```

[4.在](#jump)
#### 3.设置图片大小且区中
<div align=center><img width = '250' height ='150' src ="./1487586677761.jpg"/></div>

```html
<div align=center/left/right><img width = '150' height ='150' src =""/></div>
```
#### 4.文章内设置锚点跳转
[4.在页面内跳转](#jump)
<span id="jump">**4.在页面内跳转**</span>

```html
[4.在页面内跳转](#jump) //利用括号内的#id进行跳转
<span id="jump">**4.在页面内跳转**</span>
```
#### 5.设置字体和颜色
<font face="黑体">我是黑体字</font>
<font face="微软雅黑">我是微软雅黑</font>
<font face="STCAIYUN">我是华文彩云</font>
<font color=#0099ff size=7 face="黑体">color=#0099ff size=72 face="黑体"</font>
<font color=#00ffff size=72>color=#00ffff</font>
<font color=gray size=72>color=gray</font>

```html
<font face="黑体">我是黑体字</font>
<font face="微软雅黑">我是微软雅黑</font>
<font face="STCAIYUN">我是华文彩云</font>
<font color=#0099ff size=7 face="黑体">color=#0099ff size=72 face="黑体"</font>
<font color=#00ffff size=72>color=#00ffff</font>
<font color=gray size=72>color=gray</font>
```
#### 6.表格和表格内容对其
|左对齐|居中对齐|右对齐|
|:-    |:------:|-:|
|左对齐列|居中对齐列|右对齐列|
|1|2|3|

```html
|左对齐|居中对齐|右对齐|
|:-    |:------:|-:|
|左对齐列|居中对齐列|右对齐列|
|1|2|3|
```

#### 7.设置空行缩进
半方大的空白&ensp;或&#8194;对方答复

全方大的空白&emsp;或&#8195;对方答复

不断行的空白格&nbsp;或&#160;对方答复

```html
半方大的空白&ensp;或&#8194;
全方大的空白&emsp;或&#8195; 推荐使用这个两个就能实现首行缩进的效果
不断行的空白格&nbsp;或&#160;
```
#### 8.删除线的效果
~~这是一条删除线~~

```html
~~这是一条删除线~~
```
#### 9.代办事项
- [x] 已办理
- [ ] 代办
 


```html
```
##### 浏览器系列
* [【浏览器系列 1-1】线程与进程](/browser/JS_browser_thread.md)
* [【浏览器系列 1-2】页面渲染-老话新谈](/network/how_browser_work.md)
* [【浏览器系列 1-3】浏览器存储](/browser/browser_storage.md)
* [【浏览器系列 1-4】Javascript垃圾回收](/JS/GC.md)
* [【浏览器系列 1-5】Javascript内存分配](/JS/memory_allocation.md)
* [【浏览器系列 1-6】浏览器跨域总结](/browser/CORS.md)`hot`
* [【浏览器系列 1-7】性能优化1 - 整体流程优化](/browser/rending_optimize.md)
* [【浏览器系列 1-8】性能优化2 - css基本性能优化](/CSS/css_optimize.md)
* [【浏览器系列 1-9】浏览器事件模型](/JS/eventMode.md)  
* [【浏览器系列 1-10】浏览器中的cookie](/browser/cookie.md)   `new` 
* [【浏览器系列 1-11】性能优化3 - 从渲染Timeline中深入交互优化](/browser/PaintTiming.md) `new` 
* [【浏览器系列 1-12】屏幕刷新与requestAnimationFrame](/CSS/RAF.md)
* [【浏览器系列 1-13】性能优化4 - 从webpack打包配置的优化](/browser/webpack_optimize.md) `new` 
* [【浏览器系列 1-14】性能优化5 - 从CSS合成层着手的渲染优化](/CSS/GPU.md) `写作中...` 