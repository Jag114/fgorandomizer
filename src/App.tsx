import { BrowserRouter, Routes, Route } from "react-router-dom";

import Party from './components/Party.tsx';
import SettingsMenu from './components/SettingsMenu.js';
import UserServantList from './components/UserServantList.js';
import InfoFooter from "./components/InfoFooter.js";
import ServantCard from "./components/ServantCard.tsx"

import useSettings from './hooks/useSettings.js';
import React from "react";

const App = () => {

  return (
    <>
      <div className="body-image"></div>
      <Party/>
    </>
  )

  //return <ServantCard region="na" profile={null} setProfile={null}/>
  // const [formData, setFormData, region, setRegion ] = useSettings()

  // return (
  //   <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
  //     <Routes>
  //       <Route path="/" element={
  //         <>
  //           <Party formData={formData} region={region} />
  //           <SettingsMenu formData={formData} setFormData={setFormData} region={region} setRegion={setRegion} />
  //           <InfoFooter/>
  //         </>
  //       }/> 
  //       <Route path="/profile" element={<UserServantList region={region} />}/>
  //     </Routes>
  //   </BrowserRouter>

  // );
}

export default App;