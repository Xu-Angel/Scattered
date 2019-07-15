# x

## 我们强烈建议你不要创建自己的组件基类。 在 React 组件中，代码重用的主要方式是组合而不是继承

## 常用生命周期

**熟练掌握**

https://zh-hans.reactjs.org/docs/react-component.html#commonly-used-lifecycle-methods

## 其他 APIs

组件还提供了一些额外的 API：

setState()

forceUpdate() -> :

```js
默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。

调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。

通常你应该避免使用 forceUpdate()，尽量在 render() 只使用 this.props 和 this.state
```

## class 属性

defaultProps -> :

```js
defaultProps 可以为 Class 组件添加默认 props。这一般用于 props 未赋值，但又不能为 null 的情况
```

displayName -> :

```js
displayName 字符串多用于调试消息。通常，你不需要设置它，因为它可以根据函数组件或 class 组件的名称推断出来。如果调试时需要显示不同的名称或创建高阶组件，请参阅使用 displayname 轻松进行调试了解更多。
```

## componentDidUpdate()

componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。

当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。（例如，当 props 未发生变化时，则不会执行网络请求）。

```jsx
    componentDidUpdate(prevProps) {
      // 典型用法（不要忘记比较 props）：
      if (this.props.userID !== prevProps.userID) {
        this.fetchData(this.props.userID);
      }
    }
```

你也可以在 componentDidUpdate() 中直接调用 setState()，但**请注意它必须被包裹在一个条件语件里，正如上述的例子那样进行处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。不要将 props “镜像”给 state，请考虑直接使用 props。** 欲了解更多有关内容，请参阅为什么 props 复制给 state 会产生 bug。

如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。

注意 : **如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()。**

## 实例属性

props
state

## 注意xxx__~~

避免将 props 的值复制给 state！这是一个常见的错误：

```js
constructor(props) {
 super(props);
 // 不要这样做
 this.state = { color: props.color };
}
```

如此做毫无必要（你可以直接使用 this.props.color），同时还产生了 bug（更新 prop 中的 color 时，并不会影响 state）。

**只有在你刻意忽略 prop 更新的情况下使用。此时，应将 prop 重命名为 initialColor 或 defaultColor。**必要时，你可以修改它的 key，以强制“重置”其内部 state。

请参阅关于避免派生状态的博文，以了解出现 state 依赖 props 的情况该如何处理。

## 静态 getDerivedStateFromError()

处理降级渲染。
