// 作为一种典型的分而治之思想的算法应用，归并排序的实现由两种方法：

// 1.自上而下的递归（所有递归的方法都可以用迭代重写，所以就有了第2种方法）
// 2.自下而上的迭代

// 这里使用尾递归调用
// ES6的尾递归优化只在严格模式下才会开启。
// 正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
// func.arguments：返回调用时函数的参数。
// func.caller：返回调用当前函数的那个函数。
// 尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。
// 始终都是O(n log n）的时间复杂度。代价是需要额外的内存空间

function mergeSort(arr) {

let len = arr.length;
if (len < 2) {
    return arr;
  }
  

let middle = Math.floor(len/2);
let left = arr.slice(0, middle);
let right = arr.slice(middle);
return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {

let result = [];

while (left.length && right.length) {
    if (left[0] <= right[0]) {
        result.push(left.shift());
    } else {
        result.push(right.shift());
    }
}

while (left.length) {
    result.push(left.shift());
}
while (right.length) {
    result.push(right.shift());
}
return result
}

const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
console.log(mergeSort(arr));