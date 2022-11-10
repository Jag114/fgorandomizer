import { useNavigate } from "react-router-dom";
import "./UserServantList.css";
import ServantCard from "./ServantCard";

const UserServantList = ({region}) => {
  const navigate = useNavigate();

  const handlePath = () => {
    navigate("/");
  };
  
  const servantCardsData = JSON.parse(localStorage.getItem(`servantsData-${region}`));

  const servantCards = servantCardsData.map((e) => (
    <ServantCard
      key={e.collectionNo}
      id={e.collectionNo}
      name={e.name}
      className={e.className}
      rarity={e.rarity}
      region={region}
    />
  ));

  const checkAll = () => {
    let checkboxes = document.getElementsByName('include');
    console.log(checkboxes);
    for (let checkbox of checkboxes) {
      if(checkbox.checked === true){
        //change state: delete, save profile to localStorage
        checkbox.checked = false;
      }else{
        //change state: add, save profile to localStorage
        checkbox.checked = true;
      }
    }
  }

  const resetLocalStorage = () => {
    localStorage.setItem(`userProfile-${region}`, JSON.stringify([]));
  }

  return (
    <main>
      <div className="profile-header">
        <p className="profile-header-text"> Your servant list, total number of servants is: {servantCards.length}, current region: {region.toUpperCase()} </p>
        <button className="profile-change-path-button" onClick={handlePath}>
          Go back to randomizer
        </button>
      </div>
      <div className="profile-header-2">
        <label> Select all </label> 
        <input type="checkbox" name="selectAll" onClick={checkAll}/>
        <br/>
        <button onClick={resetLocalStorage}> RESET PROFILE </button>
      </div>
      <div className="profile-servant-net">
        {servantCards}
      </div>
    </main>
  );
};

export default UserServantList;
