import { useNavigate } from "react-router-dom";
import "./UserServantList.css";

const ServantCard = (props) => {

  const classIcon = (className) => {
    className = className.toLowerCase();
    switch (className) {
      case "saber":
        return "SEIBA!";
      default:
        return className;
    }
  }

  const rarityIcon = (length) => {
    if(length === 0){
      return 0;
    }
    let stars = "";
    while(length > 0){
      stars += "⋆"; 
      length--;
    }
    return stars;
  }

  return (
    <div className="profile-servant-net-card">
      <p> {props.name} </p>
      <p> {classIcon(props.className)} </p>
      <p> {rarityIcon(props.rarity)} </p>
    </div>
  );
};

const UserServantList = ({region }) => {
  const navigate = useNavigate();

  const handlePath = () => {
    navigate("/");
  };

  const servantCardsData = JSON.parse(localStorage.getItem(`servantsData-${region}`));

  const servantCards = servantCardsData.map((e) => (
    <ServantCard
      key={e.collectionNo}
      name={e.name}
      className={e.className}
      rarity={e.rarity}
    />
  ));

  return (
    <main>
      <div className="profile-header">
        <p className="profile-header-text"> Your servant list, total number of servants is: {servantCards.length} </p>
        <button className="profile-change-path-button" onClick={handlePath}>
          Go back to randomizer
        </button>
      </div>
      <div className="profile-servant-net">
        {servantCards}
      </div>
    </main>
  );
};

export default UserServantList;
