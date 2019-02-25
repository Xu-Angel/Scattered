const helper = {
  randomArray(n, rangeL, rangeR){
      let arr = [];
      for(let i = 0; i < n; i++){
          arr[i] = Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL;
      }
      return arr;
  },
  //测试算法的性能
  testSort(sortName, sortFn, arr){
      let startTime = Date.now();
      sortFn(arr);
      let endTime = Date.now();
      if(!this.isSorted(arr)){
          throw new Error('未排序！');
      }
      console.log(`${sortName}执行时间: ${ endTime - startTime }ms`);
  },
  //判断数组是否已经排序好
  isSorted(arr){
      for(let i = 0, len = arr.length; i < len; i++){
          if(arr[i] > arr[i + 1]){
              return false;
          }
      }
      return true;
  }
}

function selectionSort(arr) {
  let minIndex,
      temp;
  for(let i = 0, len = arr.length; i < len; i++){
      minIndex = i;
      for(let j = i + 1; j < len; j++){
          if(arr[j] < arr[minIndex]){
              minIndex = j;
          }
      }
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
  }
  return arr;
}

//测试算法的性能
helper.testSort('selectionSort', selectionSort, helper.randomArray(10000, 0, 10000));