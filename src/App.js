import { BrowserRouter, Routes, Route } from "react-router-dom";
import Party from './components/Party';
import SettingsMenu from './components/SettingsMenu';
import useSettings from './hooks/useSettings';
import UserServantList from './components/UserServantList';
import InfoFooter from "./components/InfoFooter";

const App = () => {

  const [formData, setFormData, region, setRegion, userProfile, setUserProfile  ] = useSettings()

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={
          <>
            <Party formData={formData} region={region} userProfile={userProfile} setUserProfile={setUserProfile} />
            <SettingsMenu formData={formData} setFormData={setFormData} region={region} setRegion={setRegion} />
            <InfoFooter/>
          </>
        }/>
        <Route path="profile" element={<UserServantList region={region} userProfile={userProfile} setUserProfile={setUserProfile}  />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;