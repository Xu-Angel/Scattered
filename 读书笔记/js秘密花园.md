# t

主要是`ES5`之前的内容，需要确定这个前提。

## 对象

### 你是对象

一个常见的误解是数字的字面值（`literal`）不能当作对象使用。这是因为 `JavaScript` 解析器的一个错误，它试图将点操作符解析为浮点数字面值的一部分。

```js
2.toString();//
```

让解析器知道它是对象

```js
2..toString();//第二个点号可以正常解析
2.toString();//注意点号前面的空格
(2).toString();//2先被计算
```

### 对象属性

- 访问

  有两种方式来访问对象的属性，点操作符或者中括号操作符。两种语法是等价的，但是中括号操作符在下面两种情况下依然有效
  - 动态设置属性
  - 属性名不是一个有效的变量名（比如属性名中包含空格，或者属性名是`JavaScript`的关键词）

- 删除

  删除属性的唯一方法是使用`delete`操作符；设置属性为`undefined`或者`null`并不能真正的删除属性，而仅仅是移除了属性和值的关联。

- 名字

  ```js
  vartest={'case':'IamakeywordsoImustbenotatedasastring',delete:'Iamakeywordtoosome'//出错：SyntaxError };
  ```

  对象的属性名可以使用字符串或者普通字符声明。但是由于`JavaScript`解析器的另 一个错误设计，上面的第二种声明方式在`ECMAScript5`之前会抛出`SyntaxError`的错误。 这个错误的原因是`delete`是`JavaScrip`t语言的一个关键词；因此为了在更低版 本的`JavaScript`引擎下也能正常运行，必须使用字符串字面值声明方式。

### 原型

### 继承方式

简单的使用  `Bar.prototype = Foo.prototype`  将会导致两个对象共享相 同的原型。因此，改变任意一个对象的原型都会影响到另一个对象的原型，在大多 数情况下这不是希望的结果。

```js
function Foo() {    this.value = 42; }
Foo.prototype = {    method: function() {} };
function Bar() {}
// 设置Bar的prototype属性为Foo的实例对象
Bar.prototype = new Foo();
Bar.prototype.foo = 'Hello World';
// 修正Bar.prototype.constructor为Bar本身
Bar.prototype.constructor = Bar;
var test = new Bar() // 创建Bar的一个新实例

// 原型链
test [Bar的实例]
   Bar.prototype [Foo的实例]  
          { foo: 'Hello World' }  
                Foo.prototype
                    {method: ...};
                     Object.prototype
                        {toString: ... /* etc. */};
```

上面的例子中， `test`  对象从  `Bar.prototype`  和  `Foo.prototype`  继承下 来；因此， 它能访问  `Foo`  的原型方法  `method` 。同时，它也能够访问那个定义 在原型上的  `Foo`  实例属性  `value` 。 

需要注意的是  `new Bar()`  不会创造出一 个新的  `Foo`  实例，而是 重复使用它原型上的那个实例；因此，所有的  `Bar`  实 例都会共享相同的  `value`  属性。 

注意: 不要使用  `Bar.prototype = Foo` ，因为这不会执行  `Foo`  的原型，而是指 向函数  `Foo` 。 因此原型链将会回溯到  `Function.prototype`  而不是 `Foo.prototype` ，因此  `method`  将不会在 `Bar` 的原型链上。

### 原型属性

当原型属性用来创建原型链时，可以把任何类型的值赋给它（`prototype`）。然而 将原子类型赋给`prototype`的操作将会被忽略。下面例子只有`son`函数成功赋值

```js
function Foo() {};
Foo.prototype = 1;
Foo.prototype = 'o';
Foo.prototype = {'p': 'd'};
Foo.prototype = function son() {};
```

### 属性判断

为了判断一个对象是否包含自定义属性而不是原型链上的属性，我们需要使用继承 自`Object.prototype`的`hasOwnProperty`方法。`hasOwnProperty`是`JavaScript`中唯一一个处理属性但是不查找原型链的函数。

**`JavaScript`不会保护`hasOwnProperty`被非法占用，因此如果一个对象碰巧存在 这个属性，就需要使用外部的`hasOwnProperty`函数来获取正确的结果。**

## for in 遍历

和`in`操作符一样，`for in`循环同样在查找对象属性时遍历原型链上的所有属性。`**for in`循环不会遍历那些`enumerable`设置为`false`的属性**；比如数 组的`length`属性.

## 函数

函数是`JavaScript`中的一等对象，这意味着可以把函数像其它值一样传递。

### 声明

### 直接声明

```js
function foo(){}
```

