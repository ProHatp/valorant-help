import React, { Component } from 'react';
import '../css/loading.css'

class Loading extends Component {
  constructor(props) {
    super(props);
    for (let i = 0; i <= 50; i += 1) {
      window.clearInterval(i);
    }
    this.state = {  }
  }

  render() { 
    return ( 
      <div className='loading'>
        <div className='loading-overlay'>
          <div className="logo">
            <div className="first"></div>
            <div className="second"></div>
          </div>
          <h1>VALORANT</h1>
        </div>
      </div>
     );
  }
}

export default Loading;