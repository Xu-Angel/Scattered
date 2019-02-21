/* 
导入内置
*/

var _ = {
  faltten: require('lodash/flatten'),
  bind: require('lodash/bind'),
  forEach: require('lodash/forEach')
}
console.log(_)

/* 
check if string is HTML
*/

const isHtml = (str: string): boolean => {
  if(str.charAt(0) === '<' && str.charAt(str.length - 1) === '>' && str.length >= 3) return true
}