上面的方法会在执行前被解析`(hoisted)`，因此它存在于当前上下文的任意一个地 方，即使在函数定义体的上面被调用也是对的。

```js
foo();//正常运行，因为foo在代码运行前已经被创建
functionfoo(){}
```

### 函数赋值表达式

```js
var foo = function() {};
```

这个例子把一个匿名的函数赋值给变量  `foo` 。

```js
foo; // 'undefined'
foo(); // 出错：TypeError
var foo = function() {};
```

由于 `var` 定义了一个声明语句，对变量 `foo` 的解析是在代码运行之前，因此 `foo`  变量在代码运行时已经被定义过了。 但是由于赋值语句只在运行时执行，因此在相应代码执行之前，`foo`的值为 `undefined`。

### 命名函数的赋值表达式

将命名函数赋值给一个变量的时候

```js
var foo = function bar() {
  bar(); // 正常运行
}
bar(); // 出错：ReferenceError
```

 `bar`  函数声明外是不可见的，这是因为我们已经把函数赋值给了  `foo` ； 然而在 `bar`  内部依然可见。这是由于 `JavaScript` 的 命名处理 所致， 函数名在函数内总 是可见的。 注意:`在IE8及IE8以下版本`浏览器`bar`在外部也是可见的，是因为浏览器对命名函数 赋值表达式进行了错误的解析， 解析成两个函数  `foo`  和  `bar`

### this

- 函数调用

  ```js
  foo();
  ```

  这里  `this`  也会指向全局对象。 ES5 注意: 在严格模式下（`strict mode`），不存在全局变量。 这种情况下  `this` 将会是  `undefined` 。

- 调用构造函数

  ```js
  new foo();
  ```

  如果函数倾向于和`new`关键词一块使用，则我们称这个函数是构造函数。在函数内部， `this`  指向新创建的对象。

- 方法的赋值表达式

  另一个看起来奇怪的地方是函数别名，也就是将一个方法赋值给一个变量。

  ```js
  var test = someObject.methodTest;
  test();
  ```

  上例中， `test`  就像一个普通的函数被调用；因此，函数内的  `this`  将不再被指 向到  `someObject`  对象.

### 闭包和引用

闭包是 `JavaScript` 一个非常重要的特性，这意味着当前作用域总是能够访问外部作 用域中的变量。 因为 函数 是 `JavaScript` 中唯一拥有自身作用域的结构，因此闭包 的创建依赖于函数。

- 循环中的闭包

```js
for(var i = 0; i < 10; i++) {
     setTimeout(function() {
        console.log(i);
      }, 1000);
}
```

上面的代码不会输出数字  0  到  9 ，而是会输出数字  10  十次。当  `console.log`  被调用的时候，匿名函数保持对外部变量  `i`  的引用，此时 `for` 循环已经结束，  `i`  的值被修改成了  10 . 为了得到想要的结果，需要在每次循环中创建变量  `i`  的拷贝

```js
for(var i = 0; i < 10; i++) {
     (function(e) {
       setTimeout(function() {
         console.log(e);
       }, 1000);  
      })(i);
}
```

外部的匿名函数会立即执行，并把  `i`  作为它的参数，此时函数内  `e`  变量就拥有 了  `i`  的一个拷贝。 当传递给  `setTimeout`  的匿名函数执行时，它就拥有了对  `e`  的引用，而这个值 是不会被循环改变的

### arguments  对象

`JavaScript` 中每个函数内都能访问一个特别变量  `arguments` 。这个变量维护着所 有传递到这个函数中的参数列表。 注意: 由于  `arguments`  已经被定义为函数内的一个变量。 因此通过  `var`  关键 字定义  `arguments`  或者将  `arguments`  声明为一个形式参数， 都将导致原生的 `arguments`  不会被创建。

尽管在语法上它有数组相关的属性 `length` ，但它不从  `Array.prototype`  继承，实际上它是一个对象 （ `Object` ）。

#### 形参值改变

`arguments`  对象为其内部属性以及函数形式参数创建 `getter` 和 `setter` 方法。 因此，**改变形参的值会影响到  `arguments`  对象的值，反之亦然。**
ES5 提示: 这些 getters 和 setters 在严格模式下（strict mode）不会被创建。

```js
function foo(a, b, c) {  
    arguments[0] = 2;
    a; // 2
    b = 4;
    arguments[1]; // 4
    var d = c;
        d = 9;
        c; // 3
    } foo(1, 2, 3);
```

#### `callee`性能

  ```js
  function foo() {
    arguments.callee; // do something with this function object    arguments.callee.caller; // and the calling function object 
  }

  function bigLoop() {
    for (var i = 0; i < 100000; i++) {
      foo(); // Would normally be inlined...   
    }
  }
  ```

