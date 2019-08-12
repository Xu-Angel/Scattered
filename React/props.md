props 是 React 组件的输入。它们是从父组件向下传递给子组件的数据。

**记住，props 是只读的。不应以任何方式修改它们**：

// 错误做法！

props.number = 42;

如果你想要修改某些值，以响应用户输入或网络响应，请使用 state 来作为替代。

props.children

每个组件都可以获取到 props.children。它包含组件的开始标签和结束标签之间的内容。例如：

    <Welcome>Hello world!</Welcome>

在 Welcome 组件中获取 props.children，就可以得到字符串 Hello world!：

    function Welcome(props) {
      return <p>{props.children}</p>;
    }

对于 class 组件，请使用 this.props.children 来获取：

    class Welcome extends React.Component {
      render() {
        return <p>{this.props.children}</p>;
      }
    }
