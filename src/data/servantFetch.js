/* creates empty array for filtered data,
 * fetches array of objects, deletes ids of unplayable characters,
 * and filters them based on settings (object) argument,
 * filtered objects are put into modifiedData array which is later returned
 * first function call puts data from fetch into fetchedCache so 
 * no more fetch requests are called
 * lastly image urls are cached (not sure if it works/is worth it)
 */

//const response = await fetch('servants.json')  // local (add .servants)
//const response = await fetch('https://api.atlasacademy.io/export/NA/basic_servant.json') NA server

import cacheImage from "./cacheImage";

async function fetchServant(settings = {rarity: [], className: []}) {
  let data = [];
  let modifiedData = [];
  let isTrue;
  let unplayableID = [83, 149, 151, 152, 168, 240, 333];
  if(JSON.parse(localStorage.getItem("servantsData")).length > 0){
    console.log("Memory");
    data = JSON.parse(localStorage.getItem("servantsData"));
  }
  else{
    const response = await fetch("https://api.atlasacademy.io/export/JP/basic_servant_lang_en.json"); // JP server
    data = await response.json();
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < unplayableID.length; j++) {
        if (data[i].collectionNo === unplayableID[j]) {
          data.splice(i, 1);
        }
      }
    }
    localStorage.setItem("servantsData", JSON.stringify(data))
    console.log("Fetched");
  }

  if (settings.rarity.length > 0) {
    data.forEach((e) => {
      settings.rarity.forEach((raritySetting) => {
        if (e.rarity === raritySetting) {
          modifiedData.push(e);
        }
      });
    });
  } else {
    modifiedData = [...data];
  }
  if (settings.className.length > 0) {
    modifiedData = modifiedData.filter((e) => {
      isTrue = false;
      settings.className.forEach((classSetting) => {
        if (e.className === classSetting) {
          isTrue = true;
        }
      });
      return isTrue ? true : false;
    });
  }
  cacheImage(data); 
  return { data: modifiedData, length: modifiedData.length };
}

export default fetchServant;
