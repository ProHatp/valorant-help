import React, { Component } from 'react';

const diminuirSkins = [
  'Karambit Champions 2021',
  'Arco Gênese',
  'Adaga Delíquio'
];

class GerarSkin extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    const { skin, uuidSkin, arma, chave, carregarImg, gerarModalSkin } = this.props;
    return (
      <div 
        className={`card-item-armas card-item-sentinela-armas`}
        onClick={() => gerarModalSkin(uuidSkin)}
      >
        <div className='card-tipo-armas'></div>
        <div className='card-nome-armas'>{skin.displayName}</div>
        <div className='card-armas'>
          {(arma === 'Confronto')
            ? (diminuirSkins.includes(skin.displayName))
                ? <img onLoad={() => carregarImg(chave)} className='card-armas-facas-pequena' src={skin.displayIcon} alt="" /> 
                : <img onLoad={() => carregarImg(chave)} className='card-armas-facas-large' src={skin.displayIcon} alt="" />
            : <img onLoad={() => carregarImg(chave)} className='card-armas-large' src={skin.displayIcon} alt="" />
          }
        </div>
      </div>
    );
  }
}
 
export default GerarSkin;