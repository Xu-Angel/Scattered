为了把 action 和 state 串起来，开发一些函数，这就是 reducer。再次地，没有任何魔法，reducer 只是一个接收 state 和 action，并返回新的 state 的函数。 对于大的应用来说，不大可能仅仅只写一个这样的函数，所以我们编写很多小函数来分别管理 state 的一部分

唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。除了 type 字段外，action 对象的结构完全由你自己决定。参照 Flux 标准 Action 获取关于如何构造 action 的建议。

Action 创建函数 就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。

在 Redux 中的 action 创建函数只是简单的返回一个 action:

    function addTodo(text) {
      return {
        type: ADD_TODO,
        text
      }
    }
    
这样做将使 action 创建函数更容易被移植和测试。