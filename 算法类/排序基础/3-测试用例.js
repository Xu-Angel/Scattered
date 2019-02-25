/*
    随机生成算法测试用例
    生成有n个元素的随机数组，每个元素的范围为[L,R]。
    注意是前闭后闭的区间范围  
*/
const randomArray = function randomArray(n, rangeL, rangeR) {
    let arr = [];
    for(let i = 0; i < n; i++){
        arr[i] = Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL;
    }
    return arr;
  }

function swap(array, t1, t2){
    let temp = array[t1];
    array[t1] = array[t2];
    array[t2] = temp;
}

function selectionSort(arr){
    let minIndex;
    for(let i = 0, len = arr.length; i < len; i++){
        minIndex = i;
        for(let j = i + 1; j < len; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        swap(arr, i, minIndex);
    }
    return arr;
}

console.log(selectionSort(randomArray(100, 0, 100)));