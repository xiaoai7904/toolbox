---
title: "Async Functions"
date: 2019-11-23 15:30
tags:
 - javascript
---

Chrome 55 中默认情况下启用异步函数，坦率地讲，它们的作用相当不可思议。 可以利用它们像编写同步代码那样编写基于 Promise 的代码，而且还不会阻塞主线程。 它们可以让异步代码“智商”下降、可读性提高。

异步函数的工作方式是这样的：

```javascript
async function myFirstAsyncFunction() {
  try {
    const fulfilledValue = await promise;
  }
  catch (rejectedValue) {
    // …
  }
}
```

如果在函数定义之前使用了 async 关键字，就可以在函数内使用 await。 当您 await 某个 Promise 时，函数暂停执行，直至该 Promise 产生结果，并且暂停并不会阻塞主线程。 如果 Promise 执行，则会返回值。 如果 Promise 拒绝，则会抛出拒绝的值。
<!--more-->

#### 示例

假设我们想获取某个网址并以文本形式记录响应日志。以下是利用 Promise 编写的代码：

```javascript
function logFetch(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log(text);
    }).catch(err => {
      console.error('fetch failed', err);
    });
}
```

以下是利用异步函数具有相同作用的代码：

```javascript
async function logFetch(url) {
  try {
    const response = await fetch(url);
    console.log(await response.text());
  }
  catch (err) {
    console.log('fetch failed', err);
  }
}
```

代码行数虽然相同，但去掉了所有回调。这可以提高代码的可读性，对不太熟悉 Promise 的人而言，帮助就更大了。

#### 异步函数返回值

无论是否使用 await，异步函数都会返回 Promise。该 Promise 解析时返回异步函数返回的任何值，拒绝时返回异步函数抛出的任何值。

```javascript
// wait ms milliseconds
function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function hello() {
  await wait(500);
  return 'world';
}
```

调用 hello() 返回的 Promise 会在执行时返回 "world"。

```javascript
async function foo() {
  await wait(500);
  throw Error('bar');
}
```

#### 其他异步函数语法

我们已经见识了 async function() {}，但 async 关键字还可用于其他函数语法：

##### 箭头函数

```javascript
// map some URLs to json-promises
const jsonPromises = urls.map(async url => {
  const response = await fetch(url);
  return response.json();
});
```

##### 对象方法

```javascript
const storage = {
  async getAvatar(name) {
    const cache = await caches.open('avatars');
    return cache.match(`/avatars/${name}.jpg`);
  }
};

storage.getAvatar('jaffathecake').then(…);
```

##### 类方法

```javascript
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jaffathecake').then(…);
```
