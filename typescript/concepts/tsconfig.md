1. `noImplicitReturns` 会防止你忘记在函数末尾返回值

2. `noFallthroughCasesInSwitch` 会防止在switch代码块里的两个case之间忘记添加break语句。

3. 如果，你不想在发生错误的时候，`TypeScript`还会被编译成`JavaScript`，你可以使用`noEmitOnError`选项。 从某种意义上来讲，TypeScript具有一个调整它的严格性的刻度盘，你可以将指针拔动到你想要的位置。

4. 如果你不想让`TypeScript`将没有明确指定的类型默默地推断为`any`类型，可以在修改文件之前启用`noImplicitAny`。 你可能会觉得这有些过度严格，但是长期收益很快就能显现出来。

5. 在某些情况下TypeScript没法确定某些值的类型。 那么TypeScript会使用`any`类型代替。 这对代码转换来讲是不错，但是使用`any`意味着失去了类型安全保障，并且你得不到工具的支持。 你可以使用`noImplicitAny`选项，让TypeScript标记出发生这种情况的地方，并给出一个错误。

## 严格的null与undefined检查
默认地，TypeScript把`null`和`undefined`当做属于任何类型。 这就是说，声明为`number`类型的值可以为`null`和`undefined`。 因为在JavaScript和TypeScript里，`null`和`undefined`经常会导致BUG的产生，所以TypeScript包含了`strictNullChecks`选项来帮助我们减少对这种情况的担忧。

当启用了`strictNullChecks`，`null`和`undefined`获得了它们自己各自的类型`null`和`undefined`。 当任何值可能为`null`，你可以使用联合类型。 比如，某值可能为`number`或`null`，你可以声明它的类型为`number | null`。