/* 
TODO:Prefix jQuery object variables with a $. 
// bad
const sidebar = $('.sidebar');

// good
*const $sidebar = $('.sidebar');

// good
*const $sidebarBtn = $('.sidebar-btn');
*/
/* 
TODO:Cache jQuery lookups.
// bad
function setSidebar() {
  *$('.sidebar').hide();

  // ...

  *$('.sidebar').css({
    'background-color': 'pink',
  });
}

// good
function setSidebar() {
  *const $sidebar = $('.sidebar');
  $sidebar.hide();

  // ...

  $sidebar.css({
    'background-color': 'pink',
  });
}
 */
/*
 TODO:Use find with scoped jQuery object queries.
// bad
$('ul', '.sidebar').hide();

// bad
$('.sidebar').find('ul').hide();

// good
$('.sidebar ul').hide();

// good
$('.sidebar > ul').hide();

// good
$sidebar.find('ul').hide();
 */
/* 

TODO: Use Number.isNaN instead of global isNaN,Use Number.isFinite instead of global isFinite
// bad
isNaN('1.2'); // false
isNaN('1.2.3'); // true

// good
Number.isNaN('1.2.3'); // false
Number.isNaN(Number('1.2.3')); // true
// bad
isFinite('2e3'); // true

// good
Number.isFinite('2e3'); // false
Number.isFinite(parseInt('2e3', 10)); // true
*/