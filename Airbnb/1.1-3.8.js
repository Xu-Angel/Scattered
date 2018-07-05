/* TODO:原始数据类型：Primitives: When you access a primitive type you work directly on its value. 
const foo = 1
let bar = foo
bar = '9'
console.log(foo, bar)
*/

 /* TODO: 引用数据类型:When you access a complex type you work on a reference to its value. 
 const fooOne = [1, 2]
 const barOne = fooOne
 barOne[0] = 9 
 console.log(fooOne[0], barOne[0])
*/

/* TODO:  Use const for all of your references; avoid using var.
           If you must reassign references, use let instead of var. eslint: no-var
          Why? let is block-scoped rather than function-scoped like var.
// bad
var count = 1;
if (true) {
  count += 1;
}

// good, use the let.
let count = 1;
if (true) {
  count += 1;
}
*/
/*TODO: let 和const的作用域 // const and let only exist in the blocks they are defined in.
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError 
 */
/* TODO:声明对象，使用字面量
//bad
const item = new Object()
//good
const item = {}
Use computed property names when creating objects with dynamic property names.

Why? They allow you to define all the properties of an object in one place.

function getKey(k) {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
*/
/* TODO:对象中方法简写
Use object method shorthand. eslint: object-shorthand

// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
}; 
      TODO:对象中属性简写：
// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};  
TODO:对象中属性分组排序
 const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
}; 
TODO: 对象中引用属性 Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};  
TODO:对象的属性方法中：Object.prototype,例如：
hasOwnProperty, propertyIsEnumerable, and isPrototypeOf.
Why? These methods may be shadowed by properties on the object in question - consider { hasOwnProperty: false } - or, the object may be a null object (Object.create(null)).

// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best

const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.

// or 
import has from 'has'; // https://www.npmjs.com/package/has
// ...
console.log(has.call(object, key));
TODO:对象扩展  不是用Object.assign而是使用...展开运算符，灵活操作
Prefer the object spread operator over Object.assign to shallow-copy objects. Use the object rest operator to get a new object with certain properties omitted.

// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
*/


