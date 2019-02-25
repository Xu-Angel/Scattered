// ! 函数声明

// 要考虑对输入，输出进行约束，参数不可以为指定个数（不可多或少）

function sum(x: number, y: number): number {
  return x + y
}

// ! 函数表达式

let mySum = function (x: number, y: number): number {
  return x + y
}
/* 
这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：
*/
// let sysum: (x: number, y: number) => number
// let ss: (s: number, y: number) => number
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
let sysum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}
let ysum: (x: number, y: number) => number =  (x: number, y: number): number => {
  return x + y
}

// ! 接口定义函数的类型,使用接口的方式来定义一个函数需要符合的形状：

interface Func {
  (s: number, n: number): boolean
}

let func: Func
func = function (s, n) {
  return s + n !== -1
}

// ! 可选参数后面不可以再出现必须参数：

function bulid(s?: string, l: string): string { // 报错
  return s + l
}

// ! 默认参数不受限制，TS会将添加了默认值的参数识别为可选参数：

function bu(f: string, s: string = 'hi', l: string): string {
  return f + s + l
}

// ! 剩余参数 再TS中的类型定义： 数组类型并且只能是函数的最后一个参数：

function push(arr: any[], ...items: any[]): any[] {
  return arr.concat(items)
}

// ! 重载 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

/* 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
利用联合类型，我们可以这么实现：
*/
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

/* 然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。
这时，我们可以使用重载定义多个 reverse 的函数类型： */

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string { //提示 +4 overloads
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
/* 上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。
!TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。 */