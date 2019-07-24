# -

>https://github.com/zhangxinxu/quiz/issues/29

- toFixed有两个问题，一是兼容性，二是四舍五入不符合正常的四舍五入认知。金钱计算的时候容易出问题，必须两位小数。
- 应该返回字符串；补全末尾的0。
- 机智是实现：方式一：替换小数点保留精度后面一位5为6，方式二：给小数点保留精度后面补一位小数。其中方式2是最简单的，XboxYan 和 frankyeyq 实现都有bug，下面是调整后的实现。
```js
var oldtoFixed = Number.prototype.toFixed
Number.prototype.toFixed = function(digits){
    var length = (parseFloat(this) + '').replace(/^\d+\.?/, '').length;
    var len = length > digits ? length : digits;
    var number = Number(this) + Math.pow(10, -len-1);
    return oldtoFixed.call(number, digits);
}
```