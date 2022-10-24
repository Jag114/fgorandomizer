import { useNavigate } from "react-router-dom";
import servantFetch from "../data/servantFetch";
import "./UserServantList.css";

const ServantCard = () => {
  return <div>Hello</div>;
};

const UserServantList = ({ formData, region }) => {
  const navigate = useNavigate();

  const handlePath = () => {
    navigate("/");
  };

  let servantCards = [];
  let servantCard = [];

  servantFetch(formData, region).then((data) => {
    console.log(data);
    data.data.forEach((e) => {
      servantCards.push(e);
    });

    servantCard = servantCards.map((s) => (
      <ServantCard key={s.collectionNo} />
    ));
  });

  return (
    <div className="servant-net">
      Your servant list
      <button className="change-path-button" onClick={handlePath}>
        Go back to randomizer
      </button>
      {servantCard}
    </div>
  );
};

export default UserServantList;
