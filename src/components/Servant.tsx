import "../styles/Servant.css";
import rarityStarConverter from "../data/rarityStarConverter.ts";
import capitalizeString from "../data/capitalizeString.ts";

import { ServantComponentProps } from "../data/dataTypes.ts";

interface ServantData {
  data: ServantComponentProps;
}

const Servant = ({ data }: ServantData) => {
  const borderColor = (rarity: number) => {
    switch (rarity) {
      case 0:
        return "black-border";
      case 1:
      case 2:
        return "bronze-border";
      case 3:
        return "silver-border";
      case 4:
      case 5:
        return "gold-border";
      default:
        break;
    }
  };

  const border = `servant-container ${borderColor(data?.rarity)}`;
  console.log(border);

  const backgroundServant = "/icons/saber_party_img";

  return (
    // <div className={classNames}>
    //   <div className='servantClass'>  {capitalizeString(props.servantInfo.className)} </div>
    //   <img src={`https://static.atlasacademy.io/JP/Faces/f_${props.servantInfo.icon}3.png`} alt='Servant Icon' width='100' height='100' className='servantIcon'></img>
    //   <div className='servantName'> {props.servantInfo.name} </div>
    //   <div className='servantRarity'>  {rarityStarConverter(props.servantInfo.rarity)}</div>
    //   <button onClick={() => props.handleClick(false, props.number)} className='randomize-button'> Randomize </button>
    // </div>
    <div
      className={border}
      style={{
        backgroundImage: `url(${backgroundServant}.png)`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="servant-container-header">
        <div className="servant-container-header-class">
          <img src={`/icons/${data.className}_icon.png`}></img>
          <p> {capitalizeString(data.className)} </p>
        </div>

        <p className="servant-container-header-rarity">
          {rarityStarConverter(data.rarity)}
        </p>
      </div>

      <div id="mask" className="servant-container-footer"></div>

      <div className="servant-container-footer">
        <p> {data.name} </p>
      </div>
    </div>
  );
};

export default Servant;
