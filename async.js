function al(t){
  console.log(t)
}
/* const asy=async function(){
  await al(2);
  await al(3)
  return 888
  throw new Error('ao')
}
asy().then(v => {console.log(v);},e =>{console.log(e);}); */

/* async function f( ){
  try{
   await setTimeout(() => {
      console.log('dd');
    },3500)
    console.log(555);
    await Promise.reject('error')
  }catch(e){
console.log(e);
  }
  await al(9)
  await al(9)
  await al(9)
  return await Promise.resolve('hello')
}
f().then( v =>{console.log(v,22);}) */
// 一个异步操作
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 5000);

