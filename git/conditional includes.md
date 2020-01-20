# t

https://www.motowilliams.com/conditional-includes-for-git-config

https://ukn.me/wo-de-duo-xiang-mu-guan-li.html

git config
一般来说，在不同场景下会有不同的身份，比如我会在 GitHub 上使用网名，而在公司内部 gitlab 使用真名。所以 git config 需要区分不同的 user.name 和 user.email。

虽然可以每个 git 项目都敲一次 git config user.name xxx，但是这很麻烦，也容易忘记。 我试过好几次 commit 完看 git log 才发现自己忘记单独配置而直接读了全局的 git 配置，将我的网名推到了公司仓库。

万幸发现了 git 2.13.0 以后有一个叫 conditional includes 的功能，可以实现不同目录自动使用不同的 gitconfig，配置一次就够了：

删掉 ~/.gitconfig 里的 user 章节，也就是不使用全局配置了

增加 includeIf 配置，意思是这两个目录下分别读不同的配置文件
```
# ~/.gitconfig
[includeIf "gitdir:~/Code/Personal/"]
  path = .gitconfig-personal
[includeIf "gitdir:~/Code/Work/"]
  path = .gitconfig-work
  ```
然后分别创建不同的配置文件，填写独立的信息
```
# ~/.gitconfig-work
[user]
name = My name in company
email = name@company.com

# ~/.gitconfig-personal
[user]
name = My GitHub username
email = name@mail.com
```
这样在不同的目录下，就可以很放心的提交了，不用再担心会不会搞混了网络身份，哦耶~