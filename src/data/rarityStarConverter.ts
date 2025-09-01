function rarityStarConverter(length:number):string {
  if (length === 0) {
    return "";
  }
  let stars = "";
  while (length > 0) {
    stars += "★";
    length--;
  }
  return stars;
};

export default rarityStarConverter;