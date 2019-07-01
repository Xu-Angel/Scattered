

## 为什么要单元测试

 　　当新的版本快要发布的时候，大家都忙于加班，加紧修复BUG1、BUG2。我想这就是很多公司开发的现状。 为了不至于让上线的版本挂掉挂掉，少不了就是 `人肉测试`。

​	随着项目规模越来越大，逻辑和数据将会变的更复杂；模块负责人的变更，新员工的入职，由于对逻辑和数据结构的不熟悉，为了避免牵一发而动全的风险，导致重复代码堆积。而单元测试更像一个框架、脚手架，让开发更顺畅，代码质量更健壮。

## 单元测试开发驱动

#### TDD 测试驱动开发（Test Driven Development）

　　测试驱动开发（Test Driven Development,英文缩写TDD）是极限编程的一个重要组成部分，它的基本思想就是在开发功能代码之前，先编写测试代码。也就是说在明确要开发某个功能后，首先思考如何对这个功能进行测试，并完成测试代码的编写，然后编写相关的代码满足这些测试用例。然后循环进行添加其他功能，直到完成全部功能的开发。代码整洁可用(clean code that works) 是测试驱动开发所追求的目的

#### BDD 行为驱动开发（Behaviour Driven Development）

行为驱动开发是测试驱动开发的进化，但关注的核心是设计。行为驱动开发中，定义系统的行为是主要工作，而对系统行为的描述则变成了测试标准。在行为驱动开发中，我们需要使用通用语言来定义系统行为。而通用语言，实际上是一个最小化的词汇表。我们使用这些词汇来书写故事。选入词汇表的词汇必须具有准确无误的表达能力和一致的含义。

## 单元测试框架

#### Jasmine

　　Jasmine不依赖于任何框架，所以适用于所有的Javascript代码。使用一个全局函数 describe 来描述每个测试，并且可以嵌套。describe函数有2个参数，一个是字符串用于描述，一个是函数用于测试。在该函数中可以使用全局函数 it 来定义Specs，也就是单元测试的主要内容。

#### Mocha

　　Mocha非常得自由。Mocha将更多的方法集中在了describe和it中，比如异步的测试就非常棒，在it的回调函数中会获取一个参数 done ，类型是function，用于异步回调，当执行这个函数时就会继续测试。还可以使用 only 和 skip 去选择测试时需要的部分。Mocha的接口也一样自由，除了 BDD 风格和Jasmine类似的接   口，还有 TDD 风格的 （suite test setup teardown suiteSetup suiteTeardown），还有AMD风格的 exports ，Qunit风格等。同时测试报告也可以任意组织。

jest ava nightwatch

## 前端测试工具 Karma

#### fileName

```
xxx.spec.js xxx.test.js
```

 sinon 

### Mocha BDD and TDD

The **BDD** interface provides `describe()`, `context()`, `it()`, `specify()`, `before()`, `after()`, `beforeEach()`, and `afterEach()`.

The **TDD** interface provides `suite()`, `test()`, `suiteSetup()`, `suiteTeardown()`, `setup()`, and `teardown()`:

**Test Suite**

由上可知，TDD的接口使用的是suite。那这里必须要介绍下Test Suite的概念

其实suite就是一组测试用例的集合，可用于对测试用例进行分类。suite里面可以嵌套suite，就像测一个功能的一组测试例子里面再细分测不同小功能的机组测试例子。

**Test Case测试用例的结构**

我们在写测试用例时，一个被广泛接受的结构是：

a. **Setup**: 准备好环境和数据，跑这个测试用例之前的准备

b. **Execution**：执行测试（测试用例的实现的主要代码）

c. **Validation**：验证结果

d. **Cleanup**：现场恢复，一般与a相反。不影响跑后面的测试用例。

```javascript
var assert = require('assert');
var mocha  = require('mocha');

var suite         = mocha.suite;
var setup         = mocha.setup;
var suiteSetup    = mocha.suiteSetup;
var test          = mocha.test;
var teardown      = mocha.teardown;
var suiteTeardown = mocha.suiteTeardown;

//test case
suite('Array', function(){
    
    suiteSetup(function(){
        //suiteSetup will run only 1 time in suite Array, before all suite 
        //...
        console.log('suitSetup...');
    });
    
    setup(function(){
        //setup will run 1 time before every suite runs in suite Array
        //...
        console.log('setup...');
    });

    suite('indexOf()', function(){
        test('should return -1 when not present', function(){
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });

    suite('indexOf2()', function(){
        test('should return not -1 when present', function(){
            assert.equal(0, [1, 2, 3].indexOf(1));
        });
    });

    teardown(function(){
        //teardown will run 1 time after every suite runs in suite Array
        //...
        console.log('teardown...');
    });

    suiteTeardown(function(){
        //suiteTeardown will run 1 time in suite Array, after all suits run over.
        //...
        console.log('suiteTeardown...'); 
    });
});
```

**具体的怎么做**

TDD开发时的基本要点

1. Tasking (将项目需要拆分成小的task)
2. Red (写测试代码，让其失败，变红)
3. Green (写实现代码，让其通过，变绿)
4. Refactor (重构，消失代码中的bad smell)
5. Repeat (重复以上步骤)

这就是TDD开发过程中的基本过程，我们就在 “红-绿-红-绿” 中完成我们的软件开发。





https://segmentfault.com/a/1190000011362879

http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html
