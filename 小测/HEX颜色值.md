
>https://github.com/zhangxinxu/quiz/issues/48

题目1,3测试见：http://quiz.xiliz.com/qunit39.html
2. 优秀回答参考XboxYan。
常见错误算法：取范围的时候，依次取对应位数的范围，举例：'100' 和 '001' 之间范围的值，如果是错误算法，055是不可能取到的。而且'000'并不在范围之内，所以这是严重错误的算法。
常见错误2：没有补0，已经在代码那里备注了。
HEX色值本质上是16进制的颜色表示方法。所以，如果我们要比对，可以转成10进制，如果要把数值变成HEX色值，直接转16进制就可以。JS自带很多方法，例如(200).toString(16) -> 'c8'，注意前面补0，可以使用ES6 padStart()方法。
代码不精简没关系，算法小白也没关系，运行正确才是首位的。

```js
//1.
function colorPad(color) {
    var reg = /^#?([0-9a-f]{1,3}|[0-9a-f]{6})$/i;
    if (reg.test(color)) {
        return color.replace(reg, function (all, $1) {
            var hex = '';
            if ($1.length === 3) {
                hex = $1.split('').map(function (el) {
                    return el.repeat(2);
                }).join('')
            } else {
                hex = $1.repeat(6 / $1.length);
            }
            return '#' + hex.toLowerCase();
        })
    } else {
        return '#000000'
    }
}

colorPad('0')
colorPad('3')
colorPad('#0')
colorPad('#3')
colorPad('#f1')
colorPad('#f1f')
colorPad('#f1f1F2')
colorPad('f1f1F2')
colorPad('#m1f1F2')
colorPad('#f1f1f26')

//2.
function colorRadom() {
    return '#' + (~~(Math.random() * 0xffffff)).toString(16).padStart(6,'0');
}

colorRadom();

//3.
// Q版的我：xboxyan的随机函数不会出现最大的值
function colorRange(a, b) {
    var color1 = colorPad(a);
    var color2 = colorPad(b);
    var min = parseInt((color1 > color2 ? color2 : color1).slice(1), 16);
    var max = parseInt((color1 > color2 ? color1 : color2).slice(1), 16);
    return '#' + (min + ~~(Math.random() * (max - min))).toString(16).padStart(6,'0');
}

colorRange('#211', '#2f2333');
```