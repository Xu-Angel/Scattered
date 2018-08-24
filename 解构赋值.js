let params = {
  type: '',
  one: '',
  two: '',
  three: ''
}
function strict (params = {}) {
     let data = {
       ...params
     }
}
data : data 
//!todo使用解构删除不必要属性
/* 
有时候你不希望保留某些对象属性，也许是因为它们包含敏感信息或仅仅是太大了（just too big）。你可能会枚举整个对象然后删除它们，但实际上只需要简单的将这些无用属性赋值给变量，然后把想要保留的有用部分作为剩余参数就可以了。
下面的代码里，我们希望删除_internal和tooBig参数。我们可以把它们赋值给internal和tooBig变量，然后在cleanObject中存储剩下的属性以备后用。 */
let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal:"secret", tooBig:{}, el2: '2', el3: '3'};

console.log(cleanObject);                         // {el1: '1', el2: '2', el3: '3'}

//!todo在函数参数中解构嵌套对象
//在下面的代码中，engine是对象car中嵌套的一个对象。如果我们对engine的vin属性感兴趣，使用解构赋值可以很轻松地得到它。
var car = {
  model: 'bmw 2018',
  engine: {
    v6: true,
    turbo: true,
    vin: 12345
  }
}
const modelAndVIN = ({model, engine: {vin}}) => {
  console.log(`model: ${model} vin: ${vin}`);
}
modelAndVIN(car); /// => model: bmw 2018  vin: 12345

//!todo使用解构删除不必要属性
/* 解构赋值是一种表达式，用于从数组或对象中快速提取属性值，并赋给定义的变量。

在代码简写方面，解构赋值能达到很好的效果。 */

const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');
const store = this.props.store;
const form = this.props.form;
const loading = this.props.loading;
const errors = this.props.errors;
const entity = this.props.entity;
//简写为：

import { observable, action, runInAction } from 'mobx';
const { store, form, loading, errors, entity } = this.props;
//甚至可以指定自己的变量名：

const { store, form, loading, errors, entity:contact } = this.props;