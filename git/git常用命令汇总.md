# git常用命令

## 前言

好记性不如烂笔头，git的命令有很多最好的记忆方式就是实践，但是没有真正的多人开发项目的情况下，用到的git命令少之又少，没办法做下汇总，方便后续的查阅。

### 正文

#### 0.git status

- git config --global user.name "xxx" 配置用户名
- git config user.name 查看当前用户名
- git config --global user.email "xxx@xxx.com" 配置邮件
- git config user.eamil 查看当前用户邮箱
- git config --global color.ui true git status等命令自动着色
- git config --global color.status auto
- git config --global color.diff auto
- git config --global color.branch auto
- git config --global color.interactive auto
- git config --global --unset http.proxy  remove  proxy configuration on git
  
#### 1.git status

查看工作目录的状态
`git status`操作会显示工作目录的状态，但是显示的不够精简，`git status -s`(short)命令则可以理解会精简模式，非常的实用。

#### 2.git log

查看commit历史

- git log --oneline 每条log只显示一行（类似精简模式），可以组合其他参数使用
- git log --graph 图形化的显示commit的分支情况
- git log --author=[author name] 显示指定作者的commit记录
- git log -1  显示1行日志 -n为n行
- git log --stat 显示提交日志及相关变动文件
- git log -p -m  显示提交日志及相关变动文件内容
- git log v2.0 显示v2.0的日志
- git log --pretty=format:'%h %s' --graph  图示提交日志

#### 3.git add

将指定文件改动添加到缓冲区中

- git add 将工作目录中所以文件变动都添加到缓冲区中
- git add xyz 添加xyz文件至index
- git add . 增加当前子目录下所有更改过的文件至index
  
#### 4.git diff

- git diff对比工作目录文件和暂存区的内容区别，也就是修改之后还没有暂存起来的内容变化
- git diff --cached/--staged 将暂存区的文件与上次commit的工作目录的文件内容进行对比
- git diff 显示所有未添加至index的变更
- git diff --cached 显示所有已添加index但还未commit的变更
- git diff HEAD^ 比较与上一个版本的差异
- git diff HEAD -- ./lib 比较与HEAD版本lib目录的差异
- git diff origin/master..master 比较远程分支master上有本地分支master上没有的
- git diff origin/master..master --stat 只显示差异的文件，不显示具体内容

#### 5.git commit

将暂存区的内容提交

- git commit -m messge 这个命令是最普通的commit，提交commit并附带相应的message
- git commit -a 先将工作目录中已经被track的文件添加到暂存区，然后提交暂存区的内容
- git commit -amend 新建一个新的提交替换当前的commit的，可以理解为修改当前的commit，注意真正其实是替换，因为旧的commit已经不存在，可以log看一下对应的SHA-1
- git commit --amend -m 'xxx' 合并上一次提交（用于反复修改）
- git commit -am 'xxx' 将add和commit合为一步
  
#### 6.git rm

对暂存区的内容进行操作

- git rm filename: 将文件移出暂存区，同时也移出工作目录
- git rm --cached filename: 将文件移出暂存区，不会移出工作目录
- git rm xxx  删除index中的文件
- git rm -r * 递归删除

#### 7.git init

在当前目录初始化git仓库创建一个.git的文件夹。

#### 8.git clone

git clone [url] newname 克隆项目可以指定项目名称

#### 9.[git reset](./git.md)

- git reset --hard HEAD 将当前版本重置为HEAD（通常用于merge失败回退）

可以参考git小结，有比较详细的说明

#### 10.git revert

git revert commit 会根据提供的commit然后在当前commit上添加一个commit，commit的内容这是与指定的commit的内容相反，相对于中合作用。

#### 11.[git stash](./git.md)

git stash类似一个栈，可以将工作目录的更改添加压入其中，后要用的时候弹出即可。

- git stash 将当前工作目录所有已经track的文件更改压入栈中
- git stash -u 将当前工作目录中所以的文件更改压入栈中，包括untrack
- git stash pop 将stash栈顶保存的工作目录的更改弹出
- git stash clear 清空stash这个栈
- git stash       暂存当前修改，将所有至为HEAD状态
- git stash list 查看所有暂存
- git stash show -p stash@{0}  参考第一次暂存
- git stash apply stash@{0} 应用第一次暂存

#### 12.git branch

分支的主要操作

- git branch 列出所有分支
- git branch name 新建分支
- git branch -d name  删除分支
- git push remote-name -d branch-name 删除远程分支
- git show-branch --all 图示所有分支历史
- git show-branch  图示当前分支历史
- git branch -d hotfixes/BJVEP933 删除分支hotfixes/BJVEP933（本分支修改已合并到其他分支）
- git branch -D hotfixes/BJVEP933 强制删除分支hotfixes/BJVEP933

