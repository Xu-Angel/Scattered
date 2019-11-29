import fs from 'fs-promise'

async function printFiles () {
  const files = await getFilePaths() // Assume this works fine

  files.forEach(async (file) => {
    const contents = await fs.readFile(file, 'utf8')
    console.log(contents)
  })
}

printFiles()  // 显然 contents  是并行的结果，函数内的await被主线程多次触发一起等待回调。也就是说async彼此间不会await，要都写在一个函数内部。

let array = [0,1,2,3,4,5];
(async ()=>{
  array.forEach(function(item){
    console.log(item);
    await wait(1000);//这是错误的写法
  });
})();
//因await只能用于 async 声明的函数上下文中, 故不能写在forEach内.下面我们来看正确的写法
(async ()=>{
  for(let i=0,len=array.length;i<len;i++){
    console.log(array[i]);
    await wait(1000);
  }
})();


// 1. 
async function printFiles () {
  const files = await getFilePaths();

  for (const file of files) {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }
}

// 2. 
async function printFiles () {
  const files = await getFilePaths();

  await Promise.all(files.map(async (file) => {
    const contents = await fs.readFile(file, 'utf8')
    console.log(contents)
  }));
}

// ---
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function test () {
  var nums = await getNumbers()
  asyncForEach(nums, async x => {
    var res = await multi(x)
    console.log(res)
  })
}

// https://segmentfault.com/q/1010000009190129
// https://imweb.io/topic/5b3b7d624d378e703a4f4437
// https://github.com/babel/babel/issues/909
// why
Array.prototype.forEach = function (callback) {
  // this represents our array
  for (let index = 0; index < this.length; index++) {
    // We call the callback for each entry
    callback(this[index], index, this)
  }
}
// 相当于 for 循环执行了这个异步函数，所以是并行执行。
