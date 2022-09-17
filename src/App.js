import Party from './components/Party';
import SettingsMenu from './components/SettingsMenu';
import { useState } from 'react';

const App = () => {

  const [ formData, setFormData ] = useState({
    rarity: [],
    className: [],
  });

  return (
    <>  
      <Party formData={formData}/>
      <SettingsMenu formData={formData} setFormData={setFormData}/>
    </>
  );
}

export default App;