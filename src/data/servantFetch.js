async function fetchServant() {
    const response = await fetch('servants.json')
    const data = await response.json()
    const modifiedData = data.servants.filter(e => e);
    return { data: modifiedData, length: modifiedData.length };
}

export default fetchServant;
