惰性载入函数
假如你要写一个函数，里面有一些判断语句
function foo(){
    if(a != b){
        console.log('aaa')
    }else{
        console.log('bbb')
    }
}
复制代码如果你的a和b是不变的，那么这个函数不论执行多少次，结果都是不变的，但是每次执行还要进行if判断，这就造成了不必要的浪费。
惰性载入表示函数执行的分支只会发生一次，这里有两种解决方式。
在函数被调用时再处理函数
function foo(){
    if(a != b){
        foo = function(){
            console.log('aaa')
        }
    }else{
        foo = function(){
            console.log('bbb')
        }
    }
    return foo();
}
复制代码这样进入每个分支后都会对foo进行赋值，覆盖了之前的函数，之后每次调用foo就不会再执行if判断
在声明函数时就指定适当的函数
var foo = (function foo(){
    if(a != b){
        return function(){
            console.log('aaa')
        }
    }else{
        return function(){
            console.log('bbb')
        }
    }
})();
复制代码这里创建一个匿名，自执行的函数，用来确定应该使用哪一个函数来实现。

惰性函数的优点就是只在第一次执行分支时牺牲一点点性能


