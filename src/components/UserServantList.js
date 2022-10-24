import { useNavigate } from "react-router-dom";
import "./UserServantList.css";

const ServantCard = (props) => {
  return (
    <div>
      <p> {props.name} </p>
      <p> {props.className} </p>
      <p> {props.rarity} </p>
    </div>
  );
};

const UserServantList = ({ formData, region }) => {
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
    <div className="servant-net">
      Your servant list, total number of servants is: {servantCards.length}
      <button className="change-path-button" onClick={handlePath}>
        Go back to randomizer
      </button>
      {servantCards}
    </div>
  );
};

export default UserServantList;
