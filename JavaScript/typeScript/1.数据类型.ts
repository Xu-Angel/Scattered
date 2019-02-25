function voidFun(v:string): void {
  // 无返回值
  console.log('JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：')
   // return 0   报错
}
// !声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：

let unusable: void = undefined;
let unuable: void = null;

// 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：

let u: undefined = undefined;
let n: null = null;
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null。

/* 
如果是 any 类型，则允许被赋值为任意类型。在任意值上访问任何属性都是允许的,也允许调用任何方法,可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
*/
let anyThing: any = 'hello';
// 未声明类型的变量
// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

let something;
something = 'seven';
something = 7;

something.setName('Tom');

/* 
!联合类型
联合类型（Union Types）表示取值可以为多种类型中的一种。

简单的例子


// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
联合类型使用 | 分隔每个类型。

这里的 let myFavoriteNumber: string | number 的含义是，允许 myFavoriteNumber 的类型是 string 或者 number，但是不能是其他类型。
*/
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// 访问联合类型的属性或方法
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

function getLength(something: string | number): number {
    return something.length;// !length 不是 string 和 number 的共有属性，所以会报错。
}


function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

// 数组类型  数组的项中不允许出现其他的类型：
let fibonacci: number[] = [1,2,'3']