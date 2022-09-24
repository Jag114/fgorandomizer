import Party from './components/Party';
import SettingsMenu from './components/SettingsMenu';
import { useState } from 'react';

const App = () => {

  const [ formData, setFormData ] = useState({
    rarity: [],
    className: [],
  });

  const [ region, setRegion ] = useState("na")

  return (
    <>  
      <Party formData={formData} region={region}/>
      <SettingsMenu formData={formData} setFormData={setFormData} region={region} setRegion={setRegion}/>
    </>
  );
}

export default App;