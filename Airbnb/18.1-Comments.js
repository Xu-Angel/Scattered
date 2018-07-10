/* FIXME:Comments */
/* 
TODO:Use // for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it’s on the first line of a block.

*注释行不要和代码行在一起
// bad
const active = true;  // is current tab
// good
// is current tab
const active = true;
// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  const type = this.type || 'no type';
  return type;
}
// !good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}
// also good
function getType() {
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}
*/
/* 
TODO:Start all comments with a space to make it easier to read. 注释前空格
 */
/*
// bad
//is current tab
const active = true;

// good
// is current tab
const active = true;

// bad
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make(tag) {
  // ...
  return element;
}
// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {
  // ...
  return element;
}
