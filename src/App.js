import { BrowserRouter, Routes, Route } from "react-router-dom";
import Party from './components/Party';
import SettingsMenu from './components/SettingsMenu';
import useSettings from './hooks/useSettings';
import UserServantList from './components/UserServantList';

const App = () => {

  const [formData, setFormData, region, setRegion ] = useSettings()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Party formData={formData} region={region}/>
            <SettingsMenu formData={formData} setFormData={setFormData} region={region} setRegion={setRegion}/>
          </>
        }/>
        <Route path="profile" element={<UserServantList formData={formData} region={region}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;