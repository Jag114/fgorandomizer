/* creates empty array for filtered data, 
* fetches array of objects and filters them based on settings (object) argument,
* filtered objects are put into modifiedData array which is later returned
*/

async function fetchServant(settings) {
    //console.log("Settings: ",settings);
    let modifiedData = [];
    let isTrue;
    //const response = await fetch('servants.json')  // .servants
    const response = await fetch('https://api.atlasacademy.io/export/NA/basic_servant.json')
    const data = await response.json()
    //console.log(data);
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
    //console.log(modifiedData);
    return { data: modifiedData, length: modifiedData.length };
}

export default fetchServant;
