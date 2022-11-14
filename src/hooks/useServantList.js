import { useState } from "react";

const useServantList = () => {
    const [ servantList, setServantList ] = useState([]);

    return [ servantList, setServantList ];
}

export default useServantList;