// 接口合并
interface Alarm {
  price: number
}

interface Alarm {
  weight: number
}
 // ===

interface Alarm {
  price: number;
  weight: number
}
 
// 合并的属性的类型必须是唯一的：

interface Alarm {
    price: number;
}
interface Alarm {
    price: number;  // 虽然重复了，但是类型都是 `number`，所以不会报错
    weight: number;
}
interface Alarm {
    price: number;
}
interface Alarm {
    price: string;  // 类型不一致，会报错
    weight: number;
}

// index.ts(5,3): error TS2403: Subsequent variable declarations must have the same type.  Variable 'price' 

// 接口中的方法合并

interface Alarm {
  price: number;
  alert(s: string):string
}

interface Alarm {
  weight: number;
  alert(s: string, n: number): string
}

// ===

interface Alarm {
  preice: number;
  weight: number;
  alert(s: string, n: number): string
}

/* 
类的合并
类的合并与接口的合并规则一致。
*/