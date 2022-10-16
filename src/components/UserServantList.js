import { useNavigate } from 'react-router-dom';
import './UserServantList.css';

const UserServantList = () => {

  const navigate = useNavigate();

  const handlePath = () => {
    navigate("/");
  }

  return (
  <div className="servant-net"> 
    Your servant list
    <button className='change-path-button' onClick={handlePath}> Go back to randomizer </button>
  </div>
  );
}

export default UserServantList;