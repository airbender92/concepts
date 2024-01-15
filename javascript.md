# 一。 new Set(Array)

`new Set(array1)` 返回的是一个 Set 对象。Set 是 JavaScript 中的一种集合类型，它是一组不重复值的有序集合。Set 对象允许存储任何类型的唯一值，而且它会确保每个值在集合中都是唯一的。

在 `new Set(array1)` 中，`array1` 中的元素将被添加到 Set 中，重复的元素会被自动去重，最终得到一个不包含重复值的 Set 对象。Set 对象本身是可迭代的，你可以使用 `for...of` 或 `forEach` 等方法遍历其中的元素。需要注意的是，Set 中的元素是无序的。

以下是一个简单的例子：

```javascript
const array1 = [1, 2, 3, 3, 4, 5, 5];
const set = new Set(array1);

console.log(set); // 输出 Set { 1, 2, 3, 4, 5 }

// 遍历 Set
for (const value of set) {
  console.log(value);
}
// 输出:
// 1
// 2
// 3
// 4
// 5
```

在这个例子中，`array1` 中的重复元素被去重，最终生成了一个包含不同值的 Set 对象。



# 二。Javascript 筛选两个数组中的不同项

在JavaScript中，你可以使用以下方法来筛选出两个数组中的不同值：

1. **使用`filter`和`includes`方法：**
   ```javascript
   function getDifferentValues(array1, array2) {
     const diffArray1 = array1.filter(item => !array2.includes(item));
     const diffArray2 = array2.filter(item => !array1.includes(item));
     const differentValues = diffArray1.concat(diffArray2);
     return differentValues;
   }

   const array1 = [1, 2, 3, 4, 5];
   const array2 = [4, 5, 6, 7, 8];

   const result = getDifferentValues(array1, array2);
   console.log(result);
   ```

2. **使用`filter`和`Set`对象：**
   ```javascript
   function getDifferentValues(array1, array2) {
     const set1 = new Set(array1);
     const set2 = new Set(array2);

     const diffArray1 = array1.filter(item => !set2.has(item));
     const diffArray2 = array2.filter(item => !set1.has(item));

     const differentValues = diffArray1.concat(diffArray2);
     return differentValues;
   }

   const array1 = [1, 2, 3, 4, 5];
   const array2 = [4, 5, 6, 7, 8];

   const result = getDifferentValues(array1, array2);
   console.log(result);
   ```

这两个例子都会输出两个数组中的不同值 `[1, 2, 3, 6, 7, 8]`。选择其中一个方法取决于你的具体需求和对代码的偏好。