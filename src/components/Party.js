import React from 'react';
import './Party.css';
import Servant from './Servant';

class Party extends React.Component {

  handleClickMulti = () => {
    fetch('servants.json')
      .then(response => response.json())
      .then(data => {
        let i = Math.floor(Math.random() * data.servants.length); 
        console.log(data.servants[i])
        return data.servants
      })
  };

  renderServant = (id) => {
      return(
        <Servant key={id}/>
      )
  }

  render(){
    return (
      <main>
        <div className='party'>
          {this.renderServant(0)}
          {this.renderServant(1)}
          {this.renderServant(2)}
          {this.renderServant(3)}
          {this.renderServant(4)}
        </div>
        <div className='buttonHolder'>
          <button onClick={this.handleClickMulti} className='button'> Randomize </button>
        </div>
      </main>
    );
  }
}
export default Party; 