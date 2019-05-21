/* 
实际上在JavaScript语言中，函数也是对象，所以更简单和直接的做法是把strategy直接定义为函数
*/

var strategies = {
  "S": function (salary) {
    return salary * 4
  },
  "A": function (salary) {
    return salary * 3
  },
  "B": function (salary) {
    return salary * 2
  }
}
/* 
同样，Context也没有必要必须用Bonus类来表示，我们依然用calculateBonus 函数充当Context来接受用户的请求。经过改造，代码的结构变得更加简洁：
*/

var calculateBonus = function (level, salary) {
  return strategies[level](salary)
}

console.log( calculateBonus( 'S', 20000 ) );     // 输出：80000
console.log( calculateBonus( 'A', 10000 ) );     // 输出：30000
