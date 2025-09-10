import '../styles/InfoFooter.css';
import LinkButton from "./LinkButton"
import React from 'react';

const InfoFooter = () => {
  
  return (
   <footer>
    <LinkButton text="Made by jag114" url="https://github.com/Jag114" icon="github"/>
    <LinkButton text="Servant data provided by atlasacademy" url="https://apps.atlasacademy.io/db/" icon="atlas"/>
   </footer>
  );

}

export default InfoFooter; 