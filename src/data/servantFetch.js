async function fetchServant() {
    const settings = {
        rarity: [1,2,3,4],
        class: ["Saber", "Archer"]
    }
    let modifiedData = [];
    let isTrue;
    const response = await fetch('servants.json')
    const data = await response.json()
    if(settings.rarity.length > 0){
        data.servants.forEach(e => {
            settings.rarity.forEach(raritySetting => {
                if(e.rarity === raritySetting){
                    modifiedData.push(e)
                }
            })
        })
    }else{
        modifiedData = [...data.servants]
    }
    if(settings.class.length > 0){
        modifiedData = modifiedData.filter(e => {
            isTrue = false;
            settings.class.forEach(classSetting => {
                if(e.class === classSetting){
                    isTrue = true
                }
            })
            return isTrue ? true : false
       })
    }
    return { data: modifiedData, length: modifiedData.length };
}

export default fetchServant;
