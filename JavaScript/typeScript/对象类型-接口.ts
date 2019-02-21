/* 
在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。
*/

// 形状要一致，定义的变量比接口少了一些属性是不允许的,多了也是不被允许的
interface Person {
  name: string,
  age: number
}

let tom: Person = {
  name: 'tom',
  age: 15
}

// 可变： 有时我们希望不要完全匹配一个形状，那么可以用可选属性
interface Jerson {
  name: string;
  age?: number; // 可选
}
// 任意类型： 希望一个接口允许有任意的属性，可以使用如下方式：

interface Pserson {
    name: string;
    age?: number;
    [propName: string]: any;
}

let toom: Pserson = {
    name: 'Tom',
    gender: 'male'
};
// 使用 [propName: string] 定义了任意属性取 string 类型的值。需要注意的是，一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性：

// 只读属性

interface S {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
let om: S = {
  id: 89757,
  name: 'Tom',
  gender: 'male'
};
om.id = 9527; //使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了。

// 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：

interface N {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tm: N = { //在对 tm 进行赋值的时候，没有给 id 赋值
    name: 'Tom',
    gender: 'male'
};

tm.id = 89757; //给 tm.id 赋值的时候，由于它是只读属性，所以报错了。