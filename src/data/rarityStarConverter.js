const rarityStarConverter = (length) => {
  if (length === 0) {
    return 0;
  }
  let stars = "";
  while (length > 0) {
    stars += "⋆";
    length--;
  }
  return stars;
};

export default rarityStarConverter;