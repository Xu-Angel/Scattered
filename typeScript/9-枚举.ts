// ! 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
// https://ts.xcatliu.com/advanced/enum.html
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}

// ! 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
/* 
! 手动赋值 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的：
*/

enum Day {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Day["Sun"] === 3); // true
console.log(Day["Wed"] === 3); // true
console.log(Day[3] === "Sun"); // false
console.log(Day[3] === "Wed"); // true

// ! 递增到 3 的时候与前面的 Sun 的取值重复了，但是 TypeScript 并没有报错，导致 Days[3] 的值先是 "Sun"，而后又被 "Wed" 覆盖了。编译的结果是：
// var Days;
// (function (Days) {
//     Days[Days["Sun"] = 3] = "Sun";
//     Days[Days["Mon"] = 1] = "Mon";
//     Days[Days["Tue"] = 2] = "Tue";
//     Days[Days["Wed"] = 3] = "Wed";
//     Days[Days["Thu"] = 4] = "Thu";
//     Days[Days["Fri"] = 5] = "Fri";
//     Days[Days["Sat"] = 6] = "Sat";
// })(Days || (Days = {}));

/* 
常数项和计算所得项
! 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。'blue'.length是一个计算所得项。
*/
enum Color { Red, Green, Blue = 'blue'.length }

// ! 但是如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错：

enum Colors {Red = "red".length, Green, Blue};

// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.


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