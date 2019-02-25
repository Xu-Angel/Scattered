/* 
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
 */
function createArray(length: number, value: any): Array<any> {
  let result = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
//这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：
// Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型。
// 这时候，泛型就派上用场了：

function createArrayT<T>(length: number, value: T): Array<T> {
  let result:T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

/* 
! 我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
接着在调用的时候，可以指定它具体的类型为 string。当然，也可以不手动指定，而让类型推论自动推算出来
*/

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

// 上例中，我们定义了一个 swap 函数，用来交换输入的元组。

// 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
interface lengthWise {
  length: number
}
function loggin<T extends lengthWise>(arg: T): T {
  console.log(arg.length)
  return arg
}
// ! 上例中，我们使用了 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状，也就是必须包含 length 属性。

// ! 多个类型参数之间也可以相互约束

function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id]
    return target
  }
}
// 上面使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。


// ! 泛型接口

// 可以使用接口的方式来定义一个函数需要符合的形状：

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
// ! 当然也可以使用含有泛型的接口来定义函数的形状：

interface CreateArrayFun {
    <T>(length: number, value: T): Array<T>;
}

let createArra: CreateArrayFun;
createArra = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
// ! 进一步，我们可以把泛型参数提前到接口名上：

interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArr: CreateArrayFunc<any>;
createArr = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
// 注意，此时在使用泛型接口的时候，需要定义泛型的类型。

// ! 泛型类 与泛型接口类似，泛型也可以用于类的类型定义中：

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

// ! 泛型参数的默认类型
// 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

function createrray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}