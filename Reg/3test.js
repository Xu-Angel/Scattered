/* 3.5.1. 字符串 trim 方法模拟
trim 方法是去掉字符串的开头和结尾的空白符。有两种思路去做。
第一种，匹配到开头和结尾的空白符，然后替换成空字符。如： */

function trim(str) { return str.replace(/^\s+|\s+$/g, ''); } console.log(trim("  foobar   ")); // => "foobar"
// 第二种，匹配整个字符串，然后用引用来提取出相应的数据：
function trim(str) { return str.replace(/^\s*(.*?)\s*$/g, "$1"); } console.log(trim("  foobar   ")); // => "foobar"

//! 这里使用了惰性匹配 *?，不然也会匹配最后一个空格之前的所有空格的。当然，前者效率高。

// 3.5.2. 将每个单词的首字母转换为大写
function titleize(str) { return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) { return c.toUpperCase(); }); } console.log(titleize('my name is epeli')); // => "My Name Is Epeli"

// 思路是找到每个单词的首字母，当然这里不使用非捕获匹配也是可以的。

// 3.5.3. 驼峰化
function camelize(str) { return str.replace(/[-_\s]+(.)?/g, function (match, c) { return c ? c.toUpperCase() : ''; }); } console.log(camelize('-moz-transform')); // => "MozTransform
/* 
其中分组 (.) 表示首字母。单词的界定是，前面的字符可以是多个连字符、下划线以及空白符。正则后面 的 ? 的目的，是为了应对 str 尾部的字符可能不是单词字符，比如 str 是 '-moz-transform '。
*/

// 3.5.4. 中划线化
function dasherize (str) {     return str.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase(); } console.log( dasherize('MozTransform') ); // => "-moz-transform"
// 驼峰化的逆过程。
// 3.5.5. HTML 转义和反转义
// 将HTML特殊字符转换成等值的实体 
function escapeHTML(str) { var escapeChars = { '<': 'lt', '>': 'gt', '"': 'quot', '&': 'amp', '\'': '#39' }; return str.replace(new RegExp('[' + Object.keys(escapeChars).join('') + ']', 'g'), function (match) { return '&' + escapeChars[match] + ';'; }); } console.log(escapeHTML('<div>Blah blah blah</div>')); // => "&lt;div&gt;Blah blah blah&lt;/div&gt";

// 其中使用了用构造函数生成的正则，然后替换相应的格式就行了，这个跟本章没多大关系。
// 倒是它的逆过程，使用了括号，以便提供引用，也很简单，如下：

// 实体字符转换为等值的HTML。 
function unescapeHTML(str) { var htmlEntities = { nbsp: ' ', lt: '<', gt: '>', quot: '"', amp: '&', apos: '\'' }; return str.replace(/\&([^;]+);/g, function (match, key) { if (key in htmlEntities) { return htmlEntities[key]; } return match; }); } console.log(unescapeHTML('&lt;div&gt;Blah blah blah&lt;/div&gt;')); // => "<div>Blah blah blah</div>"

// 通过 key 获取相应的分组引用，然后作为对象的键。
// 3.5.6. 匹配成对标签
// 要求匹配：

{/* <title>regular expression</title> <p>laoyao bye bye</p>
不匹配：
<title>wrong!</p>
匹配一个开标签，可以使用正则 <[^>]+>，
匹配一个闭标签，可以使用 <\/[^>]+>，
但是要求匹配成对标签，那就需要使用反向引用，如： */}

var regex = /<([^>]+)>[\d\D]*<\/\1>/; var string1 = "<title>regular expression</title>"; var string2 = "<p>laoyao bye bye</p>"; var string3 = "<title>wrong!</p>"; console.log(regex.test(string1)); // true console.log( regex.test(string2) ); // true console.log( regex.test(string3) ); // false

// 其中开标签 <[\^>]+> 改成 <([^>]+)>，使用括号的目的是为了后面使用反向引用， 而提供分组。闭标签使用了反向引用，<\/\1>。
// 另外，[\d\D]的意思是，这个字符是数字或者不是数字，因此，也就是匹配任意字符的意思。
