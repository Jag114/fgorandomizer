/* creates empty array for filtered data,
 * fetches array of objects, deletes ids of unplayable characters,
 * and filters them based on settings (object) argument,
 * filtered objects are put into modifiedData array which is later returned
 * first function call puts data from fetch into localStorage so 
 * no more fetch requests are called
 * lastly image urls are cached (not sure if it works/is worth it)
 */

//const response = await fetch('servants.json')  // local (add .servants)

import cacheImage from "./cacheImage";

const apiURL = "https://api.atlasacademy.io/export"
let regionCheck = "na"; //default

async function fetchServant(settings = {rarity: [], className: []}, region = "na") {
  if(regionCheck !== region){
    console.log("Change in region", "New region ", region, "Old region ", regionCheck);
    regionCheck = region;
    localStorage.setItem("servantData", JSON.stringify([]))
  }
  let url = region === "na" ? `${apiURL}/NA/basic_servant.json` : `${apiURL}/JP/basic_servant_lang_en.json`;
  console.log("Current region: ",region,", Current url: ", url);
  let data = [];
  let modifiedData = [];
  let isTrue;
  let unplayableID = [83, 149, 151, 152, 168, 240, 333];
  if(localStorage.getItem){
    if(JSON.parse(localStorage.getItem("servantsData")).length > 0){
      data = JSON.parse(localStorage.getItem("servantsData"));
      console.log("Memory", data);
    }
    else{
      const response = await fetch(url);
      data = await response.json();
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < unplayableID.length; j++) {
          if (data[i].collectionNo === unplayableID[j]) {
            data.splice(i, 1);
          }
        }
      }
      localStorage.setItem("servantsData", JSON.stringify(data))
      console.log("Fetched", JSON.parse(localStorage.getItem("servantsData")));
    }
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
