const  array = new Uint32Array(10)
window.crypto.getRandomValues(array)
console.log('lucky numbers')
for (let index = 0; index < array.length; index++) {
  console.log(array[index]);
}