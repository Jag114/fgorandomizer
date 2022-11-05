import "./UserServantList.css";

const ServantCard = (props) => {
    const capitalizedClassName = (string) => {
      return string[0].toUpperCase() + string.substring(1);
    }

    function checkDuplicates (arr) {
      let valuesSoFar = {};
      let value;
      let uniqueArr = [];
      for (let i = 0; i < arr.length; i++) {
        value = arr[i];
        if(!(value in valuesSoFar)) {
          valuesSoFar[value] = true;
          uniqueArr.push(value);
        }
      }
      return uniqueArr;
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

    const checkIfChecked = (e) => {
      const profile = JSON.parse(localStorage.getItem("userProfile"));
      if(profile.includes(e)){
        return true;
      }
      return false;
    }

    let isChecked = checkIfChecked(props.id);

    const handleChange = () => {
      const {userProfile, setUserProfile} = props;
      const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
      let a = 0;
      let newProfile = [...savedProfile];
      if(userProfile.includes(props.id)){
        setUserProfile(prevUserProfile => {
          prevUserProfile.splice(prevUserProfile.indexOf(props.id), 1);
          if(a < 1){
            newProfile.splice(savedProfile.indexOf(props.id), 1);
            a++;
          }
          newProfile = [...checkDuplicates(newProfile)]
          localStorage.setItem("userProfile", JSON.stringify(newProfile));
          return prevUserProfile;
        })
        isChecked = checkIfChecked(props.id);
      }else{
        setUserProfile(prevUserProfile => {
          prevUserProfile.push(props.id);
          if(a < 1){
            newProfile.push(props.id);
            a++;
          }
          newProfile = [...checkDuplicates(newProfile)]
          localStorage.setItem("userProfile", JSON.stringify(newProfile));
          return prevUserProfile;
        })
        isChecked = checkIfChecked(props.id);
      }

      if(localStorage.getItem("userProfile")){
        props.setUserProfile(JSON.parse(localStorage.getItem("userProfile")));
      }
    }

    return (
      <div id={props.id} className="profile-servant-net-card">
        <p> {props.name} </p>
        <p> {capitalizedClassName(props.className)} </p>
        <p> {rarityIcon(props.rarity)} </p>
        <label> Include servant </label> 
        <input type="checkbox" name="include" onChange={handleChange} checked={isChecked}/>
      </div>
    );
};

export default ServantCard;