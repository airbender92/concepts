要想描述非TypeScript编写的类库的类型，我们需要声明类库所暴露出的API。

我们叫它声明因为它不是“外部程序”的具体实现。 它们通常是在.d.ts文件里定义的。 如果你熟悉C/C++，你可以把它们当做.h文件。 让我们看一些例子。

# 外部模块

在Node.js里大部分工作是通过加载一个或多个模块实现的。 我们可以使用顶级的export声明来为每个模块都定义一个`.d.ts`文件，但最好还是写在一个大的`.d.ts`文件里。 我们使用与构造一个外部命名空间相似的方法，但是这里使用`module`关键字并且把名字用引号括起来，方便之后`import`。 例如：

**node.d.ts (simplified excerpt)**
```ts
declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export let sep: string;
}

```

现在我们可以`/// <reference> node.d.ts`并且使用`import url = require("url");`或`import * as URL from "url"`加载模块。

```ts
/// <reference path="node.d.ts" />
import * as URL from 'url';
let myUrl = URL.parse("http://www.tsLang.org");
```


`/// <reference path="node.d.ts" />` 是一种用于指定 TypeScript 编译器引用外部声明文件的注释语法。这是一种旧的引用注释方式，现在更常见的做法是使用 `import` 语句或者在 `tsconfig.json` 中配置 `types` 字段来引入声明文件。

在这个特定的例子中，`/// <reference path="node.d.ts" />` 表示你的 TypeScript 文件依赖于名为 `node.d.ts` 的声明文件。这个文件通常包含 Node.js 相关的类型声明，以帮助 TypeScript 编译器理解和检查与 Node.js 相关的代码。

如果你使用了这个引用注释，并且希望在 TypeScript 中使用 Node.js 相关的类型，确保你的项目中有相应的 `node.d.ts` 文件，并且 TypeScript 配置正确。你可能需要安装 `@types/node` 包来获取这些声明文件，或者确保 TypeScript 编译器能够找到 `node.d.ts` 文件的正确路径。

现代的 TypeScript 项目更倾向于使用 `import` 语句或配置文件（如 `tsconfig.json`）中的 `types` 字段，因为它们提供了更灵活和模块化的方式来管理类型声明文件的依赖关系。

在 `tsconfig.json` 文件中配置 TypeScript 项目时，你可以使用 `types` 字段来指定要包含的声明文件类型。对于 Node.js 相关的类型声明，你可以在 `types` 中添加 `"node"`。

以下是一个简单的示例 `tsconfig.json` 文件：

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true
  },
  "include": ["src/**/*.ts"],
  "types": ["node"]
}
```

在这个示例中：

- `"target": "es6"` 指定目标 ECMAScript 版本为 ES6。
- `"module": "commonjs"` 指定模块系统为 CommonJS。
- `"strict": true` 启用所有严格类型检查选项。
- `"include": ["src/**/*.ts"]` 指定 TypeScript 编译器应该包含的文件。

关键的部分是 `"types": ["node"]`，它告诉 TypeScript 编译器引入 Node.js 相关的类型声明。

确保你的项目中包含 `@types/node` 包，可以通过以下命令安装：

```bash
npm install --save-dev @types/node
```

这将确保 TypeScript 编译器能够找到 Node.js 相关的类型声明。


# 外部模块简写
假如你不想在使用一个新模块之前花时间去编写声明，你可以采用声明的简写形式以便能够快速使用它。

**declarations.d.ts**
```ts
declare module "hot-new-module";
```

简写模块里所有导出的类型将是 `any`.

```ts
import x, {y} from "hot-new-module";
x(y);
```

# 模块声明通配符

某些模块加载器如SystemJS 和AMD支持导入非JavaScript内容。 它们通常会使用一个前缀或后缀来表示特殊的加载语法。 模块声明通配符可以用来表示这些情况。
```ts
declare module "*!text" {
    const content: string;
    export default content;
}
// Some do it the other way around.
declare module "json!*" {
    const value: any;
    export default value;
}
现在你可以就导入匹配"*!text"或"json!*"的内容了。

