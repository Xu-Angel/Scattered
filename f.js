/* const asy=async function(){
  await al(2);
  await al(3)
  return 888
  throw new Error('ao')
}
asy().then(v => {console.log(v);},e =>{console.log(e);}); */
async function f() {
  try {
    await setTimeout(() => {
      console.log('dd');
    }, 3500);
    console.log(555);
    await Promise.reject('error');
  }
  catch (e) {
    console.log(e);
  }
  await al(9);
  await al(9);
  await al(9);
  return await Promise.resolve('hello');
}