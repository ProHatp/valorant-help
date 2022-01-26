import React, { Component } from 'react';
import '../css/modal-skin.css';
import previaImg from '../imgs/previa-img.jpg';

const diminuirSkins = [
  'Frenzy',
  'Sheriff',
  'Karambit Champions 2021',
  'Arco Gênese',
  'Adaga Delíquio',
  'Karambit Champions 2021'
];

class ModalSkin extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      level: 0,
      chormaLevel: 0
    }
  }

  editarLevel = (index) => {
    this.setState({level: index})
  }

  editarChroma = (index) => {
    this.setState({chormaLevel: index})
  }

  render() {
    const { infoArma, fecharModalSkin, arma } = this.props;
    const { level, chormaLevel } = this.state;
    return (
      <>
        <div className='modal-overlaw-skin'>
          <div className='modal-skin'>
            <div className='modal-skin-btn-sair' onClick={fecharModalSkin}><span>X</span></div>
            <div className='local-skin-geral'>

              <div className='cards-armas-skin'>
                <div className={`card-item-armas card-item-sentinela-armas`}>
                  <div className='card-tipo-armas'></div>
                  <div className='card-nome-armas'>{infoArma.displayName}</div>

                  <div className='card-armas'>
                    {
                      (arma === 'Confronto')
                        ? (<img 
                          className={`${(diminuirSkins.includes(infoArma.displayName)) 
                            ? 'card-armas-facas-pequena' : 'card-armas-facas-large'}`} 
                          src={`${(infoArma.chromas.length > chormaLevel) && 
                              (infoArma.chromas[chormaLevel].displayIcon !== null)
                                ? infoArma.chromas[chormaLevel].displayIcon 
                                : infoArma.displayIcon}`} alt="" 
                          />)
                        : (<img 
                          className={`${(diminuirSkins.includes(arma)) 
                            ? 'card-skin-pequena' : 'card-skin-large'}`} 
                          src={`${(infoArma.chromas.length > chormaLevel) && 
                              (infoArma.chromas[chormaLevel].displayIcon !== null)
                                ? infoArma.chromas[chormaLevel].displayIcon 
                                : infoArma.displayIcon}`} alt="" 
                        />)
                      }
                  </div>
                </div>
              </div>

              <div className='local-infos'>

                <div className='level-skin-arma'>
                  {(infoArma.levels.length > 0) && 
                    (infoArma.levels[0].streamedVideo !== null) && infoArma.levels.map((iten, index) => 
                    <div 
                      key={index}
                      className='level-div'
                      onClick={() => this.editarLevel(index)}
                    >{index + 1}
                    </div>
                  )}
                </div>

                <div className='local-level-video'>
                  {(infoArma.levels.length > level) 
                    && (infoArma.levels[0].streamedVideo === null) 
                      ? <div className='message-sem-level'><h1>ESSA ARMA NÂO POSSUI LEVEL</h1></div>
                      : <video 
                          className='video-level'
                          autoPlay 
                          preload="true" 
                          muted 
                          loop 
                          poster={previaImg}
                          src={`${(infoArma.levels.length > level) 
                              ? infoArma.levels[level].streamedVideo 
                              : infoArma.levels[0].streamedVideo}`} 
                          type="video/mp4" 
                        />
                  }
                </div>
              </div>

              
            </div>

            <div className='local-chromas'>
              {(infoArma.chromas.length > 0) && infoArma.chromas.map((iten, index) => 
                <img 
                  key={index} 
                  className='chromas-img'
                  onClick={() => this.editarChroma(index)}
                  src={iten.swatch} alt="" 
                />
              )}
            </div>

          </div>
        </div>
      </> 
    );
  }
}
 
export default ModalSkin;