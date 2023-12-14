想要使用JSX必须做两件事：

1. 给文件一个.tsx扩展名
2. 启用jsx选项

TypeScript具有三种JSX模式：`preserve`，`react`和`react-native`。 这些模式只在代码生成阶段起作用 - 类型检查并不受影响。 在`preserve`模式下生成代码中会保留`JSX`以供后续的转换操作使用（比如：`Babel`）。 另外，输出文件会带有`.jsx`扩展名。 `react`模式会生成`React.createElement`，在使用前不需要再进行转换操作了，输出文件的扩展名为`.js`。 `react-native`相当于`preserve`，它也保留了所有的`JSX`，但是输出文件的扩展名是`.js`。

| 模式      |  输入   |   输出                          |     输出文件扩展名     |
|----------|----------|--------------------------------|-----------------------| 
| preserve | `<div />` | `<div />`                        |   .jsx                |  
| react    | `<div />` | `React.createElement("div")`     |   .js                 |  
| preserve | `<div />` | `<div />`                        |   .js                 |  

你可以通过在命令行里使用--jsx标记或tsconfig.json里的选项来指定模式。

# as操作符
回想一下怎么写类型断言：
```ts
var foo = <foo>bar;
```
这里我们断言bar变量是foo类型的。 因为TypeScript也使用尖括号来表示类型断言，JSX的语法带来了解析的困难。因此，TypeScript在.tsx文件里禁用了使用尖括号的类型断言。

为了弥补.tsx里的这个功能，新加入了一个类型断言符号：as。 上面的例子可以很容易地使用as操作符改写：
```ts
var foo = bar as foo;
```
as操作符在.ts和.tsx里都可用，并且与其它类型断言行为是等价的。

# 类型检查

1. 对于React，固有元素会生成字符串（React.createElement("div")），然而由你自定义的组件却不会生成（React.createElement(MyComponent)）。
2. 传入JSX元素里的属性类型的查找方式不同。 固有元素属性本身就支持，然而自定义的组件会自己去指定它们具有哪个属性。


固有元素
固有元素使用特殊的接口JSX.IntrinsicElements来查找。 默认地，如果这个接口没有指定，会全部通过，不对固有元素进行类型检查。 然而，如果这个接口存在，那么固有元素的名字需要在JSX.IntrinsicElements接口的属性里查找。 例如：
```ts
declare namespace JSX {
    interface IntrinsicElements {
        foo: any
    }
}

<foo />; // 正确
<bar />; // 错误
```

在上例中，<foo />没有问题，但是<bar />会报错，因为它没在JSX.IntrinsicElements里指定。

# 无状态函数组件
正如其名，组件被定义成JavaScript函数，它的第一个参数是`props`对象。 我们强制它的返回值可以赋值给`JSX.Element`。

```ts
interface FooProp {
  name: string;
  X: number;
  Y: number;
}

declare function AnotherComponent(prop: {name: string});
function ComponentFoo(prop: FooProp) {
  return <AnotherComponent name=prop.name />;
}

const Button = (prop: {value: string}, context: { color: string }) => <button>
```

由于无状态函数组件是简单的JavaScript函数，所以我们还可以利用函数重载。
```ts
interface ClickableProps {
  children: JSX.Element[] | JSX.Element
}

interface HomeProps extends ClickableProps {
  home: JSX.Element;
}

interface SideProps extends ClickableProps {
  side: JSX.Element | string;
}

function MainButton(prop: HomeProps): JSX.Element;
function MainButton(prop: SideProps): JSX.Element {
  ...
}
```

# 类组件