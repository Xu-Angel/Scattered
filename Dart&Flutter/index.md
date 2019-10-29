# 前言

我们学习一门编程语言并不是为了成为语言专家，而是为了解决实际问题。我认为通过1-2天的学习，在了解一门语言是如何表达信息和处理信息之后，语言的基本套路就搞懂了，然后可以根据实际问题上手去实践，找相应成熟的框架和库，边做边学，加深理解。

> 首先明确，我们学习一门编程语言并不是为了成为语言专家，而是为了解决实际问题。语言的知识体系也有所谓的28原则，我认为通过1-2天的学习，在了解一门语言是如何表达信息和处理信息之后，语言的基本套路就搞懂了，然后可以根据实际问题上手去实践。Dart的精髓在于其简洁而强大的语法特性，在解决问题时顺便去读一些Flutter的源码，了解Dart是如何从语言特性上支持这些功能 边做边学，加深理解就可以了。
所以我不太建议在已经有其他编程语言基础的情况下再去系统的学习Dart，如果对Dart确实很感兴趣，可以参考官方的教程：https://dart.dev/guides/language

## 基本能力

在 Dart 中，所有类型都是对象类型，都继承自顶层类型 Object，因此一切变量都是对象，数字、布尔值、函数和 null 也概莫能外；未初始化变量的值都是 null；为变量指定类型，这样编辑器和编译器都能更好地理解你的意图

- 如果还有其他高级运算方法的需求 num 无法满足，你可以试用一下 dart:math 库。这个库提供了诸如三角函数、指数、对数、平方根等高级函数。

- Dart 是类型安全的，因此我们不能使用 if(nonbooleanValue) 或 assert(nonbooleanValue) 之类的在 JavaScript 可以正常工作的代码，而应该显式地检查值。

- Dart 的 String 由 UTF-16 的字符串组成。和 JavaScript 一样，构造字符串字面量时既能使用单引号也能使用双引号，还能在字符串中嵌入变量或表达式：你可以使用 ${express} 把一个表达式的值放进字符串。而如果是一个标识符，你可以省略{}。下面这段代码就是内嵌表达式的例子。我们把单词’cat’转成大写放入到变量 s1 的声明中：

```dart
var s = 'cat';
var s1 = 'this is a uppercased string: ${s.toUpperCase()}';
```

## 函数

C++ 与 Java 的做法是，提供函数的重载，即提供同名但参数不同的函数。但 Dart 认为重载会导致混乱，因此从设计之初就不支持重载，而是提供了可选命名参数和可选参数。具体方式是，在声明函数时：给参数增加{}，以 paramName: value 的方式指定调用参数，也就是可选命名参数；给参数增加 []，则意味着这些参数是可以忽略的，也就是可选参数。在使用这两种方式定义函数时，我们还可以在参数未传递时设置默认值。我以一个只有两个参数的简单函数为例，来和你说明这两种方式的具体用法：

```dart

//要达到可选命名参数的用法，那就在定义函数的时候给参数加上 {}
void enable1Flags({bool bold, bool hidden}) => print("$bold , $hidden");

//定义可选命名参数时增加默认值
void enable2Flags({bool bold = true, bool hidden = false}) => print("$bold ,$hidden");

//可忽略的参数在函数定义时用[]符号指定
void enable3Flags(bool bold, [bool hidden]) => print("$bold ,$hidden");

//定义可忽略参数时增加默认值
void enable4Flags(bool bold, [bool hidden = false]) => print("$bold ,$hidden");

//可选命名参数函数调用
enable1Flags(bold: true, hidden: false); //true, false
enable1Flags(bold: true); //true, null
enable2Flags(bold: false); //false, false

//可忽略参数函数调用
enable3Flags(true, false); //true, false
enable3Flags(true,); //true, null
enable4Flags(true); //true, false
enable4Flags(true,true); // true, true
```

Dart 中并没有 public、protected、private 这些关键字，我们只要在声明变量与方法时，在前面加上“_”即可作为 private 方法使用。如果不加“_”，则默认为 public。不过，“_”的限制范围并不是类访问级别的，而是库访问级别。

与 C++ 类似，Dart 支持初始化列表。在构造函数的函数体真正执行之前，你还有机会给实例变量赋值，甚至重定向至另一个构造函数。

实例所示，Point 类中有两个构造函数 Point.bottom 与 Point，其中：Point.bottom 将其成员变量的初始化重定向到了 Point 中，而 Point 则在初始化列表中为 z 赋上了默认值 0。

```dart

class Point {
  num x, y, z;
  Point(this.x, this.y) : z = 0; // 初始化变量z
  Point.bottom(num x) : this(x, 0); // 重定向构造函数
  void printInfo() => print('($x,$y,$z)');
}

var p = Point.bottom(100);
p.printInfo(); // 输出(100,0,0)
```

## 运算符

Dart 和绝大部分编程语言的运算符一样，所以你可以用熟悉的方式去执行程序代码运算。不过，Dart 多了几个额外的运算符，用于简化处理变量实例缺失（即 null）的情况。

?. 运算符：假设 Point 类有 printInfo() 方法，p 是 Point 的一个可能为 null 的实例。那么，p 调用成员方法的安全代码，可以简化为 p?.printInfo() ，表示 p 为 null 的时候跳过，避免抛出异常。

??= 运算符：如果 a 为 null，则给 a 赋值 value，否则跳过。这种用默认值兜底的赋值语句在 Dart 中我们可以用 a ??= value 表示。

?? 运算符：如果 a 不为 null，返回 a 的值，否则返回 b。在 Java 或者 C++ 中，我们需要通过三元表达式 (a != null)? a : b 来实现这种情况。而在 Dart 中，这类代码可以简化为 a ?? b。

在 Dart 中，一切都是对象，就连运算符也是对象成员函数的一部分。对于系统的运算符，一般情况下只支持基本数据类型和标准库中提供的类型。而对于用户自定义的类，如果想支持基本操作，比如比较大小、相加相减等，则需要用户自己来定义关于这个运算符的具体实现。Dart 提供了类似 C++ 的运算符覆写机制，使得我们不仅可以覆写方法，还可以覆写或者自定义运算符。

with  Mixin混入

级联运算符 “..”