/*
过程与数据的结合是形容面向对象中的“对象”时经常使用的表达。对象以方法的形式包含了过程，而闭包则是在过程中以环境的形式包含了数据。通常用面向对象思想能实现的功能，用闭包也能实现。反之亦然。在JavaScript语言的祖先Scheme语言中，甚至都没有提供面向对象的原生设计，但可以使用闭包来实现一个完整的面向对象系统。
*/
// 闭包写法
var extent = function () {
    var value = 0;
    return {
        call: function () {
            value++;
            console.log(value);
        }
    };
};
var s = extent();
s.call();
s.call();
s.call();
// 面向对象写法
var extend = {
    value: 0,
    call: function () {
        this.value++;
        console.log(this.value);
    }
};
extend.call();
extend.call();
extend.call();
var Extend = function () {
    this.value = 0;
};
Extend.prototype.call = function () {
    this.value++;
    console.log(this.value);
};
var e = new Extend();
e.call();
e.call();
e.call(s);
