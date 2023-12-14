```js
function pluck(o, names) {
    return names.map(n => o[n]);
}
```

下面是如何在TypeScript里使用此函数，通过索引类型查询和索引访问操作符：

```ts
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n])
}

interface Person {
    name: string;
    age: number;
}
let person: Person {
    name: 'jardid',
    age:35
}
let strings: string[] = pluck(person, ['name']);
```

编译器会检查`name`是否真的是`Person`的一个属性。 本例还引入了几个新的类型操作符。 首先是`keyof T`，**索引类型查询操作符**。 对于任何类型`T`，`keyof T`的结果为T上已知的**公共属性名的联合**。 例如：
```ts
let personProps: keyof Person; // 'name' | 'age'
```

keyof Person是完全可以与'name' | 'age'互相替换的。 不同的是如果你添加了其它的属性到Person，例如address: string，那么keyof Person会自动变为'name' | 'age' | 'address'。 你可以在像pluck函数这类上下文里使用keyof，因为在使用之前你并不清楚可能出现的属性名。 但编译器会检查你是否传入了正确的属性名给pluck：

```ts
pluck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'
```

第二个操作符是T[K]，索引访问操作符。 在这里，类型语法反映了表达式语法。 这意味着person['name']具有类型Person['name'] — 在我们的例子里则为string类型。 然而，就像索引类型查询一样，你可以在普通的上下文里使用T[K]，这正是它的强大所在。 你只要确保类型变量K extends keyof T就可以了。 例如下面getProperty函数的例子：
```ts

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
```

getProperty里的o: T和name: K，意味着o[name]: T[K]。 当你返回T[K]的结果，编译器会实例化键的真实类型，因此getProperty的返回值类型会随着你需要的属性改变。
```ts
let name: string = getProperty(person, 'name');
let age: number = getProperty(person, 'age');
let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'
```


# 索引类型和字符串索引签名
```ts
interface Map<T> {
    [key: string]: T;
}
let keys: keyof Map<number>; // string
let value: Map<number>['foo']; // number
```

# 映射类型
一个常见的任务是将一个已知的类型每个属性都变为可选的：
```ts
interface PersonPartial {
    name?: string;
    age?: number;
}
```
或者我们想要一个只读版本：
```ts
interface PersonReadonly {
    readonly name: string;
    readonly age: number;
}
```

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P]
}

type Partial<T> = {
    [P in keyof T]?: T[p]
}
```

像下面这样使用：

```ts
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

```ts
type NullablePerson = { [P in keyof Person]: Person[P] | null }
type PartialPerson = { [P in keyof Person]?: Person[P] }
```

```ts
type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial<T> = { [P in keyof T]?: T[P] }
```

```ts
type Proxy<T> = {
    get(): T;
    set(value: T): void;
}

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}

function proxify<T>(o: T): Proxify<T>{}

let proxyProps = proxify(props);
```

```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

type Record<K extends string, T> {
    [P in K]: T;
}
```

Readonly，Partial和Pick是同态的，但Record不是。 因为Record并不需要输入类型来拷贝属性，所以它不属于同态：
```ts
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
```
非同态类型本质上会创建新的属性，因此它们不会从它处拷贝属性修饰符。


# 由映射类型进行推断

现在你了解了如何包装一个类型的属性，那么接下来就是如何拆包。 其实这也非常容易：
```ts
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}

let originalProps = unproxify(proxyProps);
```

注意这个拆包推断只适用于同态的映射类型。 如果映射类型不是同态的，那么需要给拆包函数一个明确的类型参数。
