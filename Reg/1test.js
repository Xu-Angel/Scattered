/* 1.5.1. -  匹配 16 进制颜色值
要求匹配：
#ffbbad #Fc01DF #FFF #ffE
分析：
表示一个 16 进制字符，可以用字符组 [0-9a-fA-F]。
其中字符可以出现 3 或 6 次，需要是用量词和分支结构。
使用分支结构时，需要注意顺序。
正则如下： */
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
var string = "#ffbbad #Fc01DF #FFF #ffE";
console.log(string.match(regex)); // => ["#ffbbad", "#Fc01DF", "#FFF", "#ffE"]

/* 1.5.2. 匹配时间
以 24 小时制为例。
要求匹配：
23:59 02:07
分析：
共 4 位数字，第一位数字可以为 [0-2]。
当第 1 位为 "2" 时，第 2 位可以为 [0-3]，其他情况时，第 2 位为 [0-9]。
第 3 位数字为 [0-5]，第4位为 [0-9]。
正则如下： */
var regex = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/; console.log(regex.test("23:59")); console.log(regex.test("02:07")); // => true // => true

// 如果也要求匹配 "7:9"，也就是说时分前面的 "0" 可以省略。
// 此时正则变成：
var regex = /^(0?[0-9]|1[0-9]|[2][0-3]):(0?[0-9]|[1-5][0-9])$/; console.log( regex.test("23:59") ); console.log( regex.test("02:07") ); console.log( regex.test("7:9") ); // => true // => true // => true

/* 1.5.3. 匹配日期
比如 yyyy-mm-dd 格式为例。
要求匹配：
2017-06-10
分析：
年，四位数字即可，可用 [0-9]{4}。
月，共 12 个月，分两种情况 "01"、"02"、…、"09" 和 "10"、"11"、"12"，可用 (0[1-9]|1[0-2])。
日，最大 31 天，可用 (0[1-9]|[12][0-9]|3[01])。
JavaScript 正则表达式迷你书
1. 第一章 正则表达式字符匹配攻略 | 第 13 页
正则如下： */
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/; console.log( regex.test("2017-06-10") ); // => true

/* 1.5.4. window 操作系统文件路径
要求匹配：
F:\study\javascript\regex\regular expression.pdf F:\study\javascript\regex\ F:\study\javascript F:\
分析：
整体模式是:
盘符:\文件夹\文件夹\文件夹\
其中匹配 "F:\"，需要使用 [a-zA-Z]:\\，其中盘符不区分大小写，注意 \ 字符需要转义。
文件名或者文件夹名，不能包含一些特殊字符，此时我们需要排除字符组 [^\\:*<>|"?\r\n/] 来表示合法 字符。
另外它们的名字不能为空名，至少有一个字符，也就是要使用量词 +。因此匹配 文件夹\，可用 [^\\:*<>|"?\r\n/]+\\。
另外 文件夹\，可以出现任意次。也就是 ([^\\:*<>|"?\r\n/]+\\)*。其中括号表示其内部正则是一个整
JavaScript 正则表达式迷你书
1. 第一章 正则表达式字符匹配攻略 | 第 14 页
体。具体详细请参考第三章。
路径的最后一部分可以是 文件夹，没有 \，因此需要添加 ([^\\:*<>|"?\r\n/]+)?。
最后拼接成了一个看起来比较复杂的正则： */
var regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/; console.log( regex.test("F:\\study\\javascript\\regex\\regular expression.pdf") ); console.log( regex.test("F:\\study\\javascript\\regex\\") ); console.log( regex.test("F:\\study\\javascript") ); console.log( regex.test("F:\\") ); // => true // => true // => true // => true
{/* 其中，在JavaScript 中字符串要表示字符 \ 时，也需要转义 */}

/* 1.5.5. 匹配 id
要求从
<div id="container" class="main"></div>
提取出 id="container"。
可能最开始想到的正则是：
var regex = /id=".*"/ var string = '<div id="container" class="main"></div>'; console.log(string.match(regex)[0]); // => id="container" class="main"
其可视化形式：
JavaScript 正则表达式迷你书
1. 第一章 正则表达式字符匹配攻略 | 第 15 页
因为 . 是通配符，本身就匹配双引号的，而量词 * 又是贪婪的，当遇到 container 后面双引号时，是不会 停下来，会继续匹配，直到遇到最后一个双引号为止。
解决之道，可以使用惰性匹配：
var regex = /id=".*?"/ var string = '<div id="container" class="main"></div>'; console.log(string.match(regex)[0]); // => id="container"
当然，这样也会有个问题。效率比较低，因为其匹配原理会涉及到“回溯”这个概念（这里也只是顺便提一 下，第四章会详细说明）。可以优化如下： */
var regex = /id="[^"]*"/; var string = '<div id="container" class="main"></div>'; console.log(string.match(regex)[0]); // => id="container