上面代码中， `foo`  不再是一个单纯的内联函数 `inlining`（这里指的是解析 器可以做内联处理）， 因为它需要知道它自己和它的调用者。 这不仅抵消了内联 函数带来的性能提升，而且破坏了封装，因此现在函数可能要依赖于特定的上下 文。 因此强烈建议大家不要使用  `arguments.callee`  和它的属性。

**ES5 提示: 在严格模式下， arguments.callee  会报错  TypeError ，因为它已 经被废除了**。

#### 构造函数

`JavaScript` 中的构造函数和其它语言中的构造函数是不同的。 通过  `new`  关键字 方式调用的函数都被认为是构造函数。 在构造函数内部 - 也就是被调用的函数内 -  `this`  指向新创建的对象  `Object` 。 这个新创建的对象的  `prototype`  被指向到构造函数的  `prototype` 。 

如果被调用的函数没有显式的 `return` 表达式，则隐式的会返回 `this` 对象也就是新创建的对象。

**显式的  return  表达式将会影响返回结果，但仅限于返回的是一个对象**。

```js
function Bar() {
  return 2;
}
new Bar(); // 返回新创建的对象
function Test() {
  this.value = 2;
  return { foo: 1 };
}
new Test(); // 返回的对象
```

 `new Bar()`  返回的是新创建的对象，而不是数字的字面值 2。 因此 `new Bar().constructor === Bar`，但是如果返回的是数字对象，结果就不同 了，如下所示

```js
function Bar() {
  return new Number(2);
}
new Bar().constructor === Number
```

这里得到的 `new Test()` 是函数返回的对象，而不是通过 `new` 关键字新 创建的对象，因此：

```js
(new Test()).value === undefined
(new Test()).foo === 1
```

如果  `new`  被遗漏了，则函数不会返回新创建的对象。

```js
function Foo() {
  this.bla = 1; // 获取设置全局参数
}
Foo(); // undefined
```

虽然上例在有些情况下也能正常运行，但这里的  `this` 指向全局对象。

### 工厂模式

为了不使用  `new`  关键字，构造函数必须显式的返回一个值。

```js
function Bar() {
  var value = 1;
  return {
    method: function () {
      return value;
    }
  }
}
Bar.prototype = {
  foo: function () {}
};
new Bar();
Bar();
```

上面两种对  `Bar`  函数的调用返回的值完全相同，一个新创建的拥有  `method`  属 性的对象被返回， 其实这里创建了一个闭包。 还需要注意，  `new Bar()`  并不会改变返回对象的原型（也就是返回对 象的原型不会指向 `Bar.prototype` ）。

 因为构造函数的原型会被指向到刚刚创 建的新对象，而这里的  `Bar`  没有把这个新对象返回（而是返回了一个包 含  `method`  属性的自定义对象）。 
 
 在上面的例子中，使用或者不使用  `new`  关键字没有功能性的区别。上面两种方式创建的对象不能访问  `Bar`  原型链上的属性，如下所示：

```js
var bar1 = new Bar();
typeof(bar1.method); // "function"
typeof(bar1.foo); // "undefined"

var bar2 = Bar();
typeof(bar2.method); // "function"
typeof(bar2.foo); // "undefined
```

#### 通过工厂模式创建新对象

我们常听到的一条忠告是不要使用 `new`   关键字来调用函数，因为如果忘记使用它 就会导致错误。

为了创建新对象，我们可以创建一个工厂方法，并且在方法内构造一个新对象。

```js
function Foo() {
  var obj = {};
  obj.value = 'blub';
  var private = 2;
  obj.someMethod = function (value) { this.value = value; }
  obj.getPrivate = function () { return private; }
  return obj;
}
```

虽然上面的方式比起  `new`  的调用方式不容易出错，并且可以充分利用私有变量带 来的便利， 但是随之而来的是一些不好的地方。

 1. 会占用更多的内存，因为新创建的对象不能共享原型上的方法。
 2. 为了实现继承，工厂方法需要从另外一个对象拷贝所有属性，或者把一个对象 作为新创建对象的原型。
 3. 放弃原型链仅仅是因为防止遗漏  `new`  带来的问题，这似乎和语言本身的思想 相违背。

**虽然遗漏  `new`  关键字可能会导致问题，但这并不是放弃使用原型链的借口。 最 终使用哪种方式取决于应用程序的需求，选择一种代码书写风格并坚持下去才是最 重要的。**

### 作用域与命名空间

