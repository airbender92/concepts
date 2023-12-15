1. Awaited<Type>
- Awaited<T> 这个类型用于模拟在异步函数中的 await 操作或 Promise 的 .then() 方法等操作，特别是它们递归展开 Promise 的方式

```ts

     type A = Awaited<Promise<string>>;
      
    **type A = string**

    type B = Awaited<Promise<Promise<number>>>;
    
    **typeB = number**

    type C = Awaited<boolean | Promise<number>>;

    **type C = number | boolean**
```

2. Partial<Type>

- Partial<T> 构造了一个类型，其中 T 类型的所有属性都被设置为可选。这个实用工具类型将返回一个表示给定类型的所有子集的类型。

```ts
interface Todo{
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return {...todo, ...fieldsToUpdate}
}

const todo1 = {
    title: 'desl',
    description: "clear clutter",
}

const todo2 = updateTodo(todo1, { description: 'throw out trash' })

```

3. Required<Type>
- Required<T> 构造了一个类型，其中 T 类型的所有属性都被设置为必需的。这个工具类型是 Partial<T> 的相反操作，它将所有属性从可选转为必需。

```ts
interface Props {
    a?: number;
    b?: string;
}
const obj: Props = { a: 5};
// warning: Property 'b' is missing in type '{a: number;}' but required in type 'Required<Props>'
const obj2: Required<Props> = {a: 5};
```

4. Readonly<Type>
- Readonly<T> 构造了一个类型，其中 T 类型的所有属性都被设置为只读，这意味着构造类型的属性不能被重新赋值。
```ts
interface Todo {
    title: string;
}

const todo: Readonly<Todo> = {
    title: "Delete inactive users"
}
// error: Cannot assign to 'title' because it is read-only property
todo.title = "Hello"
```

This utility is useful for representing assignment expressions that will fail at runtime (i.e. when attempting to reassign properties of a frozen object).

**Object.freeze**
```ts
function freeze<Type>(obj: Type): Readonly<Type>;
```

5. Record<Keys, Type>
- Record<Keys, Type> 构造了一个对象类型，其中属性的键是 Keys，属性的值是 Type。这个实用工具类型可用于将一个类型的属性映射到另一个类型。

```ts
interface CatInfo {
    age: number;
    breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: 'Persian'},
    boris: { age: 10, breed: 'Persian'},
    mordred: { age: 10, breed: 'Persian'},
}
// cats => tips: const cats: Record<CatName, CatInfo> 
cats.boris;
```

6. Pick<Type, Keys>
- Pick<Type, Keys> 构造了一个类型，它从 Type 中挑选一组属性 Keys（可以是字符串字面量或字符串字面量的联合）。

```ts
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
    title: "Clean room"，
    completed: false,
}
```

7. Omit<Type, Keys>

- Omit<Type, Keys> 构造了一个类型，它从 Type 中挑选所有属性，然后移除一组属性 Keys（可以是字符串字面量或字符串字面量的联合）。它是 Pick 的相反操作。
```ts
interface Todo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
}

type TodoPreview = Omit<Todo, 'description'>;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
    createAt: 161552235738
}

type TodoInfo = Omit<Todo, 'completed' | 'createdAt'>;

const todoInfo: TodoInfo = {
    title: "Pick up kids",
    description: 'Kindergarten closes at 5pm'
}
```

8. Exclude<UnionType, ExcludedMembers>

- Exclude<UnionType, ExcludedMembers> 构造了一个类型，通过从 UnionType 中排除所有可以赋值给 ExcludedMembers 的联合成员，从而构造一个新类型。(**类型之间赋值：子类赋给父类**)

```ts
// type T0 = "b" | "c"
type T0 = Exclude<"a" | "b" | "c", "a">;

// type T1 = 'c'
type T1 = Exclude<"a" | 'b' | 'c', 'a' | 'b'>;

// type T2 = string | number
type T2 = Exclude<string | number | (() => void), Function>;


type Shape = 
    | { kind: 'circle'; radius: number}
    | { kind: 'square'; x: number}
    | {kind: 'triangle'; x: number; y: number}

/*
type T3 = {
    kind: 'square';
    x: number;
} | {
    kind: 'triangle';
    x: number;
    y: number;
}
*/
type T3 = Exluude<Shape, {kind: "circle"}>

```

9. Extract<Type, Union>

- Extract<Type, Union> 构造了一个类型，通过从 Type 中提取所有可以赋值给 Union 的联合成员，从而构造一个新类型。

```ts
// type T0 = 'a'
type T0 = Extract<"a" | 'b' | 'c', "a" | 'f'>

// type T1 = () => void;
type T1 = Extract<string | number | (() => void), Function>;

type Shape = 
 | { kind: 'circle'; radius: number}
    | { kind: 'square'; x: number}
    | {kind: 'triangle'; x: number; y: number}

/**
 * type T2 = { kind: 'circle'; radius: number}
 */
type T2 = Extract<Shape, {kind: "circle"}>
```

