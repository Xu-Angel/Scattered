# git 提交规范

## 前言
    好的git commit message能够让开发人员快速了解项目的开发历史，每个版本所进行的操作，快速定位出现bug，甚至在发版的时候能够快速生成的feat feature、fix bug；总之message的提交要规范、准确。
## 正文
    这里写的是Angular 规范，业界普遍使用的。

 `commit message`一般由三个部分组成，Header、Body和Footer
``` 
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer> 
```
### 一、Header
Header部分是必需的，Header又由三个部分组成：1）tpye（必需）表面这个commit的类型；2）scope（可选）表示这次commit的影响范围；3）subject（必需）关于本次commit的简短描述（不超过50字），通常以动词开通使用第一人称现在时，首字母小写，且结尾不加句号。

    type的种类
    - feat：new feature
    - fix：修复bug
    - docs：文档相关
    - style: 格式（不影响代码允许的变动）
    - refactor：重构
    - test: 增加测试
    - chore： 构建过程或者辅助工具的变动
### 二、Body
对本次commit的进行详细的描述，可以分成多行，使用第一人称现在时，首字母大写。
### 三、Footer
Footer主要有两个左右，一是提示本次commit与前面的代码版本不兼容，此时Footer以BREAKING CHANGE开头，后面添加相应的版本变动的描述。
```
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }
```
二是关闭对于的issue,使用Closes关键字后面跟上issue的id,且可以关闭多个issue。
```
Closes #123, #245, #992
```
### 四、Revert
还有一种特殊的情况，如果本次commit是revert（撤销）操作的话，则Header以revert：开头后面跟上撤销的commit的Header，然后Body固定是下面的这种形式。
```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```
## 参考
- [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)