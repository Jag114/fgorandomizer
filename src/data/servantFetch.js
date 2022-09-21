/* creates empty array for filtered data, 
* fetches array of objects and filters them based on settings (object) argument,
* filtered objects are put into modifiedData array which is later returned
* deletes ids of unplayable characters
*/
//import cacheData from './cacheData';

async function fetchServant(settings) {
    //console.log("Settings: ",settings);
    let modifiedData = [];
    let isTrue;
    let unplayableID = [83, 149, 151, 168, 152, 240] //151 and 152 cant be one after the other, splice changes array length
    //const response = await fetch('servants.json')  // .servants
    const response = await fetch('https://api.atlasacademy.io/export/NA/basic_servant.json')
    let data = await response.json()
    for(let i = 0; i < data.length; i++){
        for (let j = 0; j < unplayableID.length; j++) {
            if(data[i].collectionNo === unplayableID[j]){
                data.splice(i,1);
                unplayableID.splice(j,1)
            }
        }
    }

    if(settings.rarity.length > 0){
        data.forEach(e => {
            settings.rarity.forEach(raritySetting => {
                if(e.rarity === raritySetting){
                    modifiedData.push(e)
                }
            })
        })
    }else{
        modifiedData = [...data]
    }
    if(settings.className.length > 0){
        modifiedData = modifiedData.filter(e => {
            isTrue = false;
            settings.className.forEach(classSetting => {
                if(e.className === classSetting){
                    isTrue = true
                }
            })
            return isTrue ? true : false
       })
    }
    console.log(modifiedData);
    //cacheData(data);  not sure if works/worth it
    return { data: modifiedData, length: modifiedData.length };
}

export default fetchServant;
