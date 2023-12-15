在 TypeScript 中，使用 declare class 的目的是为了描述已经存在于你的项目中的 JavaScript 类型。这通常用于与其他 JavaScript 库或框架进行集成，因为 TypeScript 需要了解这些类的结构以进行类型检查。

如果你自己编写了这个类的实现，而不是在外部库中使用，通常不需要使用 declare class。相反，你可以直接使用正常的类声明语法，而不需要额外的声明。

需要注意的是，如果你的声明是在模块中，那么在使用这个类之前，你可能需要在你的文件中使用 import 语句将这个类引入。但是，对于全局声明的情况，这通常不是必须的。

# 全局变量
- 全局变量foo包含了存在组件总数。

*代码*
```ts
console.log("Half the number of widgets is " + (foo / 2));
```

*声明*


使用`declare var`声明变量。 如果变量是只读的，那么可以使用`declare const`。 你还可以使用declare let如果变量拥有块级作用域。
```ts
/** 组件总数 */
declare var foo: number;
```

# 全局函数
*文档*

- 用一个字符串参数调用greet函数向用户显示一条欢迎信息。

*代码*
```ts
greet("hello, world");
```

*声明*

使用declare function声明函数。
```ts
declare function greet(greeting: string): void;
```


# 带属性的对象
*文档*

- 全局变量myLib包含一个makeGreeting函数， 还有一个属性numberOfGreetings指示目前为止欢迎数量。

*代码*
```ts
let result = myLib.makeGreeting("hello, world");
console.log("The computed greeting is:" + result);

let count = myLib.numberOfGreetings;
```

*声明*

使用declare namespace描述用点表示法访问的类型或值。
```ts
declare namespace myLib {
    function makeGreeting(s: string): string;
    let numberOfGreetings: number;
}
```

# 函数重载
*文档*

- getWidget函数接收一个数字，返回一个组件，或接收一个字符串并返回一个组件数组。

*代码*
```ts
let x: Widget = getWidget(43);

let arr: Widget[] = getWidget("all of them");
```
*声明*
```ts
declare function getWidget(n: number): Widget;
declare function getWidget(s: string): Widget[];
```

# 可重用类型（接口）
*文档*

- 当指定一个欢迎词时，你必须传入一个GreetingSettings对象。 这个对象具有以下几个属性：

 1- greeting：必需的字符串

 2- duration: 可靠的时长（毫秒表示）

 3- color: 可选字符串，比如‘#ff00ff’

 *代码*
```ts
greet({
  greeting: "hello world",
  duration: 4000
});
```

*声明*

使用`interface`定义一个带有属性的类型。
```ts
interface GreetingSettings {
  greeting: string;
  duration?: number;
  color?: string;
}

declare function greet(setting: GreetingSettings): void;
```


# 可重用类型（类型别名）
*文档*

- 在任何需要欢迎词的地方，你可以提供一个string，一个返回string的函数或一个Greeter实例。

*代码*
```ts
function getGreeting() {
    return "howdy";
}
class MyGreeter extends Greeter { }

greet("hello");
greet(getGreeting);
greet(new MyGreeter());
```

*声明*

你可以使用类型别名来定义类型的短名：
```ts
type GreetingLike = string | (() => string) | MyGreeter;
declare function greet(g: GreetingLike): void;
```

# 组织类型
*文档*

- greeter对象能够记录到文件或显示一个警告。 你可以为.log(...)提供LogOptions和为.alert(...)提供选项。

*代码*
```ts
const g = new Greeter("Hello");
g.log({ verbose: true });
g.alert({ modal: false, title: "Current Greeting" });
```


*声明*

使用命名空间组织类型。
```ts
declare namespace GreetingLib {
    interface LogOptions {
        verbose?: boolean;
    }
    interface AlertOptions {
        modal: boolean;
        title?: string;
        color?: string;
    }
}
```

你也可以在一个声明中创建嵌套的命名空间：
```ts
declare namespace GreetingLib.Options {
    // Refer to via GreetingLib.Options.Log
    interface Log {
        verbose?: boolean;
    }
    interface Alert {
        modal: boolean;
        title?: string;
        color?: string;
    }
}
```
在 TypeScript 中，使用 `declare namespace` 声明的类型通常不需要额外的导入。这是因为这些声明是全局的，它们在整个 TypeScript 项目中都是可见的。

在你的示例中：

```typescript
declare namespace GreetingLib {
    interface LogOptions {
        verbose?: boolean;
    }
    interface AlertOptions {
        modal: boolean;
        title?: string;
        color?: string;
    }
}

// 或者嵌套的命名空间
declare namespace GreetingLib.Options {
    interface Log {
        verbose?: boolean;
    }
    interface Alert {
        modal: boolean;
        title?: string;
        color?: string;
    }
}
```

在其他文件或相同文件的其他位置，你可以直接使用 `GreetingLib.LogOptions`、`GreetingLib.AlertOptions`、`GreetingLib.Options.Log` 和 `GreetingLib.Options.Alert`，而无需额外的导入。

例如：

```typescript
const logOptions: GreetingLib.LogOptions = { verbose: true };
const alertOptions: GreetingLib.AlertOptions = { modal: false, title: "Hello" };
const nestedLogOptions: GreetingLib.Options.Log = { verbose: true };
const nestedAlertOptions: GreetingLib.Options.Alert = { modal: true, title: "Hi" };
```

需要注意的是，这些声明是全局可见的，因此如果你在项目中有多个地方使用这些类型，并且它们在不同文件中，你无需在每个文件中重新导入这些声明。


# 类
*文档*

- 你可以通过实例化Greeter对象来创建欢迎词，或者继承Greeter对象来自定义欢迎词。

*代码*
```ts
const myGreeter = new Greeter("hello, world");
myGreeter.greeting = "howdy";
myGreeter.showGreeting();

class SpecialGreeter extends Greeter {
    constructor() {
        super("Very special greetings");
    }
}
```

*声明*

使用declare class描述一个类或像类一样的对象。 类可以有属性和方法，就和构造函数一样。
```ts
declare class Greeter {
    constructor(greeting: string);

    greeting: string;
    showGreeting(): void;
}
```


在 TypeScript 中，判断一个声明是在模块中还是全局中可以通过查看其声明语法和出现的上下文来实现。以下是一些指导原则：

### 在模块中的声明

1. **使用 `export` 关键字：** 在模块中，通常你会使用 `export` 关键字导出变量、函数、类等。

```typescript
// 模块中的声明
export class Greeter {
    constructor(greeting: string) {
        this.greeting = greeting;
    }

    greeting: string;

    showGreeting(): void {
        console.log(this.greeting);
    }
}
```

2. **包含 `import` 语句：** 在模块中，你可能会使用 `import` 语句导入其他模块的内容。

```typescript
// 模块中的声明
import { OtherModuleClass } from './otherModule';

export class Greeter {
    // ...
}
```

### 在全局中的声明

1. **使用 `declare` 关键字：** 全局声明通常使用 `declare` 关键字。

```typescript
// 全局中的声明
declare class GlobalGreeter {
    // ...
}
```

2. **不包含 `export` 或 `import`：** 全局声明不需要使用 `export` 或 `import`。

```typescript
// 全局中的声明
class GlobalGreeter {
    // ...
}
```

如果一个声明既没有 `export` 也没有 `import`，并且使用了 `declare` 关键字，那么它可能是一个全局声明。请注意，这些规则并非绝对，有时候你的项目可能使用其他模块化系统或特殊的设置，因此需要结合实际情况判断。