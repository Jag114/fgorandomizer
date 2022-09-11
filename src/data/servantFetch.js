async function fetchServant(settings) {
    const servantClass = settings.class
    const servantRarity = settings.rarity
    const response = await fetch('servants.json')
    const data = await response.json()
    const modifiedData = data.servants.filter(e =>
        e.rarity >= servantRarity[0] && e.rarity <= servantRarity[1]
    );
   
    return { data: modifiedData, length: modifiedData.length };
}

export default fetchServant;
