多态的this类型表示的是某个包含类或接口的子类型。 这被称做F-bounded多态性。 它能很容易的表现连贯接口间的继承，比如。 在计算器的例子里，在每个操作之后都返回this类型：

```ts
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();
```

由于这个类使用了this类型，你可以继承它，新的类可以直接使用之前的方法，不需要做任何的改变。
```ts
class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin(){
        this.value = Math.sin(this.value);
        return this;
    }
}

let v = new ScientificCalculator(2) 
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();

```

**如果没有this类型，ScientificCalculator就不能够在继承BasicCalculator的同时还保持接口的连贯性。 multiply将会返回BasicCalculator，它并没有sin方法。 然而，使用this类型，multiply会返回this，在这里就是ScientificCalculator**