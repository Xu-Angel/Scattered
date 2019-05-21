
// 基于传统面向对象语言的模仿
// 一堆堆performance就是各个小策略
var performanceS = function () { };

performanceS.prototype.calculate = function( salary ){
    return salary * 4;
};

var performanceA = function(){};

performanceA.prototype.calculate = function( salary ){
    return salary * 3;
};

var performanceB = function(){};

performanceB.prototype.calculate = function( salary ){
    return salary * 2;
};

var Bonus = function(){
  this.salary = null;      // 原始工资
  this.strategy = null;    // 绩效等级对应的策略对象
};

Bonus.prototype.setSalary = function( salary ){
  this.salary = salary;    // 设置员工的原始工资
};

// 传入 互换策略对象
Bonus.prototype.setStrategy = function( strategy ){
    this.strategy = strategy;    // 设置员工绩效等级对应的策略对象
};

Bonus.prototype.getBonus = function(){    // 取得奖金数额
    return this.strategy.calculate( this.salary );    // 把计算奖金的操作委托给对应的策略对象
};

var bonus = new Bonus();

bonus.setSalary( 10000 );
bonus.setStrategy( new performanceS() );  // 设置策略对象

console.log( bonus.getBonus() );    // 输出：40000

bonus.setStrategy( new performanceA() );  // 设置策略对象
console.log( bonus.getBonus() );    // 输出：30000