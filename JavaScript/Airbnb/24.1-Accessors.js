/* FIXME:Accessors */
/* 
TODO:If the property/method is a boolean, use isVal() or hasVal()
 */
/* 
// bad
if (!dragon.age()) {
  return false;
}

// good
if (!dragon.hasAge()) {
  return false;
}
*/
/* 
TODO:It’s okay to create get() and set() functions, but be consistent.
: */
/* 
class Jedi {
  constructor(options = {}) {
    const lightsaber = options.lightsaber || 'blue';
    this.set('lightsaber', lightsaber);
  }

  set(key, val) {
    this[key] = val;
  }

  get(key) {
    return this[key];
  }
}
 */