import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const armasLargas = [
  'Frenzy',
  'Classic',
  'Sheriff'
];

class GerarArma extends Component {

  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    const { arma, chave, carregarImg } = this.props;
    return ( 
      <Link className='container-arma' to={`/arma-solo/${arma.uuid}`}>
        <div className='local-arma'>
          <div className='local-nome-arma'><span>{ arma.displayName }.</span></div>
          <div className='local-img-arma'>
            {
              (armasLargas.includes(arma.displayName)) 
                ? <img className='img-large' src={ arma.displayIcon } onLoad={() => carregarImg(chave)} alt="" /> 
                : <img className='img-no-large' src={ arma.displayIcon } onLoad={() => carregarImg(chave)} alt="" />
            }
          </div>
        </div>
        <div className='local-categoria-arma'><span>{ arma.categoryText }</span></div>
      </Link>
     );
  }
}

export default GerarArma;