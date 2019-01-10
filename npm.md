 - install 参数

    install命令可以使用不同参数，指定所安装的模块属于哪一种性质的依赖关系，即出现在packages.json文件的哪一项中。

    ```
    –save：模块名将被添加到dependencies，可以简化为参数-S。
    –save-dev: 模块名将被添加到devDependencies，可以简化为参数-D。
    ```
    ```
    $ npm install sax --save
    $ npm install node-tap --save-dev
    # 或者
    $ npm install sax -S
    $ npm install node-tap -D
    ```

- 安装Beat版本

  ```
  # 安装最新的beta版
  $ npm install <module-name>@beta (latest beta)

  # 安装指定的beta版
  $ npm install <module-name>@1.3.1-beta.3
  ```

- 默认安装的切换控制

  npm install默认会安装dependencies字段和devDependencies字段中的所有模块，如果使用--production参数，可以只安装dependencies字段的模块。
  ```
  $ npm install --production
  ```
  或者
  ```
  $ NODE_ENV=production npm install
  ```
  一旦安装了某个模块，就可以在代码中用require命令加载这个模块。
  ```
    var backbone = require('backbone')
    console.log(backbone.VERSION)
  ```

- 更新模块

  `npm update` 命令可以更新本地安装的模块。

    - 升级当前项目的指定模块
      ```
      $ npm update [package name]
      ```
    - 升级全局安装的模块
      ```
      $ npm update -global [package name]
      ```
      
    它会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装。

    使用-S或--save参数，可以在安装的时候更新package.json里面模块的版本号。
    ```
    // 更新之前的package.json
    dependencies: {
      dep1: "^1.1.1"
    }
    ```
    ```
        // 更新之后的package.json
    dependencies: {
      dep1: "^1.2.2"
    }
    ```
  注意，从npm v2.6.1 开始，npm update只更新顶层模块，而不更新依赖的依赖，以前版本是递归更新的。如果想取到老版本的效果，要使用下面的命令。
    ```
    $ npm --depth 9999 update
    ```

- 卸载

  `npm uninstall`
  
  卸载已安装的模块 `$ npm uninstall [package name]`

  卸载全局模块 `$ npm uninstall [package name] -global`

- 继发执行 和 并行执行

  ```
  "build": "npm run build-js && npm run build-css"
  ```

  上面的写法是先运行`npm run build-js`，然后再运行`npm run build-css`，两个命令中间用&&连接。
  > 如果希望两个命令同时平行执行，它们中间可以用&连接。