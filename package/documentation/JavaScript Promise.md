---
title: "JavaScript Promise"
date: 2019-11-23 10:43
tags:
 - javascript
---

JavaScript 是单线程工作，这意味着两段脚本不能同时运行，而是必须一个接一个地运行。 在浏览器中，JavaScript 与因浏览器而异的其他 N 种任务共享一个线程。 但是通常情况下 JavaScript 与绘制、更新样式和处理用户操作（例如，高亮显示文本以及与格式控件交互）处于同一队列。 操作其中一项任务会延迟其他任务。

<!--more-->

### 介绍
我们人类是多线程工作。 您可以使用多个手指打字，可以一边开车一边与人交谈。 唯一一个会妨碍我们的是打喷嚏，因为当我们打喷嚏的时候，所有当前进行的活动都必须暂停。 这真是非常讨厌，尤其是当您在开车并想与人交谈时。 您可不想编写像打喷嚏似的代码。

您可能已使用事件和回调来解决该问题。 以下是一些事件：

```javascript
var img1 = document.querySelector('.img-1');

img1.addEventListener('load', function() {
  // woo yey image loaded
});

img1.addEventListener('error', function() {
  // argh everything's broken
});
```

这可不会像打喷嚏那样打断您。 我们获得图像、添加几个侦听器，之后 JavaScript 可停止执行，直至其中一个侦听器被调用。

遗憾的是，在上例中，事件有可能在我们开始侦听之前就发生了，因此我们需要使用图像的“complete”属性来解决该问题：

```javascript
var img1 = document.querySelector('.img-1');

function loaded() {
  // woo yey image loaded
}

if (img1.complete) {
  loaded();
}
else {
  img1.addEventListener('load', loaded);
}

img1.addEventListener('error', function() {
  // argh everything's broken
});
```

这不会捕获出错的图像，因为在此之前我们没有机会侦听到错误。遗憾的是，DOM 也没有给出解决之道。 而且，这还只是加载一个图像，如果加载一组图像，情况会更复杂。

### 事件不一定是最佳方法

事件对于同一对象上发生多次的事情（如 keyup、touchstart 等）非常有用。 对于这些事件，实际您并不关注在添加侦听器之前所发生的事情。 但是，如果关系到异步成功/失败，理想的情况是您希望：

```javascript
img1.callThisIfLoadedOrWhenLoaded(function() {
  // loaded
}).orIfFailedCallThis(function() {
  // failed
});

// and…
whenAllTheseHaveLoaded([img1, img2]).callThis(function() {
  // all loaded
}).orIfSomeFailedCallThis(function() {
  // one or more failed
});
```

这是 promise 所执行的任务，但以更好的方式命名。 如果 HTML 图像元素有一个返回 promise 的“ready”方法，我们可以执行：

```javascript
img1.ready().then(function() {
  // loaded
}, function() {
  // failed
});

// and…
Promise.all([img1.ready(), img2.ready()]).then(function() {
  // all loaded
}, function() {
  // one or more failed
});
```

最基本的情况是，promise 有点类似于事件侦听器，但有以下两点区别：

* promise 只能成功或失败一次， 而不能成功或失败两次，也不能从成功转为失败或从失败转为成功。
* 如果 promise 已成功或失败，且您之后添加了成功/失败回调，则将会调用正确的回调，即使事件发生在先也是如此。

这对于异步成功/失败尤为有用，因为您可能对某些功能可用的准确时间不是那么关注，更多地是关注对结果作出的反应。

### Promise 术语

* 已执行 - 与 promise 相关的操作成功
* 已拒绝 - 与 promise 相关的操作失败
* 待定 - 尚未执行或拒绝
* 已解决 - 已执行或拒绝

### Promise 在 JavaScript 中受支持！

Promise 有一段时间以库的形式出现，例如：

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

