假设有一个值TypeScript认为可以为`null`或`undefined`，但是你更清楚它的类型，你可以使用`!`后缀。

```ts
declare var foo: string[] | null;

foo.length;  // error - 'foo' is possibly 'null'

foo!.length; // okay - 'foo!' just has type 'string[]'
```

要当心，当你使用`strictNullChecks`，你的依赖也需要相应地启用`strictNullChecks`。