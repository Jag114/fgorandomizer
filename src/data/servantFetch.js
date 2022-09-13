async function fetchServant(settings) {
    const servantClass = settings.class
    const servantRarity = settings.rarity
    const response = await fetch('servants.json')
    const data = await response.json()
    if(servantRarity.length > 0){
        var modifiedData = data.servants.filter(filterRarity =>
            filterRarity.rarity >= servantRarity[0] && filterRarity.rarity <= servantRarity[1]
        )
    }
    if(servantClass.length > 0){
       
    }
    console.log("Filtered servants: ",modifiedData)
    return { data: modifiedData, length: modifiedData.length };
}

export default fetchServant;
