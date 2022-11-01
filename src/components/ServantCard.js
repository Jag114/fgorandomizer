import "./UserServantList.css";

const ServantCard = (props) => {

    const capitalizedClassName = (string) => {
      return string[0].toUpperCase() + string.substring(1);
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

 

    const handleChange = () => {
      const {userProfile, setUserProfile} = props;
      if(userProfile.includes(props.id)){
        //change state: delete, save profile to localStorage
        setUserProfile(prevUserProfile => {
          prevUserProfile.splice(prevUserProfile.indexOf(props.id), 1)
          return prevUserProfile;
        })
        console.log("User profile: ",props.userProfile);
      }else{
        //change state: add, save profile to localStorage
        setUserProfile(prevUserProfile => {
          prevUserProfile.push(props.id)
          return prevUserProfile;
        })
        console.log("User profile: ",props.userProfile);
      }
    }
  
    return (
      <div className="profile-servant-net-card">
        <p> {props.name} </p>
        <p> {capitalizedClassName(props.className)} </p>
        <p> {rarityIcon(props.rarity)} </p>
        <label> Include servant </label> 
        <input type="checkbox" name="include" onChange={handleChange}/>
      </div>
    );
};

export default ServantCard;