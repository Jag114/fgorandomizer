import "./FilterCard.css";

const FilterCard = (props) => {
  const { filters, setFilters } = props;
  const type = props.type;
  let classArr = [...filters.class];  
  let rarityArr = [...filters.rarity];  
  let style = {};

  const handleClick = () => {
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
  };

  if(filters.rarity.includes(props.data) || filters.class.includes(props.data)){
    style = {backgroundColor:"goldenrod"};
  }else{
    style = {backgroundColor:"grey"};
  }

  return <div style={style} id={props.id} onClick={handleClick}> {props.data} </div>;
};

export default FilterCard;
