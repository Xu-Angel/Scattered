// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}

// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
/* 
手动赋值
*/
/* 
常数项和计算所得项
枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
*/

/* 
常数枚举是使用 const enum 定义的枚举类型：
常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型：
*/

const enum Dir {
//
}
declare enum Dirs {

}