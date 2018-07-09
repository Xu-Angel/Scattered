/* FIXME:Modules */
/* 
TODO:  Always use modules (import/export) over a non-standard module system. You can always transpile to your preferred module system.
*Modules are the future, let’s start using the future now.
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;
// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;
// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
*/
/* 
TODO:不要使用通配符 除非全部 
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';
// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
*/
/* 
 TODO:And do not export directly from an import.
 // bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';
// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
 */
/* 
TODO:不要重复导入 
 *Having multiple lines that import from the same path can make code harder to maintain.
// bad
import foo from 'foo';
// … some other imports … //
import { named1, named2 } from 'foo';
// good
import foo, { named1, named2 } from 'foo';
// good
import foo, {
  named1,
  named2,
} from 'foo';
*/
/* 
TODO:导出的最好是常量而不是变量 
*Mutation should be avoided in general, but in particular when exporting mutable bindings. While this technique may be needed for some special cases, in general, only constant references should be exported.
// bad
let foo = 3;
export { foo };
// good
const foo = 3;
export { foo };
*/
/* 
TODO: 单一导出的时候，加上default
*To encourage more files that only ever export one thing, which is better for readability and maintainability.
// bad
export function foo() {}
// good
export default function foo() {}
*/
/* 
TODO:统一导入
*Since imports are hoisted, keeping them all at the top prevents surprising behavior.
// bad
import foo from 'foo';
foo.init();
import bar from 'bar';
// good
import foo from 'foo';
import bar from 'bar';
foo.init();
 */