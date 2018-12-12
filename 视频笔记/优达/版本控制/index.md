git bash 启动编辑器：

.bash配置文件
运行以下 Git 配置命令。如果使用的文本编辑器不是 Sublime，或者 Sublime 安装在其他位置中，则需要修改第一条命令。有关适用于其他多个常见文本编辑器的正确命令，请参阅此页。对于任何其他编辑器，你需要输入从 Git Bash 启动该编辑器时使用的命令。

```bash
git config --global core.editor "'C:/Program Files/Sublime Text 2/sublime_text.exe' -n -w"
git config --global push.default upstream
git config --global merge.conflictstyle diff3
```

操作

ls -a 显示所有包括隐藏   - （dash 破折号下划线）

git diff 
git add .
git status
git reset --hard
git log
git log --graph --oneline master    显示图表形式的提交记录  XX分支
git log --graph   显示提交记录
