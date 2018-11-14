let params = [4,'a',5,'b']
for( let i in params) {
if(params.hasOwnProperty(i)){
console.log(i)
}else{
  console.log(i,'555')
}}

const yObj = {y: 7, tt: 88, ii: 99}
const mObj = {...yObj}  
console.log(mObj)  // 全部拿来
const { y, ...jObj} = yObj
console.log(jObj)   // 拿指定的一部分
[1,2].includes(1)
Array.includes()