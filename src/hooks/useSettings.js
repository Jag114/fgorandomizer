import { useState } from "react";

function useSettings() {
  const [formData, setFormData] = useState({
    rarity: [],
    className: [],
  });

  const [ region, setRegion ] = useState("na");

  const [ userProfile, setUserProfile ] = useState([]);

  return [ formData, setFormData, region, setRegion, userProfile, setUserProfile ];
}

export default useSettings;
