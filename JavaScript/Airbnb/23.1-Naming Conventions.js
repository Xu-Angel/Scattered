/* FIXME:命名习惯 */
/* 
TODO: 见名知意，驼峰
*/
/* 
TODO: 构造函数，类命名，使用PascalCase 帕斯卡拼写法,一种计算机编程中的变量命名方法。它主要的特点是将描述变量作用所有单词的首字母大写，然后直接连接起来，单词之间没有连接符。比如:
*/
/* 
TODO: 不要使用下划线 Do not use trailing or leading underscores. eslint: no-underscore-dangle
*Why? JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won’t count as breaking, or that tests aren’t needed. tl;dr: if you want something to be “private”, it must not be observably present.
*/
/* 
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';
this._firstName = 'Panda';

// good
this.firstName = 'Panda';

// good, in environments where WeakMaps are available
// see https://kangax.github.io/compat-table/es6/#test-WeakMap
const firstNames = new WeakMap();
firstNames.set(this, 'Panda');
*/
/* 
TODO:使用箭头函数代替 this的引用 Don’t save references to this 不要引用this Use arrow functions or Function#bind.
 */
/* 
// bad
function foo() {
  const self = this;
  return function () {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
  
}
*/

/* 
TODO: A base filename should exactly match the name of its default export.
*/

/* 
// file 1 contents
class CheckBox {
  // ...
}
export default CheckBox;

// file 2 contents
export default function fortyTwo() { return 42; }

// file 3 contents
export default function insideDirectory() {}

// in some other file
// bad
import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

// bad
import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
import forty_two from './forty_two'; // snake_case import/filename, camelCase export
import inside_directory from './inside_directory'; // snake_case import, camelCase export
import index from './inside_directory/index'; // requiring the index file explicitly
import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

// good
import CheckBox from './CheckBox'; // PascalCase export/import/filename
import fortyTwo from './fortyTwo'; // camelCase export/import/filename
import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
// ^ supports both insideDirectory.js and insideDirectory/index.js */

/* 
TODO:常量命名  You may optionally uppercase a constant only if it (1) is exported, (2) is a const (it can not be reassigned), and (3) the programmer can trust it (and its nested properties) to never change.

Why? This is an additional tool to assist in situations where the programmer would be unsure if a variable might ever change. UPPERCASE_VARIABLES are letting the programmer know that they can trust the variable (and its properties) not to change.

What about all const variables? - This is unnecessary, so uppercasing should not be used for constants within a file. It should be used for exported constants however.
What about exported objects? - Uppercase at the top level of export (e.g. EXPORTED_OBJECT.key) and maintain that all nested properties do not change.
*/

/* 
// bad
const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

// bad
export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';

// bad
export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

// ---

// allowed but does not supply semantic value
export const apiKey = 'SOMEKEY';

// better in most cases
export const API_KEY = 'SOMEKEY';

// ---

// bad - unnecessarily uppercases key while adding no semantic value
export const MAPPING = {
  KEY: 'value'
};

// good
export const MAPPING = {
  key: 'value'
}; */