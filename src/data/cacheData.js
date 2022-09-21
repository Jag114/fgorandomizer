export default function preloadImages(data) {
  if (!preloadImages.list) {
    preloadImages.list = [];
  }
  let list = preloadImages.list;
  for (let i = 0; i < data.length; i++) {
    let img = new Image();
    img.onload = function () {
      let index = list.indexOf(img);
      if (index !== -1) {
        list.splice(index, 1);
      }
    };
    img.src = `https://static.atlasacademy.io/NA/Faces/f_${data[i].id}3.png`;
    list.push(img);
  }
}
