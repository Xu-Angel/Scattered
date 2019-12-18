// input $_

var re = /hi/g;
re.test('hi there!');
RegExp.input;         // "hi there!"
re.test('foo');       // new test, non-matching
RegExp.$_;            // "hi there!"
re.test('hi world!'); // new test, matching
RegExp.$_;            // "hi world!"

// $n
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
str.replace(re, '$2, $1'); // "Smith, John"
RegExp.$1; // "John"
RegExp.$2; // "Smith"

// $& lastMatch
var re = /(\w+)\s(\w+)/;
var str = 'John Smith---88';
str.replace(re, '$2, $1');
console.log(1 + RegExp.$_, 4 + RegExp['$&'])
// 1John Smith---88 4John Smith

// lastParen (最近一次圆括号) 匹配出的
var re = /(\w+)\s(\w+)/;
var str = 'John Smith---88';
str.replace(re, '$2, $1');
console.log(1 + RegExp.$_, 3 +  RegExp['$+'], 4 + RegExp['$&'])
// 1John Smith---88 3Smith 4John Smith

// leftContext lastMatch 之前的文本 $`
// rightContext lastMatch 之后的文本 $'
var re = /(\w+)\s(\w+)/;
var str = '9090-John Smith---88';
str.replace(re, '$2, $1');
console.log(1 + RegExp.$_,2 + RegExp['$`'], 3 +  RegExp['$+'], 4 + RegExp['$&'], 5 + RegExp["$'"])
// 19090-John Smith---88 29090- 3Smith 4John Smith 5---88