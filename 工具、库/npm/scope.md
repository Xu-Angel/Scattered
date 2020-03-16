# 前缀

[@](https://docs.npmjs.com/misc/scope)

## 指定scope从指定仓库发布

.npmrc:

`
@xyz:registry=http://rnpm.xyz.com/
`
alias:

```
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"
```

登录关联： 

`npm login --registry=http://reg.example.com --scope=@myco`