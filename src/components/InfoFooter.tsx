import '../styles/InfoFooter.css';
import Button from "./Button"
import React from 'react';

const InfoFooter = () => {
  
  return (
   <footer>
    <Button text="Made by jag114" url="https://github.com/Jag114"/>
    <Button text="Servant data provided by atlasacademy" url="https://apps.atlasacademy.io/db/"/>
   </footer>
  );

}

export default InfoFooter; 