#### 13.git checkout

主要功能是切换分支，也有其他功能

- git checkout branch 切换到指定分支
- git checkout -b branch 新建一个分支并切换到该分支上
- git checkout --filename 将暂存区的文件更改移出
- git checkout -b master_copy       从当前分支创建新分支master_copy并检出
- git checkout -b master master_copy     上面的完整版
- git checkout features/performance 检出已存在的features/performance分支
- git checkout --track hotfixes/BJVEP933 检出远程分支hotfixes/
- git checkout -- README            检出head版本的README文件（可用于修改错误回退）
- git checkout -- file可以丢弃工作区的修改：$ git checkout -- readme.txt
- git checkout -- file命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到git checkout命令。

#### 14.git merge

合并分支

- git merge branch 合并本地的指定分支到当前分支上
- git merge [alias][branch] 将远程仓库的指定分支合并到本地的当前分支上
- git merge origin/master  合并远程master分支至当前分支

#### 15.git tag

给commit加上tag信息，一般用来发布版本的标记

- git tag  最基本的命令可以添加tag信息
- git tag -a 这个命令可以添加tag信息，回车后会进入vim的编辑模式，可以添加一些描述
- git tag -a commit 可以指定要添加tag的commit
git tag  显示已存在的tag
git tag -a v2.0 -m 'xxx' 增加v2.0的tag

#### 16.git remote

管理远程仓库的命令。

- git remote 列出远程仓库别名的列表
- git remote -v 列出别名对于的url
- git remote add [alias][url] 新建一个新的remote repo
- git remote rm [alias] 删除alias
- git remote rename  [old-alias][new-alias] 重命名
- git remote set-url [alias][ulr] 关系remote repo的url
  
#### 17.[git rebase](./git.md)

可以查看git小结关于rebase的介绍会详细很多。

#### 18.git push

- git push [alias][branch] 将当前分支push到alias（远程仓库别名）的branch上，如果分支不存在则会先新建该分支再更新。
- git branch                       显示本地分支
- git branch --contains 50089      显示包含提交50089的分支
- git branch -a                    显示所有分支
- git branch -r                    显示所有原创分支
- git branch --merged              显示所有已合并到当前分支的分支
- git branch --no-merged           显示所有未合并到当前分支的分支
- git branch -m master master_copy 本地分支改名
- git push origin master   将当前分支push到远程master分支
- git push origin :hotfixes/BJVEP933     删除远程仓库的hotfixes/BJVEP933分支
- git push --tags         把所有tag推送到远程仓库
  
#### 19.git reflog

可以查看commit的所以记录，包括没有被引用的记录。

#### 20.git show

- git show dfb02e6e4f2f7b573337763e5c0013802e392818 显示某个提交的详细内容
- git show dfb02  可只用commitid的前几位
- git show HEAD显示HEAD提交日志
- git show HEAD^  显示HEAD的父（上一个版本）的提交日志 ^^为上两个版本 ^5为上5个版本
- git show v2.0 显示v2.0的日志及详细内容
- git show HEAD@{5}
- git show master@{yesterday}  显示master分支昨天的状态
- git show HEAD~3
- git show -s --pretty=raw 2be7fcb476

#### 21.git fetch

- git fetch 获取所有远程分支（不更新本地分支，另需merge）
- git fetch --prune 获取所有原创分支并清除服务器上已删掉的分支
  
#### 21.git pull

- git pull origin master 获取远程分支master并merge到当前分支
  
#### 21.git grep

- git grep "delete from" 文件中搜索文本“delete from”
- git grep -e '#define' --and -e SORT_DIRENT
  
#### 22.git ls

git ls-files 列出git index包含的文件

#### 23.git mv

git mv README README2 重命名文件README为README2

#### 24.git whatchanged

git whatchanged 显示提交历史对应的文件修改

#### 25.git cherry-pick

git cherry-pick ff44785404a8e 合并提交ff44785404a8e的修改

#### 25.git remote

- git remote add origin git+ssh://git@192.168.53.168/VT.git 增加远程定义(用于push/pull/fetch)
- git remote  列出所有远程主机
- git remote -v  使用-v选项，可以参看远程主机的网址。

## 统计类

- 统计每个人增删行数

```bash
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

- 查看git上的个人代码量：
  
```bash
git log --author="username" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

- 提交数统计
  
```bash
git log --oneline | wc -l
```

- 显示今天你写了多少行代码

```bash
git diff --shortstat "@{0 day ago}"
```

- 显示所有提交过的用户，按提交次数排序
  
```bash
git shortlog -sn
``
## 参考文章

- [Git常用命令总结](http://www.cnblogs.com/mengdd/p/4153773.html)
- https://segmentfault.com/a/1190000008542123