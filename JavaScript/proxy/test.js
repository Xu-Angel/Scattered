const handler = {
  get(target, name) {
    return name in target ? target[name] : 'defalut'
  }
}

const p = new Proxy({}, handler)

p.a = 1
p.b = undefined

console.log(p.a, p.b, p); // 1 undefined { a: 1, b: undefined }
console.log('c' in p, p.c); // false 'defalut'

// 无操作转发

~function(){
  let target = {}
  let p = new Proxy(target, {})
  p.a = 44
  console.log(target,target.a); // { a: 44 } 44
}

// 验证

~function () {
  const validator = {
    set(obj,prop,value) {
      if (prop === 'age') {
        if (!Number.isInteger(value)) {
          throw new TypeError('The age is not an integer');
        }
        if (value > 200) {
          throw new RangeError('The age seems invalid');
        }
      }
      // return value
      obj[prop] = value
    }
  }
  
  let person = new Proxy({}, validator)
  
  person.age = 100
  console.log(person.age)
  // 100
  person.age = 'young'; 
  // 抛出异常: Uncaught TypeError: The age is not an integer
  
  person.age = 300; 
  // 抛出异常: Uncaught RangeError: The age seems invalid
}

// 方法代理可以轻松地通过一个新构造函数来扩展一个已有的构造函数。
void function () {
  function extend(sup,base) {
    var descriptor = Object.getOwnPropertyDescriptor(
      base.prototype,"constructor"
    );
    base.prototype = Object.create(sup.prototype);
    var handler = {
      construct: function(target, args) {
        var obj = Object.create(base.prototype);
        this.apply(target,obj,args);
        return obj;
      },
      apply: function(target, that, args) {
        sup.apply(that,args);
        base.apply(that,args);
      }
    };
    var proxy = new Proxy(base,handler);
    descriptor.value = proxy;
    Object.defineProperty(base.prototype, "constructor", descriptor);
    return proxy;
  }
  
  var Person = function(name){
    this.name = name
  };
  
  var Boy = extend(Person, function(name, age) {
    this.age = age;
  });
  
  Boy.prototype.sex = "M";
  
  var Peter = new Boy("Peter", 13);
  console.log(Peter.sex);  // "M"
  console.log(Peter.name); // "Peter"
  console.log(Peter.age);  // 13
}()