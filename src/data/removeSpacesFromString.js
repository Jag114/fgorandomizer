function removeSpaceFromString(string) {
  let newString = "";
  string = [...string];
  for (let i = 0; i < string.length; i++) {
    if (string[i] === " ") {
      string.splice(i, 1);
    }
  }
  for (let i = 0; i < string.length; i++) {
    newString += string[i];
  }
  return newString;
}

export default removeSpaceFromString;