import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);
```


# UMD模块

有些模块被设计成兼容多个模块加载器，或者不使用模块加载器（全局变量）。 它们以UMD或Isomorphic模块为代表。 这些库可以通过导入的形式或全局变量的形式访问。 例如：

## math-lib.d.ts
```ts
export function isPrime(x: number): boolean;
export as namespace mathLib;
```

之后，这个库可以在某个模块里通过导入来使用：

```ts
import { isPrime } from "math-lib";
isPrime(2);
mathLib.isPrime(2); // ERROR: can't use the global definition from inside a module
```

它同样可以通过全局变量的形式使用，但只能在某个脚本里。 （脚本是指一个不带有导入或导出的文件。）
```ts
mathLib.isPrime(2);
```


# 使用命名空间导入模式当你要导出大量内容的时候
**MyLargeModule.ts**
```ts
export class Dog { ... }
export class Cat { ... }
export class Tree { ... }
export class Flower { ... }
```

**Consumer.ts**
```ts
import * as myLargeModule from "./MyLargeModule.ts";
let x = new myLargeModule.Dog();
```


# 使用重新导出进行扩展
假设Calculator.ts模块里定义了一个简单的计算器实现。 这个模块同样提供了一个辅助函数来测试计算器的功能，通过传入一系列输入的字符串并在最后给出结果。
**Calculator.ts**
```ts
export class Calculator {
    private current = 0;
    private memory = 0;
    private operator: string;

    protected processDigit(digit: string, currentValue: number) {
        if (digit >= "0" && digit <= "9") {
            return currentValue * 10 + (digit.charCodeAt(0) - "0".charCodeAt(0));
        }
    }

    protected processOperator(operator: string) {
        if (["+", "-", "*", "/"].indexOf(operator) >= 0) {
            return operator;
        }
    }

    protected evaluateOperator(operator: string, left: number, right: number): number {
        switch (this.operator) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
        }
    }

    private evaluate() {
        if (this.operator) {
            this.memory = this.evaluateOperator(this.operator, this.memory, this.current);
        }
        else {
            this.memory = this.current;
        }
        this.current = 0;
    }

    public handelChar(char: string) {
        if (char === "=") {
            this.evaluate();
            return;
        }
        else {
            let value = this.processDigit(char, this.current);
            if (value !== undefined) {
                this.current = value;
                return;
            }
            else {
                let value = this.processOperator(char);
                if (value !== undefined) {
                    this.evaluate();
                    this.operator = value;
                    return;
                }
            }
        }
        throw new Error(`Unsupported input: '${char}'`);
    }

    public getResult() {
        return this.memory;
    }
}

export function test(c: Calculator, input: string) {
    for (let i = 0; i < input.length; i++) {
        c.handelChar(input[i]);
    }

    console.log(`result of '${input}' is '${c.getResult()}'`);
}
```

下面使用导出的test函数来测试计算器。

**TestCalculator.ts**
```ts
import { Calculator, test } from "./Calculator";


let c = new Calculator();
test(c, "1+2*33/11="); // prints 9
```

现在扩展它，添加支持输入其它进制（十进制以外），让我们来创建ProgrammerCalculator.ts。

**ProgrammerCalculator.ts**
```ts
import { Calculator } from "./Calculator";

class ProgrammerCalculator extends Calculator {
    static digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

    constructor(public base: number) {
        super();
        if (base <= 0 || base > ProgrammerCalculator.digits.length) {
            throw new Error("base has to be within 0 to 16 inclusive.");
        }
    }

    protected processDigit(digit: string, currentValue: number) {
        if (ProgrammerCalculator.digits.indexOf(digit) >= 0) {
            return currentValue * this.base + ProgrammerCalculator.digits.indexOf(digit);
        }
    }
}

// Export the new extended calculator as Calculator
export { ProgrammerCalculator as Calculator };

// Also, export the helper function
export { test } from "./Calculator";
```

**TestProgrammerCalculator.ts**
```ts
import { Calculator, test } from "./ProgrammerCalculator";

let c = new Calculator(2);
test(c, "001+010="); // prints 3
```

# 模块里不要使用命名空间
命名空间对解决全局作用域里命名冲突来说是很重要的。 比如，你可以有一个My.Application.Customer.AddForm和My.Application.Order.AddForm – 两个类型的名字相同，但命名空间不同。 然而，这对于模块来说却不是一个问题。 在一个模块里，没有理由两个对象拥有同一个名字。 从模块的使用角度来说，使用者会挑出他们用来引用模块的名字，所以也没有理由发生重名的情况。

# 危险信号
以下均为模块结构上的危险信号。重新检查以确保你没有在对模块使用命名空间：

- 文件的顶层声明是export namespace Foo { ... } （删除Foo并把所有内容向上层移动一层）
- 文件只有一个export class或export function （考虑使用export default）
- 多个文件的顶层具有同样的export namespace Foo { （不要以为这些会合并到一个Foo中！）