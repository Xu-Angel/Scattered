// 实现：输入一个定位值，查找 a,b 中 谁最近定位值，并返回 没有则返回定位值
clampNumber(2, 3, 5); // 3   输入2  在3  5 中查找距离2 最近的值
clampNumber(1, -1, -5); // -1  输入1 在-1  -5 中查找距离-1 最近的值
const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
clampNumber(2, 3, 5); // 3
clampNumber(1, -1, -5); // -1


/* 分支排名 
Computes the new ratings between two or more opponents using the Elo rating system. It takes an array of pre-ratings and returns an array containing post-ratings. The array should be ordered from best performer to worst performer (winner -> loser).

Use the exponent ** operator and math operators to compute the expected score (chance of winning). of each opponent and compute the new rating for each. Loop through the ratings, using each permutation to compute the post-Elo rating for each player in a pairwise fashion. Omit the second argument to use the default kFactor of 32
*/
const elo = ([...ratings], kFactor = 32, selfRating) => {
  const [a, b] = ratings;
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400));
  const newRating = (rating, i) =>
    (selfRating || rating) + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  if (ratings.length === 2) return [newRating(a, 1), newRating(b, 0)];

  for (let i = 0, len = ratings.length; i < len; i++) {
    let j = i;
    while (j < len - 1) {
      j++;
      [ratings[i], ratings[j]] = elo([ratings[i], ratings[j]], kFactor);
    }
  }
  return ratings;
};
EXAMPLES
// Standard 1v1s
elo([1200, 1200]); // [1216, 1184]
elo([1200, 1200], 64); // [1232, 1168]
// 4 player FFA, all same rank
elo([1200, 1200, 1200, 1200]).map(Math.round); // [1246, 1215, 1185, 1154]
/*
For teams, each rating can adjusted based on own team's average rating vs.
average rating of opposing team, with the score being added to their
own individual rating by supplying it as the third argument.
*/


/*  阶乘*/
const factorial = n =>
  n < 0
    ? (() => {
      throw new TypeError('Negative numbers are not allowed!');
    })()
    : n <= 1
      ? 1
      : n * factorial(n - 1);
factorial(6); // 720

/* . 斐波纳契（ */
const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );
fibonacci(6); // [0, 1, 1, 2, 3, 5]

/* 求公约数 */

const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};
gcd(8, 36); // 4
gcd(...[12, 8, 32]); // 4


/* 质数  素数 */
const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};
primes(10); // [2,3,5,7]

/* 是否为质数 */
const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (var i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};
isPrime(11); // true

/* 是否为偶数 */

const isEven = num => num % 2 === 0
isEven(3) // false

/* 是否可以被整除 */
const isDivisible = (dividend, divisor) => dividend % divisor === 0;
isDivisible(6, 3); // true

/* 字符串置换可能性 */
const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),
      []
    );
};
stringPermutations('abc'); // ['abc','acb','bac','bca','cab','cba']