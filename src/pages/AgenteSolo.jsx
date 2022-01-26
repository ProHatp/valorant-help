import React, { Component } from 'react';
import Header from '../components/Header';
import '../css/agente-solo.css'
import videoBackground from '../imgs/backgroundvideo.mp4'
import poderesGif from '../complementares/poderes'
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import addAssigment from '../redux/action'

const animateClass = (container) => {
  const windowTop = window.pageYOffset + (window.innerHeight * 3 / 4);
  (windowTop > container.offsetTop) ?
    container.classList.add('animate') :
    container.classList.remove('animate');
}

class AgenteSolo extends Component {
  constructor(props) {
    super(props);

    const { loadingState } = props
    loadingState('LOADING_STATE',{ pageLoading: true, componentLoading: false} );

    this.state = { 
      agente: [],
      habilidadeSelect: [],
      selectindex: 0
    }
  }

  selecionarHabilidade = (index) => {
    const todasImgsHabilitis = document.querySelectorAll('.img-habilidades');
    todasImgsHabilitis.forEach((element) => element.classList.remove('select'));
    todasImgsHabilitis[index].classList.add('select');
    this.setState({selectindex: index})
  }

  async componentDidMount() {
    window.scrollTo(0,0); 
    const { id } = this.props.match.params
    const { agente, habilidadeSelect } = this.state
    if(id === undefined) return;
    const agents = await fetch(`https://valorant-api.com/v1/agents/${id}?language=pt-BR`)
    .then((agent) => agent.json())
    .then((agent) => agent.data)
    .catch((error) => error);

    if(agents !== undefined)
      this.setState( {
        agente: agente.concat(agents),
        habilidadeSelect: habilidadeSelect.concat([...agents.abilities])
      } )
  }

  imgCarregada = () => {
    const { loadingState } = this.props;
    setTimeout(() => {
      loadingState('LOADING_STATE', { pageLoading: false, componentLoading: true} );
    }, 1500)  
  };

  render() { 
    const { agente, habilidadeSelect, selectindex, chave, carregarImg } = this.state;
    const {
      state: {
        reducerLoading: {statesLoading}
      }
    } = this.props;
    return ( 
    <>    
      {(statesLoading.pageLoading === true) && <Loading />}
      <div className='page-agente-solo'>
        <Header />
        { 
        window.addEventListener('scroll', () => {
          const container = document.querySelector('[data-anime]')
          if(container !== null) {
            animateClass(container)
          }
        }) }
        <div className='localVideo'>
          {
          (agente.length === 1) && 
            <div className='img-video'>
              <img 
                onLoad={() => this.imgCarregada()} 
                className='local-img-agente-solo' 
                src={agente[0].fullPortrait} alt="" 
              />
              <h1>{agente[0].displayName.toUpperCase()}</h1>
            </div>
          }
          <video autoPlay preload="true" muted loop poster="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltbded518020183769/5eb26f5389bac8148a8006cc/agent-background-generic.JPG">
            <source src={videoBackground} type="video/mp4" />
          </video>
        </div>
        
        <section>
          <div className='container-antes'>
            <div className='container'>
              <div className='container-itens'>
                <div className='container-geral' data-anime='top'>
                  <div className='local-texto-habilidades'>
                    <h1>HABILIDADES ESPECIAIS</h1>
                  </div>

                  <div className='local-habilidades'>
                    <div className='local-imagens-habilidades'>
                      <div className='local-imagens-overlaw'>
                        {(agente.length === 1) && agente[0].abilities.filter((a, index) => index < 4).map((abilidade, index) =>
                          <div 
                            key={index} 
                            className={`img-habilidades ${(index === 0) && 'select'}`}
                            onClick={() => this.selecionarHabilidade(index)}
                          >
                            <img 
                              src={abilidade.displayIcon} 
                              alt=""
                            />
                          </div>
                        )}
                      </div>

                      <div className='texto-habilidades'>
                        <h2>{(habilidadeSelect.length > 1) && habilidadeSelect[selectindex].displayName.toUpperCase()}</h2>
                        <p>{(habilidadeSelect.length > 1) && habilidadeSelect[selectindex].description}</p>
                      </div>

                    </div>

                    <div className='local-gif-habilidade'>
                      {
                      (habilidadeSelect.length > 1) && 
                        <video 
                          autoPlay 
                          preload="true" 
                          muted 
                          loop 
                          poster="" 
                          src={`${poderesGif.displayNome[agente[0].displayName][selectindex]}`} 
                          type="video/mp4" 
                        />
                      }
                    </div>
                    
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> 
    </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ( {
  loadingState: (localRedux, value) => dispatch(addAssigment(localRedux, value))
});

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps, mapDispatchToProps)(AgenteSolo);
