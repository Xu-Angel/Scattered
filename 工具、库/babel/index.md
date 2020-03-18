# 

[Babel：plugin、preset的区别与使用](https://www.chyingp.com/posts/understanding-babel-plugin-and-preset/)

[Plugins](https://babeljs.io/docs/en/plugins/)

## Babel Plugin简介
Babel是代码转换器，比如将ES6转成ES5，或者将JSX转成JS等。借助Babel，开发者可以提前用上新的JS特性，这对生产力的提升大有帮助。

实现Babel代码转换功能的核心，就是Babel插件（plugin）。

## Babel Preset简介
Babel插件一般尽可能拆成小的力度，开发者可以按需引进。比如对ES6转ES5的功能，Babel官方拆成了20+个插件。

这样的好处显而易见，既提高了性能，也提高了扩展性。比如开发者想要体验ES6的箭头函数特性，那他只需要引入transform-es2015-arrow-functions插件就可以，而不是加载ES6全家桶。

但很多时候，逐个插件引入的效率比较低下。比如在项目开发中，开发者想要将所有ES6的代码转成ES5，插件逐个引入的方式令人抓狂，不单费力，而且容易出错。

这个时候，可以采用Babel Preset。

## Plugin与Preset执行顺序
可以同时使用多个Plugin和Preset，此时，它们的执行顺序非常重要。

先执行完所有Plugin，再执行Preset。
多个Plugin，按照声明次序顺序执行。
多个Preset，按照声明次序逆序执行。