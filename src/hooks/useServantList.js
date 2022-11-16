import { useState } from "react";

const useServantList = (region) => {
    let profile = [];
    if(localStorage.getItem(`userProfile-${region}`)){
        profile = JSON.parse(localStorage.getItem(`userProfile-${region}`));
    }
    
    const [ userProfile, setUserProfile ] = useState(profile);

    if(userProfile.length > 0){
        localStorage.setItem(`userProfile-${region}`, JSON.stringify(userProfile));
    }else{
        localStorage.setItem(`userProfile-${region}`, JSON.stringify([]));
    }

    return [ userProfile, setUserProfile ];
}

export default useServantList;