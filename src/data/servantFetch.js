async function fetchServant() {
    const settings = {
        rarity: [],
        class: ["Saber", "Archer"]
    }
    //const servantClass = settings.class
    //const servantRarity = settings.rarity
    let newModifiedData = [];
    let isTrue;
    const response = await fetch('servants.json')
    const data = await response.json()
    if(settings.rarity.length > 0){
        data.servants.forEach(e => {
            settings.rarity.forEach(raritySetting => {
                if(e.rarity === raritySetting){
                    newModifiedData.push(e)
                }
            })
        })
    }else{
        newModifiedData = [...data.servants]
    }
    console.log(newModifiedData);
    if(settings.class.length > 0){
       newModifiedData = newModifiedData.filter(e => {
            isTrue = false;
            settings.class.forEach(classSetting => {
                console.log(e.class, classSetting);
                if(e.class === classSetting){
                    isTrue = true
                }
            })
            console.log("isTrue: ", isTrue);
            return isTrue ? true : false
       })
    }
    console.log("Test data: ", newModifiedData);
    let modifiedData = data.servants.filter(e => e)
    console.log("Filtered servants: ",modifiedData)
    return { data: modifiedData, length: modifiedData.length };
}

export default fetchServant;
