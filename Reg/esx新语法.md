https://github.com/veedrin/horseshoe/blob/master/

## 分组

| 量词 | 含义 |
| ------ | ------ |
| (?:x) | 匹配x,但不记录匹配结果 |
| x(?=y) | 当x后面接y时匹配x |
| x(?!y) | 当x后面不是y时匹配x |

## 捕获组与非捕获组

我们已经知道量词是怎么回事了，我们也知道量词只能重复紧贴在它前面的字符。

如果我要重复的是一串字符呢？

```javascript
'i love you very very very much'.match(/i love you very +much/);
// null
'i love you very very very much'.match(/i love you v+e+r+y+ +much/);
// null
```

这样肯定是不行的。是时候请圆括号出山了。

```javascript
'i love you very very very much'.match(/i love you (very )+much/);
// ["i love you very very very much", "very ", index: 0, input: "i love you very very very much", groups: undefined]
```

圆括号的意思是将它其中的字符集合打包成一个整体，然后量词就可以操作这个整体了。这和方括号的效果是完全不一样的。

而且默认的，圆括号的匹配结果是可以捕获的。

#### 正则内捕获

现在我们有一个需求，匹配`<div>`标签。

```javascript
'<div>hello regex</div>'.match(/<div>.*<\/div>/);
// ["<div>hello regex</div>", index: 0, input: "<div>hello regex</div>", groups: undefined]
```

这很简单。但如果我要匹配的是任意标签，包括自定义的标签呢？

```javascript
'<App>hello regex</App>'.match(/<([a-zA-Z]+)>.*<\/\1>/);
// ["<App>hello regex</App>", "App", index: 0, input: "<App>hello regex</App>", groups: undefined]
```

这时候就要用到正则的捕获特性。正则内捕获使用`\数字`的形式，分别对应前面的圆括号捕获的内容。这种捕获的引用也叫**反向引用**。

我们来看一个更复杂的情况：

```javascript
'<App>hello regex</App><p>A</p><p>hello regex</p>'.match(/<((A|a)pp)>(hello regex)+<\/\1><p>\2<\/p><p>\3<\/p>/);
// ["<App>hello regex</App><p>A</p><p>hello regex</p>", "App", "A", "hello regex", index: 0, input: "<App>hello regex</App><p>A</p><p>hello regex</p>", groups: undefined]
```

如果有嵌套的圆括号，那么捕获的引用是先递归的，然后才是下一个顶级捕获。

#### 正则外捕获

```javascript
'@abc'.match(/@(abc)/);
// ["@abc", "abc", index: 0, input: "@abc", groups: undefined]
RegExp.$1;
// "abc"
```

没错，`RegExp`就是构造正则的构造函数。如果有捕获组，它的实例属性`$数字`会显示对应的引用。

如果有多个正则呢？

```javascript
'@abc'.match(/@(abc)/);
// ["@abc", "abc", index: 0, input: "@abc", groups: undefined]
'@xyz'.match(/@(xyz)/);
// ["@xyz", "xyz", index: 0, input: "@xyz", groups: undefined]
RegExp.$1;
// "xyz"
```

`RegExp`构造函数的引用只显示最后一个正则的捕获。

另外还有一个字符串实例方法也支持正则捕获的引用，它就是`replace`方法。

```javascript
'hello **regex**'.replace(/\*{2}(.*)\*{2}/, '<strong>$1</strong>');
// "hello <strong>regex</strong>"
```

实际上它才是最常用的引用捕获的方式。

#### 捕获命名

> 这是ES2018的新特性。

使用`\数字`引用捕获必须保证捕获组的顺序不变。现在开发者可以给捕获组命名了，有了名字以后，引用起来更加确定。

```javascript
'<App>hello regex</App>'.match(/<(?<tag>[a-zA-Z]+)>.*<\/\k<tag>>/);
// ["<App>hello regex</App>", "App", index: 0, input: "<App>hello regex</App>", groups: {tag: "App"}]
```

在捕获组内部最前面加上`?<key>`，它就被命名了。使用`\k<key>`语法就可以引用已经命名的捕获组。

是不是很简单？

