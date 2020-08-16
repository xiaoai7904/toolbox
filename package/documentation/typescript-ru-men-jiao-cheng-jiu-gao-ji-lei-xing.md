---
title: 'TypeScript入门教程(九) - 高级类型'
date: 2019-11-24 08:16:51
tags: [JavaScript]
published: true
hideInList: false
feature: /post-images/typescript-ru-men-jiao-cheng-jiu-gao-ji-lei-xing.jpeg
isTop: false
---
高级类型(交叉类型,联合类型,类型保护与区分类型,类型别名,字符串字面量类型,数字字面量类型,枚举成员类型,多态的this类型,索引类型,映射类型)我们会对10种进行详情介绍
<!--more-->

### 交叉类型(Intersection Types)
交叉类型是将多个类型合并到一个类型,比如:`Fn1 & Fn2 & Fn3`同时是`Fn1`和`Fn2`和`Fn3`,这个类型的对象同时拥有这三种类型的成员。

来看一个混入(`mixins`)的例子:

```typescript
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

interface FnInterface {
    getName(): string;
}

class Fn1 {
    constructor(public name: string) { }
}

class Fn2 implements FnInterface {
    getName() {
        console.log('getName')
    }
}

let f = extend(new Fn1("mickey"), new Fn2());

let n = f.name; // mickey

f.getName(); // getName

```

### 联合类型(Union Types)
联合类型表示一个值可以是几种类型之,用竖线 `|` 分隔每个类型

```typescript
function setWidth(dom: any, width: string | number): void {
    dom.style.width = width
}
```

### 类型保护与区分类型(Type Guards and Differentiating Type)

```typescript
let pet = getSmallPet();

// 每一个成员访问都会报错
if (pet.swim) {
    pet.swim();
}
else if (pet.fly) {
    pet.fly();
}
```
修改上面的代码

```typescript
let pet = getSmallPet();

if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}
```

* 用户自定义的类型保护

TypeScript里的 类型保护机制让它成为了现实。 类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```

* typeof类型保护

这些**typeof类型保护**只有两种形式能被识别：typeof v === "typename"和 typeof v !== "typename"， "typename"必须是 "number"， "string"， "boolean"或 "symbol"。 但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护

* instanceof类型保护

instanceof类型保护是通过构造函数来细化类型的一种方式
instanceof的右侧要求是一个构造函数，TypeScript将细化为:

* 此构造函数的 prototype属性的类型，如果它的类型不为 any的话
* 构造签名所返回的类型的联合

### 类型别名

类型别名就是给类型起一个新的名字,起别名不会新建一个类型，只是用新的名字来引用那个类型

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
```
类型别名也可以是泛型

```typescript
type Container<T> = { value: T };

type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}

```

类型别名不能出现在声明右侧的任何地方

```typescript
type Yikes = Array<Yikes>; // error
```

### 字符串字面量类型

字符串字面量类型允许你指定字符串必须的固定值。 在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。 通过结合使用这些特性，你可以实现类似枚举类型的字符串

```typescript
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {

        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
```

字符串字面量类型还可以用于区分函数重载

```typescript
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
    // ... code goes here ...
}
```

### 数字字面量类型

```typescript
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    // ...
}
```

### 多态的`this`类型

多态的 this类型表示的是某个包含类或接口的 子类型。 这被称做 F-bounded多态性。 它能很容易的表现连贯接口间的继承，比如。 在计算器的例子里，在每个操作之后都返回 this类型:

```typescript
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();
```

由于这个类使用了 this类型，你可以继承它，新的类可以直接使用之前的方法，不需要做任何的改变

```typescript
class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
}

let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
```

### 索引类型(Index types)
使用索引类型，编译器就能够检查使用了动态属性名的代码

```javascript
function pluck(o, names) {
    return names.map(n => o[n]);
}
```

```typescript
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```

上面代码引入了新的类型操作符`keyof T`,`索引类型查询操作符`和`T[K]`,`索引访问操作符`

```typescript
let personProps: keyof Person; // 'name' | 'age'
```
上面代码可以同通过`let personProps: 'name' | 'age'`替换,但是如果添加了新的属性到`Person`里面`keyof Person`会自动添加新增的属性,因此在使用前不清楚出现的属性名,就可以这样使用

```typescript
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
```

`getProperty`里的`o: T`和`name: K`，意味着`o[name]: T[K]`。 当你返回`T[K]`的结果，编译器会实例化键的真实类型，因此 `getProperty`的返回值类型会随着你需要的属性改变

`keyof`和`T[K]`与字符串索引签名进行交互。 如果你有一个带有字符串索引签名的类型，那么`keyof T`会是`string`。 并且`T[string]`为索引签名的类型

```typescript
interface Map<T> {
    [key: string]: T;
}
let keys: keyof Map<number>; // string
let value: Map<number>['foo']; // number
```

### 映射类型

TypeScript提供了从旧类型中创建新类型的一种方式 — **映射类型**

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}
```

使用如下:

```typescript
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```
它的语法与索引签名的语法类型，内部使用了 for .. in。 具有三个部分

* 类型变量 K，它会依次绑定到每个属性
* 字符串字面量联合的 Keys，它包含了要迭代的属性名的集合
* 属性的结果类型

```typescript
type NullablePerson = { [P in keyof Person]: Person[P] | null }
type PartialPerson = { [P in keyof Person]?: Person[P] }

type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial<T> = { [P in keyof T]?: T[P] }
```

上面代码是真正应用中使用到的


上面介绍了高级类型种的10种类型,这也是日常我们会用到的

上面我们介绍了`TypeScript`的高级类型，第十节我们将介绍Symbols

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html)