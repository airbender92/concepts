


function getNameList (items){
    return items.split(';').map(item => {
        const newItem = item.split('-')
        if (newItem.length === 2) {
            return newItem[0]
        }
        return newItem
    });
}
function getDifferentValues(str1, str2) {
    const array1 = getNameList(str1);
    const array2 = getNameList(str2);
    const set1 = new Set(array1);
    const set2 = new Set(array2);

    const diffArray1 = array1.filter(item => !set2.has(item));
    const diffArray2 = array2.filter(item => !set1.has(item));

    const differentValues = diffArray1.concat(diffArray2);
    return differentValues;
  }

  const diffV = getDifferentValues(newList, oldList);
  console.log(diffV);

  