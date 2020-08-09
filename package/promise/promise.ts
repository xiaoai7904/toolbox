export interface Thenable<T> {
  then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Thenable<U>
  then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): Thenable<U>
}
export interface Resolve<T> {
  (value?: T | Thenable<T>): void
}
export interface Reject {
  (error?: any): void
}
export interface Executor<T> {
  (resolve: Resolve<T>, reject: Reject): void
}
type statusType = 'pending' | 'fulfilled' | 'rejected'

export class XaPromise<T> {
  // 执行状态 pending | fulfilled | rejected
  ['[[PromiseStatus]]']: statusType = 'pending';
  ['[[PromiseValue]]']: any
  private callbacks: any[] = []

  constructor(executor: Executor<T>) {
    // 第一个参数必须为函数
    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver undefined is not a function')
    }
    // 检查是否是使用new操作符
    if (!(this instanceof XaPromise)) {
      throw new TypeError('必须使用new操作符')
    }

    this.initExecutor(executor)
  }

  private initExecutor(executor: Executor<T>) {
    try {
      executor(
        (value) => {
          this.resolve(value)
        },
        (reason) => {
          this.reject(reason)
        }
      )
    } catch (e) {
      this.reject(e)
    }
  }
  private setPromiseStatus(status: statusType) {
    this['[[PromiseStatus]]'] = status
    return this
  }
  private getPromiseStatus(): statusType {
    return this['[[PromiseStatus]]']
  }
  private setPromiseValue(value: any) {
    this['[[PromiseValue]]'] = value
    return this
  }
  private getPromiseValue(): any {
    return this['[[PromiseValue]]']
  }

  private resolve(value: any) {
    setTimeout(() => {
      if (this.getPromiseStatus() === 'pending') {
        this.setPromiseStatus('fulfilled').setPromiseValue(value)
        this.callbacks.forEach((item) => {
          item.resolve.call(this)
        })
      }
    }, 1)
  }

  private reject(reason: any) {
    setTimeout(() => {
      if (this.getPromiseStatus() === 'pending') {
        this.setPromiseStatus('rejected').setPromiseValue(reason)
        this.callbacks.forEach((item) => {
          item.reject.call(this)
        })
      }
    }, 1)
  }
  // Promise 解决过程：[[Resolve]](promise2, x)
  private handlerResolvePromise(newXaPromise: T, x: any, resolve: any, reject: any) {
    // 解决重复调用问题
    let flag = false
    // x 与 promise 相等
    // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    if (x === newXaPromise) {
      return reject(new TypeError('resolve不能传入当前then返回的Promise对象'))
    }
    // x 为 Promise
    // 如果 x 为 Promise ，则使 promise 接受 x 的状态
    if (x instanceof XaPromise) {
      // 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
      if (x['[[PromiseStatus]]'] === 'pending') {
        x.then(
          (_value: any) => {
            this.handlerResolvePromise(newXaPromise, _value, resolve, reject)
          },
          (_reason: any) => {
            reject(_reason)
          }
        )
      } else {
        // 如果 x 处于执行态，用相同的值执行 promise
        // 如果 x 处于拒绝态，用相同的据因拒绝 promise
        x.then(resolve, reject)
      }
    } else if (typeof x === 'function' || (x !== null && typeof x === 'object')) {
      try {
        // x 为对象或函数
        // 把 x.then 赋值给 then
        // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
        let then = x.then
        // 如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
        if (typeof then === 'function') {
          then.call(
            x,
            (y: any) => {
              // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
              // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
              if (flag) return
              flag = true
              this.handlerResolvePromise(newXaPromise, y, resolve, reject)
            },

            (r: any) => {
              // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
              // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
              if (flag) return
              flag = true
              reject(r)
            }
          )
        } else {
          // 如果 then 不是函数，以 x 为参数执行 promise
          reject(x)
        }
      } catch (e) {
        // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
        if (flag) return
        flag = true
        reject(e)
      }
    } else {
      // 如果 x 不为对象或者函数，以 x 为参数执行 promise
      resolve(x)
    }
  }
  /**
   * Example:
   * // 返回值不能函数和对象
   * new XaPromise((resolve, reject) => {resolve(1)}).then(data => console.log(data))
   * // 返回值是promise
   * new XaPromise((resolve, reject) => {
   *    resolve(1)
   * }).then(data => {
   *    return XaPromise((resolve, reject) => {resolve(1)})
   * }).then(data => {
   *    console.log(data)
   * })
   */
  then(onResolve: any, onReject?: any): XaPromise<T> {
    let isResolveFunction = typeof onResolve === 'function'
    let isRejectFunction = typeof onReject === 'function'

    onResolve = isResolveFunction ? onResolve : (value: any) => value
    onReject = isRejectFunction
      ? onReject
      : (reason: any) => {
          throw reason
        }

    let newXaPromise: any
    // then 方法必须返回一个 promise 对象
    return (newXaPromise = new XaPromise((resolve, reject) => {
      let status = this.getPromiseStatus()
      if (status === 'pending') {
        this.callbacks.push({
          resolve() {
            try {
              // 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
              let x = onResolve(this.getPromiseValue())
              // 不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected
              this.handlerResolvePromise(newXaPromise, x, resolve, reject)
            } catch (e) {
              // 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
              reject(e)
            }
          },
          reject() {
            try {
              // 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
              let x = onReject(this.getPromiseValue())
              // 不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected
              this.handlerResolvePromise(newXaPromise, x, resolve, reject)
            } catch (e) {
              // 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
              reject(e)
            }
          },
        })
      } else if (status === 'fulfilled') {
        // onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用 必须异步调用
        setTimeout(() => {
          let x = onResolve(this.getPromiseValue())
          this.handlerResolvePromise(newXaPromise, x, resolve, reject)
        }, 1)
      } else if (status === 'rejected') {
        setTimeout(() => {
          let x = onReject(this.getPromiseValue())
          this.handlerResolvePromise(newXaPromise, x, resolve, reject)
        }, 1)
      }
    }))
  }
  /**
   * 不管什么状态函数都会执行
   * Example:
   * new XaPromise((resolve, reject) => {
   *    // resolve() || reject()
   * }).finally(() => {
   *    console.log('执行函数')
   * })
   */
  finally(callback: () => void) {
    return this.then(callback, callback)
  }
  /**
   * 程序异常调用
   * Example:
   * new XaPromise((resolve, reject) => {
   *   throw Error('程序异常')
   * }).catch(() => {
   *    console.log('程序异常')
   * })
   */
  catch(callback: (value: any) => void) {
    return this.then(null, callback)
  }
}
