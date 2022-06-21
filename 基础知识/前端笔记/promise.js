/**
Promise 类有 .then() .catch() 和 .finally() 三个方法，这三个方法的参数都是一个函数
    .then() 可以将参数中的函数添加到当前 Promise 的正常执行序列  返回的是一个Promise对象
    .catch() 则是设定 Promise 的异常处理序列
    .finally() 是在 Promise 执行的最后一定会执行的序列

tips:  .then() 传入的函数会按顺序依次执行，有任何异常都会直接跳到 catch 序列：

 */
new Promise(function (resolve, reject) {
    console.log(1111);
    resolve(2222);
}).then(function (value) {
    console.log(value);
    return 3333;
}).then(function (value) {
    console.log(value);
    throw "An error";
}).catch(function (err) {
    console.log(err);
});
//执行结果：
/** 
1111
2222
3333
An error
*/


//resolve() 中可以放置一个参数用于向下一个 then 传递一个值，then 中的函数也可以返回一个值传递给 then。
//reject() 参数中一般会传递一个异常给之后的 catch 函数用于处理异常。

/**
 注意以下两点：

1.resolve 和 reject 的作用域只有起始函数，不包括 then 以及其他序列；
2.resolve 和 reject 并不能够使起始函数停止运行，别忘了 return。
 */

/**
 * 回答常见的问题（FAQ）
 */
/**
Q: then、catch 和 finally 序列能否顺序颠倒？
A: 可以，效果完全一样。但不建议这样做，最好按 then-catch-finally 的顺序编写程序。

Q: 除了 then 块以外，其它两种块能否多次使用？
A: 可以，finally 与 then 一样会按顺序执行，但是 catch 块只会执行第一个，除非 catch 块里有异常。所以最好只安排一个 catch 和 finally 块。

Q: then 块如何中断？
A: then 块默认会向下顺序执行，return 是不能中断的，可以通过 throw 来跳转至 catch 实现中断。

Q: 什么时候适合用 Promise 而不是传统回调函数？
A: 当需要多次顺序执行异步操作的时候，例如，如果想通过异步方法先后检测用户名和密码，需要先异步检测用户名，然后再异步检测密码的情况下就很适合 Promise。

Q: Promise 是一种将异步转换为同步的方法吗？
A: 完全不是。Promise 只不过是一种更良好的编程风格。

Q: 什么时候我们需要再写一个 then 而不是在当前的 then 接着编程？
A: 当你又需要调用一个异步任务的时候。
 */


//async 

function prints(delay, message) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(message);
            resolve();
        }, delay);
    });
}
//纯promise写法
prints(1000, "First").then(function () {
    return prints(4000, "Second");
}).then(function () {
    prints(3000, "Third");
});
//async写法
async function asyncFunc() {
    await prints(1000, "First");
    await prints(4000, "Second");
    await prints(3000, "Third");
}
asyncFunc();

//await 指令后必须跟着一个 Promise,异步函数会在这个 Promise 运行中暂停，直到其运行结束再继续运行。


//处理异常的机制将用 try-catch 块实现：
async function asyncFunc() {
    try {
        await new Promise(function (resolve, reject) {
            throw "Some error"; // 或者 reject("Some error")
        });
    } catch (err) {
        console.log(err);
        // 会输出 Some error
    }
}
asyncFunc();

//如果 Promise 有一个正常的返回值，await 语句也会返回它：

async function asyncFunc() {
    let value = await new Promise(
        function (resolve, reject) {
            resolve("Return value");
        }
    );
    console.log(value);
}
asyncFunc();

//程序会输出:
//Return value


/**
 Node 中的“微任务(microtasks)其实是一个统称，包含了两部分：
process.nextTick() 注册的回调 （nextTick task queue）
promise.then() 注册的回调 （promise task queue）
Node 在执行微任务时， 会优先执行 nextTick task queue 中的任务，执行完之后会接着执行 promise task queue 中的任务。
所以如果 process.nextTick 的回调与 promise.then 的回调都处于主线程或事件循环中的同一阶段， process.nextTick 的回调要优先于 promise.then 的回调执行。
 */