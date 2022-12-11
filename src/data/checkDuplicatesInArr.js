function checkDuplicates(arr) {
  let valuesSoFar = {};
  let value;
  let uniqueArr = [];
  for (let i = 0; i < arr.length; i++) {
    value = arr[i];
    if (!(value in valuesSoFar)) {
      valuesSoFar[value] = true;
      uniqueArr.push(value);
    }
  }
  return uniqueArr;
}

export default checkDuplicates;