通常情况下，开发者只是想在正则中将某些字符当成一个整体看待。捕获组很棒，但是它做了额外的事情，肯定需要额外的内存占用和计算资源。于是正则又有了非捕获组的概念。

```javascript
'@abc'.match(/@(abc)/);
// ["@abc", "abc", index: 0, input: "@abc", groups: undefined]
'@abc'.match(/@(?:abc)/);
// ["@abc", index: 0, input: "@abc", groups: undefined]
```

只要在圆括号内最前面加上`?:`标识，就是告诉正则引擎：我只要这个整体，不需要它的引用，你就别费劲了。从上面的例子也可以看出来，`match`方法返回的结果有些许不一样。

个人观点：我觉得正则的捕获设计应该反过来，默认不捕获，加上`?:`标识后才捕获。因为大多数时候开发者是不需要捕获的，但是它又懒得加`?:`标识，会有些许性能浪费。

## 零宽断言

正则中有一些元字符，它不匹配字符，而是匹配一个位置。比如之前提到的`^`和`$`。`^`的意思是说这个位置应该是文本开始的位置。

正则还有一些比较高级的匹配位置的语法，它匹配的是：在这个位置之前或之后应该有什么内容。

零宽(zero-width)是什么意思？指的就是它匹配一个位置，本身没有宽度。

断言(assertion)是什么意思？指的是一种判断，断言之前或之后应该有什么或应该没有什么。

#### 零宽肯定先行断言

所谓的肯定就是判断有什么，而不是判断没有什么。

而先行指的是向前看(lookahead)，断言的这个位置是为前面的规则服务的。

语法很简单：圆括号内最左边加上`?=`标识。

```javascript
'CoffeeScript JavaScript javascript'.match(/\b\w{4}(?=Script\b)/);
// ["Java", index: 13, input: "CoffeeScript JavaScript javascript", groups: undefined]
```

上面匹配的是四个字母，这四个字母要满足以下条件：紧跟着的应该是`Script`字符串，而且`Script`字符串应该是单词的结尾部分。

所以，零宽肯定先行断言的意思是：现在有一段正则语法，用这段语法去匹配给定的文本。但是，满足条件的文本不仅要匹配这段语法，紧跟着它的必须是一个位置，这个位置又必须满足一段正则语法。

说的再直白点，我要匹配一段文本，但是这段文本后面必须紧跟着另一段特定的文本。零宽肯定先行断言就是一个界碑，我要满足前面和后面所有的条件，但是我只要前面的文本。

我们来看另一种情况：

```javascript
'CoffeeScript JavaScript javascript'.match(/\b\w{4}(?=Script\b)\w+/);
// ["JavaScript", index: 13, input: "CoffeeScript JavaScript javascript", groups: undefined]
```

上面的例子更加直观，零宽肯定先行断言已经匹配过`Script`一次了，后面的`\w+`却还是能匹配`Script`成功，足以说明它的`零宽`特性。它为紧贴在它前面的规则服务，并且不影响后面的匹配规则。

#### 零宽肯定后行断言

先行是向前看，那后行就是向后看(lookbehind)咯。

语法是圆括号内最左边加上`?<=`标识。

```javascript
'演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<=演员)霍\S+/);
// ["霍思燕", index: 14, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
```

一个正则可以有多个断言：

```javascript
'演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<=演员)霍.+?(?=\s|$)/);
// ["霍思燕", index: 14, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
```

#### 零宽否定先行断言

肯定是判断有什么，否定就是判断没有什么咯。

语法是圆括号内最左边加上`?!`标识。

```javascript
'TypeScript Perl JavaScript'.match(/\b\w{4}(?!Script\b)/);
// ["Perl", index: 11, input: "TypeScript Perl JavaScript", groups: undefined]
```

#### 零宽否定后行断言

语法是圆括号最左边加上`?<!`标识。

```javascript
'演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<!演员)霍\S+/);
// ["霍去病", index: 8, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
```

## 修饰符

#### y修饰符

> 这是ES2015的新特性。

`y`是`sticky`的缩写。`y`修饰符有和`g`修饰符重合的功能，它们都是全局匹配。所以重点在`sticky`上，怎么理解这个`粘连`呢？

