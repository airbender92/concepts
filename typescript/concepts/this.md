# `this`没有隐式的`any`

当你在类的外部使用`this`关键字时，它会默认获得`any`类型。 比如，假设有一个`Point`类，并且我们要添加一个函数做为它的方法：
```ts
class Point {
    constructor(public x, public y) {}
    /**
     * The Point in the method signature refers to the class Point, not the interface. This is because the method is defined within the class. The Point class has a constructor that takes x and y parameters, and the getDistance method expects an argument p of type Point, referring to instances of the Point class.
    */
    getDistance(p: Point) {
        let dx = p.x - this.x;
        let dy = p.y - this.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }
}
// ...

// Reopen the interface.
interface Point {
    /**
     * In the distanceFromOrigin method, the parameter point: Point is saying that the function expects an argument named point of type Point. This Point refers to the interface Point you've defined.
    */
    distanceFromOrigin(point: Point): number;
}
Point.prototype.distanceFromOrigin = function(point: Point) {
    return this.getDistance({ x: 0, y: 0});
}
```

这就产生了我们上面提到的错误 - 如果我们错误地拼写了`getDistance`并不会得到一个错误。 正因此，TypeScript有`noImplicitThis`选项。 当设置了它，TypeScript会产生一个错误当没有明确指定类型（或通过类型推断）的`this`被使用时。 解决的方法是在接口或函数上使用指定了类型的this参数：
```ts
Point.prototype.distanceFromOrigin = function(this: Point, point: Point) {
    return this.getDistance({ x: 0, y: 0});
}
```



In TypeScript, the `this` parameter is used to specify the type that `this` should have within the function. In the specific case of the `distanceFromOrigin` method you've provided, it's declaring that the method should be called on an instance of the `Point` class, and `this` inside the method should have the type `Point`.

Here's your method:

```typescript
Point.prototype.distanceFromOrigin = function(this: Point) {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
```

The `(this: Point)` syntax is a way of explicitly stating that `this` should be of type `Point`. This is useful in TypeScript when dealing with functions or methods that are not directly bound to an instance but are expected to be called on instances.

For example, when you use this method on a `Point` instance:

```typescript
const myPoint = new Point(3, 4);
const distance = myPoint.distanceFromOrigin();
```

The TypeScript compiler will check that `distanceFromOrigin` is called on an instance of `Point` and that `this` inside the method is indeed a `Point`. This helps catch potential errors related to incorrect use of `this`.

If you were to call this method without specifying the context:

```typescript
const distance = distanceFromOrigin();
```

TypeScript would likely raise a compilation error, indicating that `this` is implicitly of type `any` and that you should call it on a `Point` instance.

This practice is part of TypeScript's effort to add static type checking to JavaScript and catch potential issues at compile time.



So, in summary, when you see point: Point in a function parameter list, it indicates that the function expects an argument named point of a type that adheres to the structure defined by the Point interface. This type could be a class that implements the interface.