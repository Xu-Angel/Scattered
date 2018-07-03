setTimeout( () =>{
  console.log('A')
}, 4)

new Promise((resolve,reject) =>{
  console.log('B')
 
    console.log('C')
 
   reject()
}).then(
    console.log('success')
)
new Promise((resolve, reject) => {
  reject(7);
  console.log(2);
}).then(r => {
  console.log(r);
}).catch(r => {
  console.log(r,22)
});