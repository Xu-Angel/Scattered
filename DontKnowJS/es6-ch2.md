```js
function foo(x,y,...z) {
	console.log( x, y, z );
}

foo( 1,2,3,4,5 );  // [3 4 5] 
```

```js
var a = [2, 3, 4]
var b = [1, ...a, 5]
console.log(b) // [1,2,3,4,5]
```

> 展开运算符在函数参数上的运用
```js
// doing things the new ES6 way
function foo(...args) {
	// `args` is already a real array

	// discard first element in `args`
	args.shift();

	// pass along all of `args` as arguments
	// to `console.log(..)`
	console.log( ...args );
}

// doing things the old-school pre-ES6 way
function bar() {
	// turn `arguments` into a real array
	var args = Array.prototype.slice.call( arguments );

	// add some elements on the end
	args.push( 4, 5 );

	// filter out odd numbers
	args = args.filter( function(v){
		return v % 2 == 0;
	} );

	// pass along all of `args` as arguments
	// to `foo(..)`
	foo.apply( null, args );
}

bar( 0, 1, 2, 3 );			
```
默认参数对于null,undefined处理
```js
function foo(x = 11, y = 31) {
	console.log( x + y );
}

foo();					// 42
foo( 5, 6 );			// 11
foo( 0, 42 );			// 42

foo( 5 );				// 36
foo( 5, 'undefined' );	// 5undefined
foo( 5, null );			// 5  <-- null coerces to `0`

foo( undefined, 6 );	// 17 <-- `undefined` is missing
foo( null, 6 );			// 6  <-- null coerces to `0`
```
默认参数定义问题
```js
var w = 1, z = 2;

function foo( x = w + 1, y = x + 1, z = z + 1 ) {
	console.log( x, y, z );
}

foo();					// ReferenceError
The w in the w + 1 default value expression looks for w in the formal parameters' scope, but does not find it, so the outer scope's w is used. Next, The x in the x + 1 default value expression finds x in the formal parameters' scope, and luckily x has already been initialized, so the assignment to y works fine.

However, the z in z + 1 finds z as a not-yet-initialized-at-that-moment parameter variable, so it never tries to find the z from the outer scope.
```

> 结构赋值 Remember: the purpose of destructuring is not just less typing, but more declarative readability.
```js
var { x, y, z } = bar();

console.log( x, y, z );				// 4 5 6

/**If you can write the shorter form, why would you ever write out the longer form? Because that longer form actually allows you to assign a property to a different variable name, which can sometimes be quite useful:**/
var { x: bam, y: baz, z: bap } = bar();

console.log( bam, baz, bap );		// 4 5 6
console.log( x, y, z );				// ReferenceError
```
```js
var { a: { x: X, x: Y }, a } = { a: { x: 1 } };

X;	// 1
Y;	// 1
a;	// { x: 1 }

( { a: X, a: Y, a: [ Z ] } = { a: [ 1 ] } );

X.push( 2 );
Y[0] = 10;

X;	// [10,2]
Y;	// [10,2]
Z;	// 1
```

> Destructuring Assignment Expressions   结构赋值都是引用
```js
The assignment expression with object or array destructuring has as its completion value the full righthand object/array value. Consider:

var o = { a:1, b:2, c:3 },
	a, b, c, p;

p = { a, b, c } = o;

console.log( a, b, c );			// 1 2 3
p === o;						// true
```

In the previous snippet, p was assigned the o object reference, not one of the a, b, or c values. The same is true of array destructuring:
```js
var o = [1,2,3],
	a, b, c, p;

p = [ a, b, c ] = o;

console.log( a, b, c );			// 1 2 3
p === o;						// true
```
 > By carrying the object/array value through as the completion, you can chain destructuring assignment expressions together: 链式写法
```js
var o = { a:1, b:2, c:3 },
	p = [4,5,6],
	a, b, c, x, y, z;

( {a} = {b,c} = o );
[x,y] = [z] = p;

console.log( a, b, c );			// 1 2 3
console.log( x, y, z );			// 4 5 4
```