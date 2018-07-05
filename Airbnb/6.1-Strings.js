/* FIXME:Strings */
/* TODO:字符串折行 Strings that cause the line to go over 100 characters should not be written across multiple lines using string concatenation.
Why? Broken strings are painful to work with and make code less searchable.*/
/* // bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';
// bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';
// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.'; */
/* TODO: NO --- eval() Never use eval() on a string, it opens too many vulnerabilities. eslint */