// JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。

// 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
// ! ECMAScript 的内置对象
let b: Boolean = new Boolean(1)
let e: Error = new Error('Error occurred')
let d: Date = new Date()
let r: RegExp = /[a-z]/

// ! DOM 和 BOM 的内置对象: Document、HTMLElement、Event、NodeList 等。

let body: HTMLElement = document.body
let Divs: NodeList = document.querySelectorAll('div')
document.addEventListener('click', function (e: MouseEvent) {
  // 
})

// ! 用 TypeScript 写 Node.js
// Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：
// npm install @types/node --save-dev