10. NonNullable<Type>
- NonNullable<Type> 构造了一个类型，通过从 Type 中排除 null 和 undefined，从而构造一个新类型。
```ts
// type T0 = string | number;
type T0 = NonNullable<string | number | undefined>;

// type T1 = string[];
type T1 = NonNullable<string[] | null | undefined>;
```

11. Parameters<Type>
- Parameters<Type> 构造了一个元组类型，其中包含了函数类型 Type 中的参数类型。对于重载函数，它将提取最后一个签名的参数类型；详情请参考《在条件类型中进行推断》。

**在 TypeScript 中，Parameters 实际上返回的是一个元组类型，但当仅有一个参数时，它也可以被看作是一个数组类型。因此，type T1 = Parameters<(s: string) => void> 的结果 T1 可以表示包含一个参数的元组类型，也可以被解释为包含一个参数的数组类型。**

```ts

declare function f1(arg: { a: number; b: string}): void;

// type T0 = [];
type T0 = Parameters<() => string>;

// type T1 = [s: string];
type T1 = Parameters<(s: string) => void>

// type T2 = [arg: unknown]
type T2 = Parameters<<T>(arg: T) => T>;

/*
type T3 = [arg: {a: number; b: string;}]
*/
type T3 = Parameters<typeof f1>;

// type T4 = unknown[];
type T4 = Parameters<any>;

// type T5 = never
type T5 = Parameters<never>;

// type T6 = never;
//  error Type 'string' does not satisfy the constraint '(...args: any) => any'
type T6 = Parameters<string>;

```

12. ConstructorParameters<Type>
- ConstructorParameters<Type> 构造了一个元组类型（或数组类型），其中包含了构造函数类型 Type 中的参数类型。如果 Type 不是一个函数类型，它将产生一个包含 never 类型的元组类型。

```ts
type T0 = ConstructorParameters<ErrorConstructor>;
     
// type T0 = [message?: string]
type T1 = ConstructorParameters<FunctionConstructor>;
     
// type T1 = string[]
type T2 = ConstructorParameters<RegExpConstructor>;
     
// type T2 = [pattern: string | RegExp, flags?: string]
class C {
  constructor(a: number, b: string) {}
}
// type T3 = [a: number, b: string]
type T3 = ConstructorParameters<typeof C>;
     

type T4 = ConstructorParameters<any>;
     
type T4 = unknown[]
 
 /*
 Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
  Type 'Function' provides no match for the signature 'new (...args: any): any'.
type T5 = never
 */
type T5 = ConstructorParameters<Function>;
```

13. ReturnType<Type>

- ReturnType<Type> 构造了一个类型，其中包含了函数类型 Type 的返回类型。对于重载函数，它将提取最后一个签名的返回类型；详情请参考《在条件类型中进行推断》。

```ts
declare function f1(): { a: number; b: string };
 
// type T0 = string
type T0 = ReturnType<() => string>;
     
// type T1 = void
type T1 = ReturnType<(s: string) => void>;
     
// type T2 = unknown
type T2 = ReturnType<<T>() => T>;
     
// type T3 = number[]
type T3 = ReturnType<<T extends U, U extends number[]>() => T>;

/*
type T4 = {
    a: number;
    b: string;
}
*/
type T4 = ReturnType<typeof f1>;
```

在 TypeScript 中，`ReturnType` 实用工具类型被设计用于操作函数的类型，而不是函数本身。这就是为什么在应用 `ReturnType` 时需要使用 `typeof` 的原因。

以下是修正后的示例：

```typescript
declare function f1(): { a: number; b: string };

// 使用 typeof 与 ReturnType
type T4 = ReturnType<typeof f1>;
```

`typeof` 操作符用于获取函数 `f1` 的类型，然后 `ReturnType` 用于操作该类型以获取函数的返回类型。

如果省略 `typeof` 并直接使用 `ReturnType<f1>`，TypeScript 会将其解释为尝试获取名为 `f1` 的函数的返回类型，但它无法访问函数实现以推断返回类型。因此，你需要使用 `typeof` 来引用函数本身的类型。

14. InstanceType<Type>

- InstanceType<Type> 构造了一个类型，其中包含了构造函数类型 Type 的实例类型。

```ts
class C {
    x = 0;
    y = 0;
}

// type T0 = C
type T0 = InstanceType<typeof C>;

// type T1 = any
type T1 = InstanceType<any>;
     
// type T2 = never
type T2 = InstanceType<never>;
     
// Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.
// type T3 = any
type T3 = InstanceType<string>;
     
// Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
//   Type 'Function' provides no match for the signature 'new (...args: any): any'.
// type T4 = any
type T4 = InstanceType<Function>;
     
```
