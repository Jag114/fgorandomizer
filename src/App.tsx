import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Party from "./components/Party.tsx";
import InfoFooter from "./components/InfoFooter.tsx";

const App = () => {
  return (
    <>
      <Party />
      <InfoFooter />
    </>
  );

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
};

export default App;
