import React from 'react';
import './App.css';

function toast(message) {
  alert(message)
}

function setUserName(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({data: `userName is ${name}`})
      } else {
        reject(new Error('接口错误啦~'))
      }
    }, 200)
  })
}



// function sayAge(target, name, descriptor) {
//   let sayName = descriptor.value;
//   descriptor.value = function() {
//     sayName.apply(this);
//     console.log('age: 12');
//   }
// }

// class Cat {
//   name = 'vince'
//   @sayAge
//   sayName() {
//     console.log(this.name)
//   }
// }

function operateToast(successInfo = '操作成功', errorInfo = '操作失败，请重试') {
  console.log('operateToast')
  return function (target, key, descriptor) {
    const originFunc = descriptor.value;
  
    descriptor.value = function() {
      return originFunc.apply(this, arguments).then(res => {
        toast(successInfo)
        return res
      }).catch(err => {
        toast(errorInfo)
        throw err
      })
    }
    return descriptor
  }
}

function logTime(apiId) {
  console.log('logTime')
  return function(target, key, descriptor) {
    const originFunc = descriptor.value;
    descriptor.value = function() {
      const startTime = new Date().valueOf();
      return originFunc.apply(this, arguments).then(res => {
        console.log('222')
        const endTime = new Date().valueOf();
        const spendTime = endTime - startTime;
        console.log('apiId: ',apiId);
        console.log('spendTime: ', spendTime)
        // 向后台发送一些数据监控
        // logApi.logData(apiName, spendTime);
        return res;
      }).catch((err) => {
        const endTime = new Date().valueOf();
        const spendTime = endTime - startTime;
        console.log('apiId: ',apiId);
        console.log('spendTime: ', spendTime)
        throw err
      })
    }
    return descriptor
  }
}

function retryFunc(counts, times) {
  console.log('retryFunc')
  return function(target, name, descriptor) {
    const originFunc = descriptor.value;
    descriptor.value = function() {
      let count = 1;
      return new Promise((resolve, reject) => {
          const retry = () => {
              console.log('开始请求')
              return originFunc().then(res => {
                  resolve(res);
              }).catch(() => {
                  count++;
                  if (count > counts) {
                      reject(new Error('多次请求错误，请稍后再试'));
                      return;
                  }
                  console.log(`请求失败，第${count}次重试`)
                  setTimeout(() => {
                      retry();
                  }, times)
              })
          }
          retry();
      })
    }
    return descriptor
  }
}

class UserApi {
  // @operateToast
  @logTime('ididid')
  @operateToast('设置用户名称成功', '后端太垃圾了，设置用户名称接口挂了')
  @retryFunc(3, 1000)
  static setUserName(name) {
    return setUserName(name)
  }

  // @operateToast('设置用户年龄成功', '后端太垃圾了，接口又挂了')
  // static setUserAge(age) {
  //   return setUserAge(age)
  // }
}

function updateable(isUpdateable) {
  return function(target) {
    target.isUpdateable = isUpdateable;
  }
}

function testDecorator(target, name, descriptor) {
  // console.log(target)
  // console.log(name)
  // console.log(descriptor)
}

@updateable(true)
class DesignerApi {

  @testDecorator
  name = 'vince'

  @testDecorator
  getUserDate() {
    console.log('xxx')
  }
}

class App extends React.Component {
  componentDidMount() {
    // let catA = new Cat();
    // catA.sayName();
    UserApi.setUserName('vince').then(res => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    // console.log(UserApi.xxx)
    // console.log(DesignerApi.isUpdateable)
  }

  render() {
    return (
      <div>es7 装饰器</div>
    )
  }
}


export default App;