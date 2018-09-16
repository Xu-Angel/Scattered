/* 
!dodo import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。
 */
import ( './xxx.js')
.then(({export1, export2}) => {
  //....
})

/* 同时加载多个模块 */
Promise.all([
  import('./xxx.js'),
  import('./ppp.js'),
  import('./yyy.js')
]).then(([module1, module2, module3]) => {
  //...
})

/* 在async中 */

async function main () {
  const myModul = await import('./myModule.js')
  const {export1, export1} = await import('./myModule.js')
  const [module1, module2, module3] = 
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js')
    ])
}
main()