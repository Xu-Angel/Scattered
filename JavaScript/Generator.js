//es6 Generator
//普通函数中不适用yield
function* fn(){
    yield "起床";
    yield "刷牙";
    yield "吃饭";
    return "去泡妞";
}

var newFn = fn();
console.log(newFn.next());
console.log(newFn.next());
console.log(newFn.next());
console.log(newFn.next());


function *aa(x){
    var y = 2*(yield (x+2));//y=2
    var z = yield (y/2);//z=7
    return x+y+z;
}

var newAa = aa(4);
console.log(newAa.next(1));//6
// console.log(newAa.next(7));//7
console.log(newAa.next(20));//20
console.log(newAa.next());//NaN






function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  
  var hw = helloWorldGenerator();
  console.log(hw.next());
  console.log(hw.next());
  console.log(hw.next());
  function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
  }
  //用for of 来自动执行
  for (let v of foo()) {
    console.log(v);
  }
  //next()方法带的参数
  /* function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
  }
  
  var a = foo(5);
  a.next() // Object{value:6, done:false}
  a.next() // Object{value:NaN, done:false}
  a.next() // Object{value:NaN, done:true}
  
  var b = foo(5);
  b.next() // { value:6, done:false }
  b.next(12) // { value:8, done:false }
  b.next(13) // { value:42, done:true } 
  
  上面代码中，第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。
  
  如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。
  
  注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数
  
  yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
  
  */