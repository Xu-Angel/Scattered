# 

## 两大声明空间

在 TypeScript 里存在两种声明空间：类型声明空间与变量声明空间。[#](https://jkchao.github.io/typescript-book-chinese/project/declarationspaces.html#%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E%E7%A9%BA%E9%97%B4)

## 模块

### 模块路径

- 动态查找 当导入路径不是相对路径时，模块解析将会模仿 Node 模块解析策略

  当你使用 import * as foo from 'foo'，将会按如下顺序查找模块：

  ```
  ./node_modules/foo
  ../node_modules/foo
  ../../node_modules/foo
  ```
  直到系统的根目录

  当你使用 import * as foo from 'something/foo'，将会按照如下顺序查找内容
  ```
  ./node_modules/something/foo
  ../node_modules/something/foo
  ../../node_modules/something/foo
  ```
  直到系统的根目录

- **import/require 仅仅是导入类型,在TS中符合定义。只有被使用到才会被编译** [#](https://jkchao.github.io/typescript-book-chinese/project/modules.html#import-require-%E4%BB%85%E4%BB%85%E6%98%AF%E5%AF%BC%E5%85%A5%E7%B1%BB%E5%9E%8B)

  eg1
  ```ts
  import foo = require('foo');
  ```
  编译结果
  ```js

  ```

  eg2
  ```ts
  import foo = require('foo');
  var bar: foo;
  ```
  编译结果
  ```
  let bar
  ```

  eg3 commonjs）：
  ```ts
  import foo = require('foo');
  const bar = foo;
  ```
  编译结果
  ```js
  const foo = require('foo');
  const bar = foo;
  ```

  提前完成：

  ```ts
  import foo = require('foo');
  let bar: foo.SomeType;
  ```

- 懒加载

  场景：

  在 web app 里， 当你在特定路由上加载 JavaScript 时；

  在 node 应用里，当你只想加载特定模块，用来加快启动速度时。

  1.common.js
  ```ts
  import foo = require('foo');

  export function loadFoo() {
    // 这是懒加载 foo，原始的加载仅仅用来做类型注解
    const _foo: typeof foo = require('foo');
    // 现在，你可以使用 `_foo` 替代 `foo` 来做为一个变量使用
  }
  ```
  2.amd.requirejs
  ```ts
  import foo = require('foo');

  export function loadFoo() {
    // 这是懒加载 foo，原始的加载仅仅用来做类型注解
    require(['foo'], (_foo: typeof foo) => {
      // 现在，你可以使用 `_foo` 替代 `foo` 来做为一个变量使用
    });
  }
  ```

- 确保导入

  当你加载一个模块，只是想引入其附加的作用（如：模块可能会注册一些像 CodeMirror addons）时，然而，如果你仅仅是 import/require （导入）一些并没有与你的模块或者模块加载器有任何依赖的 JavaScript 代码，（如：webpack），经过 TypeScript 编译后，这些将会被完全忽视。在这种情况下，你可以使用一个 ensureImport 变量，**来确保编译的 JavaScript 依赖与模块**。如：

  ```ts
  import foo = require('./foo');
  import bar = require('./bar');
  import bas = require('./bas');

  const ensureImport: any = foo || bar || bas;
  ```

**global.d.ts**

当我们讨论文件模块时，比较了全局变量与文件模块，并且我们推荐使用基于文件的模块，而不是选择污染全局命名空间。

然而，如果你的团队里有 TypeScript 初学者，你可以提供他们一个 global.d.ts 文件，用来将一些接口或者类型放入全局命名空间里，这些定义的接口和类型能在你的所有 TypeScript 代码里使用。

对于任何需要编译成 JavaScript 代码，我们强烈建议你放入文件模块里。

global.d.ts 是一种扩充 lib.d.ts 很好的方式，如果你需要。
当你从 JS 迁移到 TS 时，定义 
`declare module "some-library-you-dont-care-to-get-defs-for" `
能让你快速开始。

### 命名空间 namespace

```ts
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}
```
结果
```js
"use strict";
var Utility;
(function (Utility) {
    function log(msg) {
        console.log(msg);
    }
    Utility.log = log;
    function error(msg) {
        console.log(msg);
    }
    Utility.error = error;
})(Utility || (Utility = {}));
```

## 类型系统

### 基本注解

类型注解使用 :TypeAnnotation 语法。在类型声明空间中可用的任何内容都可以用作类型注解。

- JavaScript原始类型

  JavaScript 原始类型也同样适应于 TypeScript 的类型系统，因此 string、number、boolean 也可以被用作类型注解
  ```ts
  let num: number;
  let str: string;
  let bool: boolean;

  num = 123;

  str = '123';

  bool = true;

  ```
- 数组
  
  TypeScript 为数组提供了专用的类型语法，它使用后缀 []， 接着你可以根据需要补充任何有效的类型注解（如：:boolean[]）

  ```ts
  let boolArray: boolean[];
  ```

- 接口

  接口是 TypeScript 的一个核心知识，它能合并众多类型声明至一个类型声明。能强制对每个成员进行类型检查。接口在 TypeScript 拥有强大的力量。

- 内联类型注解

  内联注解语法注解任何内容：:{ /*Structure*/ }：
  
  ```ts
  let name: {
  first: string;
  second: string;
  };
  ```

  内联类型能为你快速的提供一个类型注解。它可以帮助你省去为类型起名的麻烦（你可能会使用一个很糟糕的名称）。然而，**如果你发现需要多次使用相同的内联注解时，那么考虑把它重构为一个接口（或者是 type alias**

- 特殊类型

  any,null,undefined,void

- 泛型

  在计算机科学中，许多算法和数据结构并不会依赖于对象的实际类型。但是，你仍然会想在每个变量里强制提供约束

- 联合类型

  | “或”

- 交叉类型

  & “且” 在 JavaScript 中， extend 是一种非常常见的模式，在这种模式中，你可以从两个对象中创建一个新对象，新对象会拥有着两个对象所有的功能。交叉类型可以让你安全的使用此种模式

  ```ts
  function extend<T extends object, U extends object>(first: T, second: U): T & U {
    const result = <T & U>{};
    for (let id in first) {
      (<T>result)[id] = first[id];
    }
    for (let id in second) {
      if (!result.hasOwnProperty(id)) {
        (<U>result)[id] = second[id];
      }
    }

    return result;
  }

  const x = extend({ a: 'hello' }, { b: 42 });

  // 现在 x 拥有了 a 属性与 b 属性
  const a = x.a;
  const b = x.b;
  ```

- 元组

  `:[typeofmember1, typeofmember2]` 的形式，为元组添加类型注解，元组可以包含任意数量的成员

  ```ts
  let nameNumber: [string, number];
  nameNumber = ['Jenny', 322134];

  const [name, num] = nameNumber;
  ```

- 类型别名

  TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 `type SomeName = someValidTypeAnnotation`

## types

通过配置 tsconfig.json 的 compilerOptions.types 选项，引入有意义的类型：
```
{
  "compilerOptions": {
    "types" : [
      "jquery"
    ]
  }
}
```
如上例所示，通过配置 compilerOptions.types: [ "jquery" ] 后，只允许使用 jquery 的 @types 包，即使这个人安装了另一个声明文件，比如 npm install @types/node，它的全局变量（例如 process）也不会泄漏到你的代码中，直到你将它们添加到 tsconfig.json 类型选项。

## interface

接口运行时的影响为 0。在 TypeScript 接口中有很多方式来声明变量的结构。

下面两个是等效的声明, 示例 A 使用内联注解，示例 B 使用接口形式：
```ts
// 示例 A
declare const myPoint: { x: number; y: number };

// 示例 B
interface Point {
  x: number;
  y: number;
}
declare const myPoint: Point;
```
示例 B 的好处在于，如果有人创建了一个基于 myPoint 的库来添加新成员, 那么他可以轻松将此成员添加到 myPoint 的现有声明中:
```ts
// Lib a.d.ts
interface Point {
  x: number,
  y: number
}
declare const myPoint: Point

// Lib b.d.ts
interface Point {
  z: number
}

// Your code
myPoint.z // Allowed!
```
**TypeScript 接口是开放式的，这是 TypeScript 的一个重要原则，它允许你使用接口来模仿 JavaScript 的可扩展性。**

### 类可以实现接口

**如果你希望在类中使用必须要被遵循的接口（类）或别人定义的对象结构，可以使用 implements 关键字来确保其兼容性：**
```ts
interface Point {
  x: number;
  y: number;
}

class MyPoint implements Point {
  x: number;
  y: number; // Same as Point
}
```
基本上，在 implements（实现） 存在的情况下，该外部 Point 接口的任何更改都将导致代码库中的编译错误，因此可以轻松地使其保持同步：
```ts
interface Point {
  x: number;
  y: number;
  z: number; // New member
}

class MyPoint implements Point {
  // ERROR : missing member `z`
  x: number;
  y: number;
}
```

**接口旨在声明 JavaScript 中可能存在的任意结构。**

- 接口来重载函数

  ```ts
  interface Overloaded {
    (foo: string): string;
    (foo: number): number;
  }

  // 实现接口的一个例子：
  function stringOrNumber(foo: number): number;
  function stringOrNumber(foo: string): string;
  function stringOrNumber(foo: any): any {
    if (typeof foo === 'number') {
      return foo * foo;
    } else if (typeof foo === 'string') {
      return `hello ${foo}`;
    }
  }

  const overloaded: Overloaded = stringOrNumber;

  // 使用
  const str = overloaded(''); // str 被推断为 'string'
  const num = overloaded(123); // num 被推断为 'number'
  ```
- 接口声明new Class

  它使用 new 做为前缀。它意味着你需用使用 new 关键字去调用它

  ```ts
  interface CallMeWithNewToGetString {
    new (): string;
  }

  // 使用
  declare const Foo: CallMeWithNewToGetString;
  const bar = new Foo(); // bar 被推断为 string 类型
  ```

### 类型断言

TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误

- 语法：`as foo`  `<foo>`

- 类型断言与类型转换

  它之所以不被称为「类型转换」，是因为转换通常意味着某种运行时的支持。但是，类型断言纯粹是一个编译时语法，同时，它也是一种为编译器提供关于如何分析代码的方法。

- 双重断言

  `(event as any) as HTMLElement`

### Freshness

### 类型保护

类型保护允许你使用更小范围下的对象类型

typeof instanceof else in 字面量类型保护 interface

### 字面量类型

- 字符串字面量

  ```ts
  let foo: 'Hello';
  foo = 'Bar'; // Error: 'bar' 不能赋值给类型 'Hello'
  ```

  它们本身并不是很实用，但是可以在一个联合类型中组合创建一个强大的（实用的）抽象：

  ```ts
  type CardinalDirection = 'North' | 'East' | 'South' | 'West';
  ```

- 其他字面量类型

  TypeScript 同样也提供 boolean 和 number 的字面量类型：

  ```ts
  type OneToFive = 1 | 2 | 3 | 4 | 5;
  type Bools = true | false;
  ```

#### 推断

```ts
function iTakeFoo(foo: 'foo') {}
const test = {
  someProp: 'foo'
};

iTakeFoo(test.someProp); // Error: Argument of type string is not assignable to parameter of type 'foo'  test 被推断为 { someProp: string }
```

1.采用一个简单的类型断言

```ts
const test = {
  someProp: 'foo' as 'foo'
};

```

2.类型注解的方式
```ts
type Test = {
  someProp: 'foo';
};

const test: Test = {
  // 推断 `someProp` 永远是 'foo'
  someProp: 'foo'
};
```

### readonly

用于属性；用于别名，可以修改属性；

- 泛型

```ts
type Foo = {
  bar: number;
  bas: number;
};

type FooReadonly = Readonly<Foo>;

const foo: Foo = { bar: 123, bas: 456 };
const fooReadonly: FooReadonly = { bar: 123, bas: 456 };

foo.bar = 456; // ok
fooReadonly.bar = 456; // Error: bar 属性只读
```

- 绝对不可变

```ts
interface Foo {
  readonly [x: number] : number
}

const foo: Foo = { 0: 123, 2: 345 };
console.log(foo[0]); // ok（读取）
foo[0] = 456; // Error: 属性只读
```

- 数组不可变

  原生 JavaScript 数组，可以使用 TypeScript 提供的 `ReadonlyArray<T>` 接口：

  ```ts
  let foo: ReadonlyArray<number> = [1, 2, 3];
  console.log(foo[0]); // ok
  foo.push(4); // Error: ReadonlyArray 上不存在 `push`，因为他会改变数组
  foo = foo.concat(4); // ok, 创建了一个复制
  ```

### 泛型

设计泛型的关键目的是在成员之间提供有意义的**约束**，这些成员可以是：

- 类的实例成员
- 类的方法
- 函数参数
- 函数返回值

使用简单的泛型时，泛型常用 `T`、`U`、`V` 表示。如果在你的参数里，不止拥有一个泛型，你应该使用一个更语义化名称，如 `TKey` 和 `TValue` （通常情况下，以 `T` 作为泛型的前缀，在其他语言如 C++ 里，也被称为模板）

```ts
// 创建一个泛型类
class Queue<T> {
  private data: T[] = [];
  push = (item: T) => this.data.push(item);
  pop = (): T | undefined => this.data.shift();
}

// 简单的使用
const queue = new Queue<number>();
queue.push(0);
queue.push('1'); // Error：不能推入一个 `string`，只有 number 类型被允许
```

```ts
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

const sample = [1, 2, 3];
let reversed = reverse(sample);

reversed[0] = '1'; // Error
reversed = ['1', '2']; // Error

reversed[0] = 1; // ok
reversed = [1, 2]; // ok
```

```ts
class Utility {
  reverse<T>(items: T[]): T[] {
    const toreturn = [];
    for (let i = items.length; i >= 0; i--) {
      toreturn.push(items[i]);
    }
    return toreturn;
  }
}
```

应该问问自己：**你想用它来提供什么样的约束。如果你不能很好的回答它，就可能会误用泛型**

```ts
declare function foo<T>(arg: T): void;
```

在这里，泛型完全没有必要使用，因为它仅用于单个参数的位置，使用如下方式可能更好

```ts
declare function foo(arg: any): void;
```

```ts
const getJSON = <T>(config: { url: string; headers?: { [key: string]: string } }): Promise<T> => {
  const fetchConfig = {
    method: 'GET',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(config.headers || {})
  };
  return fetch(config.url, fetchConfig).then<T>(response => response.json());
};

type LoadUserResponse = {
  user: {
    name: string;
    email: string;
  }[];
};

function loaderUser() {
  return getJSON<LoadUserResponse>({ url: 'https://example.com/users' });
}
```

数据请求：

```ts
// 请求接口数据
export interface ResponseData<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code: number;

  /**
   * 数据
   * @type { T }
   */
  result: T;

  /**
   * 消息
   * @type { string }
   */
  message: string;
}
```

```ts
import Ax from './axios';

import { ResponseData } from './interface.ts';

export function getUser<T>() {
  return Ax.get<ResponseData<T>>('/somepath')
    .then(res => res.data)
    .catch(err => console.error(err));
}
```

```ts
interface User {
  name: string;
  age: number;
}

async function test() {
  // user 被推断出为
  // {
  //  code: number,
  //  result: { name: string, age: number },
  //  message: string
  // }
  const user = await getUser<User>();
}
```

### 类型兼容性


[#](https://jkchao.github.io/typescript-book-chinese/typings/typeCompatibility.html#%E5%AE%89%E5%85%A8%E6%80%A7)

```ts
interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const point2D: Point2D = { x: 0, y: 10 };
const point3D: Point3D = { x: 0, y: 10, z: 20 };
function iTakePoint2D(point: Point2D) {
  /* do something */
}

iTakePoint2D(point2D); // ok, 完全匹配
iTakePoint2D(point3D); // 额外的信息，没关系
iTakePoint2D({ x: 0 }); // Error: 没有 'y'
```

### 索引签名

JavaScript 在一个对象类型的索引签名上会隐式调用 toString 方法，而在 TypeScript 中，为防止初学者砸伤自己的脚（我总是看到 stackoverflow 上有很多 JavaScript 使用者都会这样。），它将会抛出一个错误。

```ts
const obj = {
  toString() {
    return 'Hello';
  }
};

const foo: any = {};

// ERROR: 索引签名必须为 string, number....
foo[obj] = 'World';

// FIX: TypeScript 强制你必须明确这么做：
foo[obj.toString()] = 'World';
```

强制用户必须明确的写出 toString() 的原因是：在对象上默认执行的 toString 方法是有害的。例如 v8 引擎上总是会返回 `[object Object]`

```js
const obj = { message: 'Hello' };
let foo: any = {};

// ERROR: 索引签名必须为 string, number....
foo[obj] = 'World';

// 这里实际上就是你存储的地方
console.log(foo['[object Object]']); // World
```

当然，数字类型是被允许的，这是因为：

- 需要对数组 / 元组完美的支持；
- 即使你在上例中使用 number 类型的值来替代 obj，number 类型默认的 toString 方法实现的很友好（不是 [object Object]）。

**TypeScript 的索引签名必须是 string 或者 number。symbols 也是有效的，TypeScript 支持它**

### 流动的类型

- 捕获变量的类型 

通过 typeof 操作符在类型注解中使用变量。这允许你告诉编译器，一个变量的类型与其他类型相同

```ts
let foo = 123;
let bar: typeof foo; // 'bar' 类型与 'foo' 类型相同（在这里是： 'number'）

bar = 456; // ok
bar = '789'; // Error: 'string' 不能分配给 'number' 类型
```

- 捕获类成员的类型

与捕获变量的类型相似，需要声明一个变量用来捕获到的类型：

```ts
class Foo {
  foo: number; // 我们想要捕获的类型
}

declare let _foo: Foo;

// 与之前做法相同
let bar: typeof _foo.foo;
```

- 捕获字符串类型

许多 JavaScript 库和框架都使用原始的 JavaScript 字符串，你可以使用 const 定义一个变量捕获它的类型

```ts
// 捕获字符串的类型与值
const foo = 'Hello World';

// 使用一个捕获的类型
let bar: typeof foo;

// bar 仅能被赋值 'Hello World'
bar = 'Hello World'; // ok
bar = 'anything else'; // Error
```

- 捕获键的名称

keyof 操作符能让你捕获一个类型的键。例如，你可以使用它来捕获变量的键名称，在通过使用 typeof 来获取类型之后：

```ts
const colors = {
  red: 'red',
  blue: 'blue'
};

type Colors = keyof typeof colors;

let color: Colors; // color 的类型是 'red' | 'blue'
color = 'red'; // ok
color = 'blue'; // ok
color = 'anythingElse'; // Error
```
这允许你很容易地拥有像字符串枚举+常量这样的类型，