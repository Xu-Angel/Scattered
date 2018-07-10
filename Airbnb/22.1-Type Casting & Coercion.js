/* FIXME:Type Casting & Coercion */
/* 强制类型转换 
  TODO:  string类型的转换
*/
/* 
// => this.reviewScore = 9;

// bad
const totalScore = new String(this.reviewScore); // !typeof totalScore is "object" not "string"

// bad
const totalScore = this.reviewScore + ''; // !invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // !isn’t guaranteed to return a string

// !good
const totalScore = String(this.reviewScore);
 */
/* 
TODO:number类型的转换  Use Number for type casting and parseInt always with a radix for parsing strings
 */ 
   /*  使指定值的所有位都右移规定的次数。
   值除以  2的0 次方   右移运算符 value >> num
   右移一位相当于除2，右移n位相当于除以2的n次方。
　　右移的规则只记住一点：符号位不变，左边补上符号位 */
/* 
const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad
const val = inputValue >> 0;

// bad
const val = parseInt(inputValue);

// !good
const val = Number(inputValue);

// !good
const val = parseInt(inputValue, 10);
*/
/* 
TODO: Note: Be careful when using bitshift operations. Numbers are represented as 64-bit values, but bitshift operations always return a 32-bit integer (source). Bitshift can lead to unexpected behavior for integer values larger than 32 bits. Discussion. Largest signed 32-bit Int is 2,147,483,647:
*js 位运算符的限制：32位

2147483647 >> 0; // => 2147483647
2147483648 >> 0; // => -2147483648
2147483649 >> 0; // => -2147483647
 */
/* 
TODO:布尔值的转换
 */
/* 
const age = 0;

// bad
const hasAge = new Boolean(age);

// !good
const hasAge = Boolean(age);

// !best
const hasAge = !!age;
 */
