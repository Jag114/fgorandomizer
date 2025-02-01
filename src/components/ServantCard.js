import "./UserServantList.css";
import rarityStarConverter from "../data/rarityStarConverter";
import capitalizeString from "../data/capitalizeString";

const ServantCard = (props) => {
  const { region, userProfile, setUserProfile } = props;

  const handleChange = (id) => {
    const savedProfile = [...userProfile];

    if (savedProfile.includes(`${id}`)) {
      savedProfile.splice(savedProfile.indexOf(`${id}`), 1);
    } else {
      savedProfile.push(`${id}`);
    }
    setUserProfile(savedProfile);
  };
  
  const profile = JSON.parse(localStorage.getItem(`userProfile-${region}`));
  let style;
  if (profile.includes(`${props.id}`)) {
    style = { backgroundColor: "green" };
  } else {
    style = { backgroundColor: "gray" };
  }

  let doShow = true;
  if(props.show1 === false || props.show2 === false){
    doShow = false;
  }

  return (doShow === true) ? (
    <div
      onClick={() => handleChange(props.id)}
      id={props.id}
      className="profile-servant-net-card"
      style={style}
    >
      <p> {"<--Press to include-->"} </p>
      <p> {props.name} </p>
      <p> {capitalizeString(props.className)} </p>
      <p> {rarityStarConverter(props.rarity)} </p>
    </div>
  ) : null;
};

export default ServantCard;
