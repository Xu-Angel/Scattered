# 单个redux使用

## createStore 创建store和reducers

创建一个 Redux [store](http://www.redux.org.cn/docs/api/Store.html) 来以存放应用中所有的 state。

查看源码的开始部分，我们发现**createStore**可以传入两个三个参数：

function createStore(reducer, preloadedState, enhancer) 

其中第一个参数**reducer** 是必须要传递的而且必须是一个函数，不然Redux回报一场



如果传递了第二个参数**preloadedState**，而且第二个参数不是一个**function** , 则将**preloadedState** 保存在内部变量**currentState**中， 也就是我们给**State** 的默认状态

如果**preloadedState** 是一个function,这可以是插入中间件 ， 则将preloadedState 赋值给**enhancer**



 创建一个 store 对象把reducers 规则函数传进去比如，存到currentReducer中。

```
const counter = function(state=15,action) { // 就是 reducers
  switch (action.type) {
    case 'jia1':
      return state + 1;
    case 'jian1':
      return state - 1;
    default:
      return state
  }
}
```



```
// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
//创建store
const store = Redux.createStore(counter)
```

## action

```
//使用action 创建函数
const jia = function (text) {
  return {
    type: 'jia1'
  }
}
```



## store.subscribe时时监听 state是否有更新

创建啦 store 对象后有 subscribe 方法，改方法是  时时监听 state是否有更新，如果更新啦，就会回调该函数。调用触发该回调函数，底层是把该传递传入一个函数，插入一个nextListeners队列中。

## store.dispatch 触发action更新state 

 触发action更新state。 底层是触发nextListeners队里中的所有函数。

## store.getState()

获取state数据





 # redux 注入react使用

##   Provider  组件

connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。React-Redux 提供Provider组件，可以让容器组件拿到state。

代码示例

```
import { Provider } from 'react-redux'
<Provider store={store}>
   <App />
</Provider>,
```

## applyMiddleware 

 redux通过该函数来使用注入中间件。可以把一个个中间件看成一截截的管道，他们组成了一条长的管道，只不过管道里流过的不是水，而是action产生的数据；

代码示例

```
import thunk from 'redux-thunk';
//日志中间件
import { createLogger } from 'redux-logger';
//日志
const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') { //不是生产环境打开日志
    middleware.push(createLogger()) //日志
}

 applyMiddleware(...middleware) //添加中间件

```



## redux-thunk

```
  中间件，作用：如果不使用该中间件，当我们dispatch一个action时，需要给dispatch函数传入action对象；但如果我们使用了这个中间件，那么就可以传入一个函数，这个函数接收两个参数:dispatch和getState。这个dispatch可以在将来的异步请求完成后使用，对于异步action很有用
 
 redux-thunk ，redux默认的设定是 dispatch 只能接受一个对象参数，函数和promise都是不允许的，这个中间件就是为了解决这个问题的，源码如下：

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
含义就是将 dispatch(action: object): any 签名替换成 dispatch(action: object | function): any，action creator中 dispatch, getState 等方法可以反复调用
```



## redux-logger

redux 日志插件





## actionTypes

 改用来定义更新  actionTypes 时候的状态参数值。

 示例

```
export const SET_MUNBER = 'SET_MUNBER'
```





## actions

 用来触发dispatch传递actionTypes 去更新state数据流

```
import { SET_MUNBER } from './actionTypes'
export const clickAdd = function (data) {
    return (dispatch, getState) => {
        dispatch({ type: SET_MUNBER, data: data });
    };
}
```



## state 

redux中的状态，也可以理解为数据。如果我默认设置数据为：

```
export default {
    number: 0
}
```



## reducers

 可以说是创建如何更新获取state的规则，也可以说是state中数据的key，函数名字就是key。值就是reducers返回的state值。

示例

```
import defaultState from './state'
import { SET_MUNBER } from './actionTypes'
//reducers 相当于 redux中的 state 命名名称
export const munber = function (state = defaultState.number, action) {
    switch (action.type) {
        case SET_MUNBER:
            return ++action.data;
        default:
            return state
    }
}
```

所以这样获取state中就有这样数据  state={munber:0}

## combineReducers

辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。

示例：

```
const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.data
    default:
      return state
  }
}

const postsBySubreddit = (state = { }, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return action.data
    default:
      return state
  }
}
//合并 reduers
const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})
```





## mapStateToProps()

mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。

作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射。请看下面的例子。

```
//把redux 中的state 映射到 组件props中
const mapStateToProps = state => {
    return {
        munber: state.munber,
    };
};
```

上面代码中，mapStateToProps是一个函数，它接受state作为参数，返回一个对象。这个对象有一个munber属性，映射到组件的props.munber中。



## mapDispatchToProps() 

//把redux 中的Dispatch 映射到 组件props中

用来建立 UI 组件的参数到store.dispatch方法的映射。

如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。

 

```
import { clickAdd } from './actions'
//把redux 中的Dispatch 映射到 组件props中
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addMunber(data) {
            // console.log(data)
            //传递actions进来
            dispatch(clickAdd(data));
        }
    }
    
};
```



## containers 的connect容器性组件

React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。

因此，connect方法的完整 API 如下。

```
import { connect } from 'react-redux'
//容器连接
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add)
Add 为组件
```

 

## createStore 

创建一个 Redux [store](http://www.redux.org.cn/docs/api/Store.html) 来以存放应用中所有的 state。

查看源码的开始部分，我们发现**createStore**可以传入两个三个参数：

function createStore(reducer, preloadedState, enhancer) 

其中第一个参数**reducer** 是必须要传递的而且必须是一个函数，不然Redux回报一场



如果传递了第二个参数**preloadedState**，而且第二个参数不是一个**function** , 则将**preloadedState** 保存在内部变量**currentState**中， 也就是我们给**State** 的默认状态

如果**preloadedState** 是一个function,这可以是插入中间件 ， 则将preloadedState 赋值给**enhancer**

示例

```
// 创建store实例
let store = createStore(
    //判断是否有相同的 reducers
      combineReducers(
       {
        ...reducers
       }
    ),
    applyMiddleware(...middleware)
)
```



# 用装饰器的方法替换react-redux

 ##  修饰器教程：https://www.jianshu.com/p/275bf41f45cf

## 用装饰器的方法替换react-redux https://www.jianshu.com/p/02fb39a27acb



# redux-saga  教程文档https://redux-saga-in-chinese.js.org/

