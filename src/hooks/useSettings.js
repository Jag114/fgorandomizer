import { useState } from "react";

function useSettings() {
  const [formData, setFormData] = useState({
    rarity: [],
    className: [],
  });

  const [region, setRegion] = useState("na");
  
  return [formData, setFormData, region, setRegion];
}

export default useSettings;
