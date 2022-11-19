import "./FilterCard.css";

let clicked = false;

const FilterCard = (props) => {
  const { filters, setFilters } = props;
  const type = props.type;
  let classArr = [...filters.class];  
  let rarityArr = [...filters.rarity];  

  const handleClick = (e) => {
    if (type === "rarity") {
      if (filters.rarity.includes(props.data)) {
        rarityArr.splice(rarityArr.indexOf(props.data), 1);
        setFilters((prevFilters) => {
          return {
            ...prevFilters, rarity: [...rarityArr]
          };
        });
      } else {
        rarityArr.push(props.data);
        setFilters((prevFilters) => {
          return {
            ...prevFilters, rarity: [...rarityArr]
          };
        });
      }
    } else {
        if (filters.class.includes(props.data)) {
            classArr.splice(classArr.indexOf(props.data), 1);
            setFilters((prevFilters) => {
              return {
                ...prevFilters, class: [...classArr]
              };
            });
          } else {
            classArr.push(props.data);
            setFilters((prevFilters) => {
              return {
                ...prevFilters, class: [...classArr]
              };
            });
          }
    }
    clicked = clicked ? false : true;
  };
  //change <p> to <div> or <button> and add bgColor change on clicked
  return <p style={clicked ? {backgroundColor:"blue"} : {}} onClick={handleClick}> {props.data} </p>;
};

export default FilterCard;
