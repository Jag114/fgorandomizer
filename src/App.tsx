import { BrowserRouter, Routes, Route } from "react-router-dom";

import Party from './components/Party';
import SettingsMenu from './components/SettingsMenu.jsx';
import UserServantList from './components/UserServantList.jsx';
import InfoFooter from "./components/InfoFooter.jsx";

import useSettings from './hooks/useSettings';

const App = () => {

  const [formData, setFormData, region, setRegion ] = useSettings()

  return (
    <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={
          <>
            <Party formData={formData} region={region} />
            <SettingsMenu formData={formData} setFormData={setFormData} region={region} setRegion={setRegion} />
            <InfoFooter/>
          </>
        }/> 
        <Route path="/profile" element={<UserServantList region={region} />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;