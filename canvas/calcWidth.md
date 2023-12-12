```js
function calculateWidthByText(text) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = '16px Arial'; // 设置字体和大小，可以根据需要调整

  // 使用 measureText 方法来测量文本的宽度
  var metrics = context.measureText(text);
  var textWidth = metrics.width;

  // 销毁canvas
  canvas.remove();

  return textWidth;
}
```