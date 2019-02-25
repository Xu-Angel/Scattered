/*
    O(nlogn)
    无序数组，近乎有序的数组，重复值很多的数组对于堆排序影响不大
    堆排序与归并排序，快排相比要略慢一点，堆排序主要用在动态数据
*/


function MaxHeap(){
  this.data = []; //存储的内容是从索引1开始的
  this.count = 0; 
}

MaxHeap.prototype.swap = function(arr, i, j){
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

MaxHeap.prototype.size = function(){
  return this.count;
};

MaxHeap.prototype.isEmpty = function(){
  return this.count === 0;
};

MaxHeap.prototype.insert = function(item){ //insert的时候主要堆的定义不能被破坏就行
  this.data[this.count + 1] = item;
  this.count++;
  this.shiftUp(this.count); //新加入的元素大小不确定，有可能破坏堆的定义
};

//尝试将 索引为k的元素 向上移动
MaxHeap.prototype.shiftUp = function(k){
  while(k > 1 && this.data[Math.floor(k / 2)] < this.data[k]){
      this.swap(this.data, k, Math.floor(k / 2));
      k = Math.floor(k / 2);
  };
};

MaxHeap.prototype.shiftDown = function(k){
  while(2 * k <= this.count){ //2 * k < this.count说明该结点存在孩子
      let j = 2 * k;
      if(j + 1 <= this.count && this.data[j + 1] > this.data[j]){
          j += 1;
      }
      if(this.data[k] >= this.data[j]){
          break;
      }
      this.swap(this.data, k, j);
      k = j;
  }
};

//从堆中取出一个元素，只能取出根节点的元素。对于最大堆来说，取出的就是优先级最大的元素，然后用最后一个元素放到根元素的位置，
//保证堆还是一颗完全二叉树，但此时不再是最大堆，需比较替换，就是shiftDown的过程了
MaxHeap.prototype.extractMax = function(){
  if(this.count > 0){
      let res = this.data[1];
      this.swap(this.data, 1, this.count);
      this.count--;
      this.shiftDown(1);
      return res;
  }else{
      throw new Error('堆为空!');
  }
};

/* DO  */

function heapSort(arr){
    let maxHeap = new MaxHeap(); 
    // for(let i = 0, len = arr.length; i < len; i++){
    //     // maxHeap.insert(arr[i]); 这里将数组中的元素一个一个插入到堆中，实际上有更好的方法
    // }
    for(let i = arr.length - 1; i >= 0; i--){
        arr[i] = maxHeap.extractMax();
    }
    return arr;
}   

let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

console.log(heapSort(arr));