以上这些与 JavaScript promise 都有一个名为 [Promise/A+](https://github.com/promises-aplus/promises-spec) 的常见标准化行为。 如果您是 jQuery 用户，他们还有一个名为 Deferred 的相似行为。 但是，Deferred 与 Promise/A+ 不兼容，这就使得其存在细微差异且没那么有用，因此需注意。 此外，jQuery 还有 Promise 类型，但它只是 Deferred 的子集，因此仍存在相同的问题。

尽管 promise 实现遵照标准化行为，但其整体 API 有所不同。 JavaScript promise 在 API 中类似于 RSVP.js。 下面是创建 promise 的步骤：

```javascript
var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…

  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});
```

Promise 构造函数包含一个参数和一个带有 resolve（解析）和 reject（拒绝）两个参数的回调。 在回调中执行一些操作（例如异步），如果一切都正常，则调用 resolve，否则调用 reject。

与普通旧版 JavaScript 中的 throw 一样，通常拒绝时会给出 Error 对象，但并不是必须的。 Error 对象的优点在于其能够捕捉堆叠追踪，因而使得调试工具非常有用。

以下是有关 promise 的使用示例：

```javascript
promise.then(function(result) {
  console.log(result); // "Stuff worked!"
}, function(err) {
  console.log(err); // Error:"It broke"
});
```

then() 包含两个参数：一个用于成功情形的回调和一个用于失败情形的回调。 这两个皆可选，因此您可以只添加一个用于成功情形或失败情形的回调。

JavaScript promise 最初是在 DOM 中出现并称为“Futures”，之后重命名为“Promises”，最后又移入 JavaScript。 在 JavaScript 中使用比在 DOM 中更好，因为它们将在如 Node.js 等非浏览器 JS 环境中可用（而它们是否会在核心 API 中使用 Promise 则是另外一个问题）。

尽管它们是 JavaScript 的一项功能，但 DOM 也能使用。 实际上，采用异步成功/失败方法的所有新 DOM API 均使用 promise。

### 浏览器支持和 polyfill
现在，promise 已在各浏览器中实现。

自 Chrome 32、Opera 19、Firefox 29、Safari 8 和 Microsoft Edge 起，promise 默认启用。

如要使没有完全实现 promise 的浏览器符合规范，或向其他浏览器和 Node.js 中添加 promise，请查看 [polyfill](https://github.com/jakearchibald/ES6-Promises#readme) （gzip 压缩大小为 2k）。

### 与其他库的兼容性
JavaScript promise API 将任何使用 then() 方法的结构都当作 promise 一样（或按 promise 的说法为 thenable）来处理，因此，如果您使用返回 Q promise 的库也没问题，因为它能与新 JavaScript promise 很好地兼容。

如我之前所提到的，jQuery 的 Deferred 不那么有用。 幸运的是，您可以将其转为标准 promise，而且越早越好：

```javascript
var jsPromise = Promise.resolve($.ajax('/whatever.json'))
```
这里，jQuery 的 $.ajax 返回一个 Deferred。 由于它使用 then() 方法，因此 Promise.resolve() 可将其转为 JavaScript promise。 但是，有时 deferred 会将多个参数传递给其回调，例如：

```javascript
var jqDeferred = $.ajax('/whatever.json');

jqDeferred.then(function(response, statusText, xhrObj) {
  // ...
}, function(xhrObj, textStatus, err) {
  // ...
})
```

而 JS promise 会忽略除第一个之外的所有参数：

```javascript
jsPromise.then(function(response) {
  // ...
}, function(xhrObj) {
  // ...
})
```

幸好，通常这就是您想要的，或者至少为您提供了方法让您获得所想要的。 另请注意，jQuery 不遵循将 Error 对象传递到 reject 这一惯例。

### 错误处理

正如我们之前所看到的，then() 包含两个参数：一个用于成功，一个用于失败（按照 promise 中的说法，即执行和拒绝）：

```javascript
get('story.json').then(function(response) {
  console.log("Success!", response);
}, function(error) {
  console.log("Failed!", error);
})
```

您还可以使用 catch()：

```javascript
get('story.json').then(function(response) {
  console.log("Success!", response);
}).catch(function(error) {
  console.log("Failed!", error);
})
```

catch() 没有任何特殊之处，它只是对 then(undefined, func) 锦上添花，但可读性更强。 注意，以上两个代码示例行为并不相同，后者相当于：

```javascript
get('story.json').then(function(response) {
  console.log("Success!", response);
}).then(undefined, function(error) {
  console.log("Failed!", error);
})
```

两者之间的差异虽然很微小，但非常有用。 Promise 拒绝后，将跳至带有拒绝回调的下一个 then()（或具有相同功能的 catch()）。 如果是 then(func1, func2)，则 func1 或 func2 中的一个将被调用，而不会二者均被调用。 但如果是 then(func1).catch(func2)，则在 func1 拒绝时两者均被调用，因为它们在该链中是单独的步骤。 看看下面的代码：

```javascript
asyncThing1().then(function() {
  return asyncThing2();
}).then(function() {
  return asyncThing3();
}).catch(function(err) {
  return asyncRecovery1();
}).then(function() {
  return asyncThing4();
}, function(err) {
  return asyncRecovery2();
}).catch(function(err) {
  console.log("Don't worry about it");
}).then(function() {
  console.log("All done!");
})
```

### Promise API 参考

除非另有说明，所有方法在 Chrome、Opera、Firefox、Microsoft Edge 和 Safari 中均可使用。 [polyfill](https://github.com/jakearchibald/ES6-Promises#readme) 为所有浏览器提供以下方法。

##### 静态方法
|     方法     |              描述                |
| ------------ | ------------------------------- |
| Promise.resolve(promise) | 返回 promise（仅当 promise.constructor == Promise 时） |
| Promise.resolve(thenable) | 从 thenable 中生成一个新 promise。 thenable 是具有 `then()` 方法的类似于 promise 的对象。 |
| Promise.resolve(obj)|在此情况下，生成一个 promise 并在执行时返回 obj |
| Promise.reject(obj) | 生成一个 promise 并在拒绝时返回 obj。 为保持一致和调试（例如 堆叠追踪），obj 应为 instanceof Error。 |
| Promise.all(array) | 	生成一个 promise，该 promise 在数组中各项执行时执行，在任意一项拒绝时拒绝。 每个数组项均传递给 Promise.resolve，因此数组可能混合了类似于 promise 的对象和其他对象。 执行值是一组有序的执行值。 拒绝值是第一个拒绝值。 |
| Promise.race(array) | 生成一个 Promise，该 Promise 在任意项执行时执行，或在任意项拒绝时拒绝，以最先发生的为准 |

##### 构造函数
|     构造函数     |                              |
| ------------ | ------------------------------- |
| new Promise(function(resolve, reject) {}); | resolve(thenable): Promise 依据 thenable 的结果而执行/拒绝 <br/><br/>resolve(obj): promise 执行并返回 <br/><br/>obj reject(obj): promise 拒绝并返回 obj。 为保持一致和调试（例如堆叠追踪），obj 应为 instanceof Error。 在构造函数回调中引发的任何错误将隐式传递给 reject()。|

##### 实例方法

|     实例方法     |                              |
| ------------ | ------------------------------- |
| promise.then(onFulfilled, onRejected) | 当/如果“promise”解析，则调用 onFulfilled。 当/如果“promise”拒绝，则调用 onRejected。 两者均可选，如果任意一个或两者都被忽略，则调用链中的下一个 onFulfilled/onRejected。 两个回调都只有一个参数：执行值或拒绝原因。 then() 将返回一个新 promise，它相当于从 onFulfilled/onRejected 返回的值 （通过 Promise.resolve 传递之后）。 如果在回调中引发了错误，返回的 promise 将拒绝并返回该错误。|
promise.catch(onRejected) | 对 promise.then(undefined, onRejected)|