尽管 `JavaScript` 支持一对花括号创建的代码段，但是并不支持块级作用域； 而仅 仅支持 函数作用域。

#### 隐式的全局变量

```js
// 脚本 A foo = '42';
// 脚本 B var foo = '42'
```

```js
// 全局作用域 
var items = [ /* 数组 */ ];
for (var i = 0; i < 10; i++) {
  subLoop();
}

function subLoop() {
  // subLoop 函数作用域   
  for (i = 0; i < 10; i++) { // 没有使用 var 声明变量     
    // 干活   
  }
}
```

外部循环在第一次调用  `subLoop`  之后就会终止，因为  `subLoop`  覆盖了全局变 量  `i` 。 在第二个  `for`  循环中使用  `var`  声明变量可以避免这种错误。 声明变 量时绝对不要遗漏  `var`  关键字，除非这就是期望的影响外部作用域的行为。

#### 变量声明提升（Hoisting）

`JavaScript` 会提升变量声明。这意味着 `var`   表达式和  `function`  声明都将会被 提升到当前作用域的顶部。

```js
bar();
var bar = function () {};
var someValue = 42;
test();

function test(data) {
  if (false) {
    goo = 1;
  } else { var goo = 2; }
  for (var i = 0; i < 100; i++) { var e = data[i]; }
}
```

上面代码在运行之前将会被转化。`JavaScript` 将会把  `var`  表达式和  `function` 声明提升到当前作用域的顶部。

```js
// var 表达式被移动到这里 
var bar, someValue; // 缺省值是 'undefined'
// 函数声明也会提升
function test(data) {
  var goo, i, e; // 没有块级作用域，这些变量被移动到函数顶部    
  if (false) {
    goo = 1;
  } else { goo = 2; }
  for (i = 0; i < 100; i++) { e = data[i]; }
}
bar(); // 出错：TypeError，因为 bar 依然是 'undefined' 
someValue = 42; // 赋值语句不会被提升规则（hoisting）影响 
bar = function () {};
test();
```

没有块级作用域不仅导致  `var`  表达式被从循环内移到外部，而且使一些  `if ` 表 达式更难看懂。 在原来代码中， `if`  表达式看起来修改了全局变量  `goo` ，实际上在提升规则被应 用后，却是在修改局部变量。

在 Nettuts+ 网站有一篇介绍 `hoisting` 的文章，其中的代码很有启发性。

```js
var myvar = 'my value';
(function () {
  alert(myvar); // undefined    
  var myvar = 'local value';
})();
```

#### 名称解析顺序

`JavaScript` 中的所有作用域，包括全局作用域，都有一个特别的名称  `this`  指向 当前对象。 函数作用域内也有默认的变量  `arguments` ，其中包含了传递到函数中的参数。 比如，当访问函数内的  `foo`  变量时，`JavaScript` 会按照下面顺序查找：

1. 当前作用域内是否有  `var foo`  的定义。
2. 函数形式参数是否有使用  `foo`  名称的。
3. 函数自身是否叫做  `foo` 。
4. 回溯到上一级作用域，然后从 #1 重新开始。

注意: 自定义  `arguments`  参数将会阻止原生的  `arguments`  对象的创建。

## 类型

### typeof 操作符

`typeof`  操作符（和  `instanceof`  一起）或许是 `JavaScript` 中最大的设计缺 陷， 因为几乎不可能从它们那里得到想要的结果。 

尽管  `instanceof`  还有一些极少数的应用场景， `typeof`  只有一个实际的应用 （这个实际应用是用来检测一个对象是否已经定义或者是否已经赋值）， 而这个应用却不是用来检查对象的类型。

###  instanceof  操作符

 `instanceof`  操作符用来比较两个操作数的构造函数。

#### 比较自定义对象

```js
function Foo() {}

function Bar() {} Bar.prototype = new Foo();
new Bar() instanceof Bar; // true 
new Bar() instanceof Foo; // true
// 如果仅仅设置 Bar.prototype 为函数 Foo 本身，而不是 Foo 构造函数的一个实例 
Bar.prototype = Foo;
new Bar() instanceof Foo; // false
```

#### 比较内置类型

```js
new String('foo') instanceof String; // true 
new String('foo') instanceof Object; // true
'foo' instanceof String; // false 
'foo' instanceof Object; // false
```

`instanceof`  操作符应该仅仅用来比较来自同一个 `JavaScript` 上下文的自定义对 象。  用来比较属于不同 `JavaScript` 上下文的对象（比 如，浏览器中不同的文档结构）时将会出错， 因为它们的构造函数不会是同一个对象。
