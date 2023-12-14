# for..of vs. for..in 语句

for..of和for..in均可迭代一个列表；但是用于迭代的值却不同，for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值。

```ts
let list = [4, 5, 6];

for (let i in list) {
    console.log(i); // "0", "1", "2",
}

for (let i of list) {
    console.log(i); // "4", "5", "6"
}
```

另一个区别是for..in可以操作任何对象；它提供了查看对象属性的一种方法。 但是for..of关注于迭代对象的值。内置对象Map和Set已经实现了Symbol.iterator方法，让我们可以访问它们保存的值。

```ts
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
    console.log(pet); // "species"
}

for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}
```

# 代码生成
## 目标为 ES5 和 ES3
当生成目标为ES5或ES3，迭代器只允许在Array类型上使用。 在非数组值上使用for..of语句会得到一个错误，就算这些非数组值已经实现了Symbol.iterator属性。

# 目标为 ECMAScript 2015 或更高
当目标为兼容ECMAScipt 2015的引擎时，编译器会生成相应引擎的for..of内置迭代器实现方式。