// <类型>值
// 或
// 值 as 类型
// 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。
/* 
当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法,
而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，比如：
*/
function getLengt(something: string | number): number {
  if (something.length) {
      return something.length;
  } else {
      return something.toString().length;
  }
}
// ! 此时可以使用类型断言，将 something 断言成 string：
function getLength(s: string | number): number {
  if((<string>s).length) {
    return (<string>s).length
  }
}

// 类型断言的用法如上，在需要断言的变量前加上 <Type> 即可。
// ! 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：

function toBoolean(something: string | number): boolean {
    return <boolean>something;
}
