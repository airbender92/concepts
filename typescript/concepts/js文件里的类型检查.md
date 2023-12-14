TypeScript 2.3以后的版本支持使用`--checkJs`对`.js`文件进行类型检查并提示错误的模式。

你可以通过添加`// @ts-nocheck`注释来忽略类型检查；相反你可以通过去掉`--checkJs`设置并添加`// @ts-check`注释来选则检查某些`.js`文件。 你还可以使用`// @ts-ignore`来忽略本行的错误。

下面是一些值得注意的类型检查在.js文件与.ts文件上的差异

# 在JSDoc上使用类型

.js文件里，类型可以和在.ts文件里一样被推断出来。 同样地，当类型不能被推断时，它们可以通过JSDoc来指定，就好比在.ts文件里那样。

JSDoc注解修饰的声明会被设置为这个声明的类型。比如：
```js
/** @type {number} */
var x;

x = 0;      // OK
x = false;  // Error: boolean is not assignable to number
```


# CommonJS模块输入支持
.js文件支持将CommonJS模块做为输入模块格式。对exports和module.exports的赋值被识别为导出声明。 相似地，require函数调用被识别为模块导入。例如：
```js
// import module "fs"
const fs = require("fs");


// export function readFile
module.exports.readFile = function(f) {
  return fs.readFileSync(f);
}
```

对象字面量是开放的
默认地，变量声明中的对象字面量本身就提供了类型声明。新的成员不能被加到对象中去。 这个规则在.js文件里被放宽了；对象字面量具有开放的类型，允许添加并访问原先没有定义的属性。例如：
```js
var obj = { a: 1 };
obj.b = 2;  // Allowed
```
对象字面量具有默认的索引签名[x:string]: any，它们可以被当成开放的映射而不是封闭的对象。


函数参数是默认可选的
由于JS不支持指定可选参数（不指定一个默认值），.js文件里所有函数参数都被当做可选的。使用比预期少的参数调用函数是允许的。

需要注意的一点是，使用过多的参数调用函数会得到一个错误。

例如：
```js
function bar(a, b){
  console.log(a + " " + b);
}

bar(1);       // OK, second argument considered optional
bar(1, 2);
bar(1, 2, 3); // Error, too many arguments
```

# 未指定的类型参数默认为any
未指定的泛型参数类型将默认为any。有如下几种情形：

## 在extends语句中
例如，React.Component被定义成具有两个泛型参数，Props和State。 在一个.js文件里，没有一个合法的方式在extends语句里指定它们。默认地参数类型为any：
```js
import { Component } from "react";

class MyComponent extends Component {
    render() {
        this.props.b; // Allowed, since this.props is of type any
    }
}
```