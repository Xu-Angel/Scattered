//!角谷定理 */
/* https://juejin.im/post/5acdd7486fb9a028ca53547c  尾调用 尾递归 */
// https://juejin.im/post/59c1d91d6fb9a00a53275f79
/* 对于一个大于1的整数n，如果n是偶数，则n = n / 2。如果n是奇数，则n = 3 * n - 1。反复操作后，n一定为1。 */
// Question1—Fibonacci 数列第N项
var fib = function (n){
  if(n<=2){
    return 1;
  }
  return fib(n-1) + fib(n-2);  
}
console.log(fib(5));
// 上面是递归实现。

var fib = function (n){
  var a1=1,a2=1,a3=0;
  if(n<=2){
    return 1;
  }
  for(var i = 0;i < n-1;i++){
    a3 = a1 + a2;
    a1 = a2;
    a2 = a3;
  }
  return a3;  
}
console.log(fib(5));
// 上面是循环实现。

// Question2—一共10级楼梯，每次可以走一步或两步，求一共多少种走法。
// 思路：要想走到N(N=10)级,可以分为2种情况。

// 从n-2级迈两步
// 从n-1级迈一步
// 那么对于n-2和n-1的情况也是各自分为两种，以此类推。

// 那么走法的和就是n-2的走法和n-1的走法之和。

/* 那么递归到最基本的（当前人在第0阶台阶）

第0阶台阶：0

第1阶台阶：1

第2阶台阶：2（1+1或者2）

得到公式，也就是斐波那契数列。
 */

var fib = function (n){
  if(n == 1){
    return 1;
  }else if(n==2){
    return 2;
  }else if(n>2){
    return fib(n-1) + fib(n-2);
  }
}
console.log(fib(10));

/* Question3—1个细胞，一个小时分裂一次，生命周期是3小时，求n小时后容器内，有多少细胞。

思路：

细胞的生存周期是3个小时，那我们就可以把细胞在题目中状态分为以下几个状态：

a：刚分裂态——由前一小时的a,b,c分裂出
b：分裂1小时态——由前一小时a长成
c：分裂2小时态——由前一小时b长成
d：分裂3小时态——死亡的细胞。由前一小时c长成,和之前的d一起组成。
那么，我们就可以根据细胞状态设定函数。分析每一个状态的来源是哪里即可。


容器中存活的细胞数目就是a、b、c三种状态数量的总和。 */

var afib = function (n){
  if(n===0){return 1;} //初始的那个细胞
  return afib(n-1)+bfib(n-1)+cfib(n-1);
}
var bfib = function(n){
  if(n===0){return 0;} //一个小时之后才会生成
  return afib(n-1);
}
var cfib = function(n){
  if(n===0||n===1){return 0;} //前两小时还没生成
  return bfib(n-1);
}
 
var time = 3;
console.log(afib(time)+bfib(time)+cfib(time));


/* 总结：

递归的两个必要因素：

     递归方程，递归结束条件。

算法核心：

在有限次可预见性结果中，找到结果与上一次结果之间的关系。
f(n)与f(n-1)的关系有时候很简单，如同走楼梯，状态单一；又有时如同细胞分裂，多种状态组合影响结果。
关键在于梳理清楚本次结果和上一次结果的关系有哪些方面或是因素。
在草稿纸上写出前几次的结果，或者画图，这样更容易找到规律，这种规律实际上就是递归方程。
在算法的分析中，当一个算法中包含递归调用时，其时间复杂度的分析会转化成为一个递归方程的求解。
---------------------  */
