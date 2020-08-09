import { XaPromise } from './promise/promise'

// 测试promise
let a = new XaPromise((reslove, reject) => {
  reslove(1)
// throw Error('111')
})
//   .then((data: any) => {
//     console.log(data)
//     return new XaPromise((reslove, reject) => {
//       reslove(2)
//     })
//   })
// //   .then((data: any) => {
// //     console.log(data)
// //   })
//   .catch(() => {
//     console.log('异常')
//   })
//   .finally(() => {
//     console.log('1')
//   })

setTimeout(() => {
    a.then((data:any) => {
        console.log(data)
    })
}, 1000)