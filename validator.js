const VALID_TYPES = ['text', 'number', 'email', 'url', 'tel', 'date', 'time']
console.log( VALID_TYPES.indexOf('text') > -1)
// VUE 组件中 若value为属性动态值  则可以嘿嘿    相关布尔值的 可以常思考 -1
let value = 'number'
let bo = {
  validator: value => VALID_TYPES.indexOf(value) > -1
}
console.log(bo.validator)