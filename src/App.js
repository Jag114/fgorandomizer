import Party from './components/Party';
import SettingsMenu from './components/SettingsMenu';
import useSettings from './hooks/useSettings';
import InfoFooter from "./components/InfoFooter";

const App = () => {

  const [formData, setFormData, region, setRegion ] = useSettings()

  return (
    <>
    <Party formData={formData} region={region}/>
    <SettingsMenu formData={formData} setFormData={setFormData} region={region} setRegion={setRegion}/>
    <InfoFooter/>
  </>
  );
}

export default App;