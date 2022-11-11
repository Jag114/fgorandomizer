import "./UserServantList.css";

const ServantCard = (props) => {
  const { region } = props;

  const capitalizedClassName = (string) => {
    return string[0].toUpperCase() + string.substring(1);
  };

  const rarityIcon = (length) => {
    if (length === 0) {
      return 0;
    }
    let stars = "";
    while (length > 0) {
      stars += "⋆";
      length--;
    }
    return stars;
  };

  const handleChange = (id) => {
    if (localStorage.getItem(`userProfile-${region}`) === false) {  //check if exists, if not create
      localStorage.setItem(`userProfile-${region}`, JSON.stringify([]));
    }
    const savedProfile = [
      ...JSON.parse(localStorage.getItem(`userProfile-${region}`)),
    ];

    if (savedProfile.includes(`${id}`)) {
      savedProfile.splice(savedProfile.indexOf(`${id}`), 1);
      localStorage.setItem(`userProfile-${region}`,JSON.stringify(savedProfile));
      document.getElementById(props.id).style.backgroundColor = "red";
    } else {
      savedProfile.push(`${id}`);
      localStorage.setItem(`userProfile-${region}`,JSON.stringify(savedProfile));
      document.getElementById(props.id).style.backgroundColor = "green";
    }
  };
  
  const profile = JSON.parse(localStorage.getItem(`userProfile-${region}`));
  let style;
  if (profile.includes(`${props.id}`)) {
    style = { backgroundColor: "green" };
  } else {
    style = { backgroundColor: "red" };
  }

  return (
    <div
      onClick={() => handleChange(props.id)}
      id={props.id}
      className="profile-servant-net-card"
      style={style}
    >
      <p> {"<--Press to include-->"} </p>
      <p> {props.name} </p>
      <p> {capitalizedClassName(props.className)} </p>
      <p> {rarityIcon(props.rarity)} </p>
    </div>
  );
};

export default ServantCard;