`g`修饰符不挑食，匹配完一个接着匹配下一个，对于文本的位置没有要求。但是`y`修饰符要求必须从文本的开始实施匹配，因为它会开启全局匹配，匹配到的文本的下一个字符就是下一次文本的开始。这就是所谓的粘连。

```javascript
'a bag with a tag has a mag'.match(/\wag/g);
// ["bag", "tag", "mag"]
'a bag with a tag has a mag'.match(/\wag/y);
// null
'bagtagmag'.match(/\wag/y);
// ["bag", index: 0, input: "bagtagmag", groups: undefined]
'bagtagmag'.match(/\wag/gy);
// ["bag", "tag", "mag"]
```

有人肯定发现了猫腻：你不是说`y`修饰符是全局匹配么？看上面的例子，单独一个`y`修饰符用match方法怎么并不是全局匹配呢？

诶，这里说来就话长了。

长话短说呢，就涉及到`y`修饰符的本质是什么。它的本质有二：

- 全局匹配(先别着急打我)。
- 从文本的`lastIndex`位置开始新的匹配。lastIndex是什么？它是正则表达式的一个属性，如果是全局匹配，它用来标注下一次匹配的起始点。这才是粘连的本质所在。

不知道你们发现什么了没有：**lastIndex是正则表达式的一个属性**。而上面例子中的match方法是作用在字符串上的，都没有lastIndex属性，休怪人家工作不上心。

```javascript
const reg = /\wag/y;
reg.exec('bagtagmag');
// ["bag", index: 0, input: "bagtagmag", groups: undefined]
reg.exec('bagtagmag');
// ["tag", index: 3, input: "bagtagmag", groups: undefined]
reg.exec('bagtagmag');
// ["mag", index: 6, input: "bagtagmag", groups: undefined]
```

咱们换成正则方法exec，多次执行，正则的lastIndex在变，匹配的结果也在变。全局匹配无疑了吧。

#### s修饰符

> 这是ES2018的新特性。

`s`不是`dotAll`的缩写。`s`修饰符要和`.`搭配使用，默认情况下，`.`匹配除了换行符之外的任意单个字符，然而它还没有强大到无所不能的地步，所以正则索性给它开个挂。

`s`修饰符的作用就是让`.`可以匹配任意单个字符。

`s`是`singleline`的缩写。

```javascript
`
abc
xyz
`.match(/c.x/);
// null
`
abc
xyz
`.match(/c.x/s);
// ["c↵x", index: 3, input: "↵abc↵xyz↵", groups: undefined]
```

#### u修饰符

> 这是ES2015的新特性。

`u`是`unicode`的缩写。有一些Unicode字符超过一个字节，正则就无法正确的识别它们。`u`修饰符就是用来处理这些不常见的情况的。

```javascript
'𠮷'.match(/^.$/);
// null
'𠮷'.match(/^.$/u);
// ["𠮷", index: 0, input: "𠮷", groups: undefined]
```

`𠮷`念`jí`，与`吉`同义。

## 修改字符串方法的底层实现

我们也看到了，一部分处理正则的方法定义在String实例上，一部分处理正则的方法定义在RegExp实例上。为了将处理正则的方法全部统一到RegExp实例上，ES2015修改了部分字符串方法的底层实现。

具体来说，ES2015为RegExp实例新增了四个方法，字符串方法`match`、`replace`、`search`、`split`内部调用已经改成了相应的RegExp实例方法。

```javascript
RegExp.prototype[Symbol.match]
RegExp.prototype[Symbol.replace]
RegExp.prototype[Symbol.search]
RegExp.prototype[Symbol.split]
```

`Symbol.match`是什么？`Symbol`是新增的一种基础数据类型，它有11个内置的值，指向语言内部使用的方法。

`RegExp.prototype[Symbol.match]`在使用上和`match`相比，调用者和参数翻转一下就可以了。

```javascript
'abc-mno-xyz'.match(/mno/);
// ["mno", index: 4, input: "abc-mno-xyz", groups: undefined]
/mno/[Symbol.match]('abc-mno-xyz');
// ["mno", index: 4, input: "abc-mno-xyz", groups: undefined]
```
