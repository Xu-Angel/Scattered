/* TODO:获取对象长度 */
/* var obj = {"c1":1,"c2":2};
function countProperties(obj){
　　var count = 0;
    for(var property in obj){
        if(obj.hasOwnProperty(property)){
            count++;
        }
    }
    return count;
}
//TODO:Object.keys()
var len = countProperties(obj);
console.log(len);//结果为2
var obj2 = {"c1":1,"c2":2};
 var arr = Object.keys(obj);
 var len = arr.length;
 console.log(len);//结果为2  */

 /*TODO:用另一个对象替换当前对象，接收两个参数，第一个参数表示需要绑定的this变量，第二个参数是数组，表示函数本身的参数 var xiaoming = {
    "name":"xiaoming",
     "birth":1990,
     "age":function(){
            var y = new Date().getFullYear();
            return y - this.birth ;
    }
}
var fn = xiaoming.age;
alert(fn.apply(xiaoming,[]));    //26
alert(fn());//NaN
//变量fn获取到age对应的函数，此时函数中的this指向window,故fn()返回NaN，调用apply使fn中的this指向xiaoming，故返回26
  */