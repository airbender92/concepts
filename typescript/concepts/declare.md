# 由模块导入

首先你可能会看到一些类似`Cannot find name 'require'`.和`Cannot find name 'define'`.的错误。 遇到这种情况说明你在使用模块。 你仅需要告诉TypeScript它们是存在的：

```ts
// For Node/CommonJS
declare function require(path: string): any;
```

or

```ts
// For RequireJS/AMD
declare function define(...args: any[]): any;
```


# 获取声明文件

如果你开始做转换到TypeScript导入，你可能会遇到`Cannot find module 'foo'`.这样的错误。 问题出在没有声明文件来描述你的代码库。 幸运的是这非常简单。 如果TypeScript报怨像是没有`lodash`包，那你只需这样做

```bash
npm install -S @types/lodash
```

如果你没有使用`commonjs`模块模块选项，那么就需要将`moduleResolution`选项设置为`node`。
之后，你应该就可以导入`lodash`了，并且会获得精确的自动补全功能。