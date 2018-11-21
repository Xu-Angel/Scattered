const m = new Map ()
const o = new Date()
m.set(o, 'hi')
console.log(m);  //Map { 2018-11-21T09:32:43.264Z => 'hi' }
console.log(m.get(o));  //hi

const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

console.log(new Map([['name', 'miaomi'], ['sex', 'man']])) // Map { 'name' => 'miaomi', 'sex' => 'man' }