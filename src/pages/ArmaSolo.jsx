import React, { Component } from 'react';
import GerarSkin from '../components/GerarSkin';
import '../css/arma-solo.css'
import Header from '../components/Header'
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import addAssigment from '../redux/action'
import ModalSkin from '../components/ModalSkin';

const skinsTiradas = [
  'Confronto'
]

class ArmaSolo extends Component {
  constructor(props) {
    super(props);

    const { loadingState } = props
    loadingState('LOADING_STATE',{ pageLoading: true, componentLoading: false} );

    this.state = { 
      todasSkins: [],
      arma: '',
      modalSkin: []
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const { todasSkins } = this.state;

    const armaSolo = await fetch(`https://valorant-api.com/v1/weapons/${id}?language=pt-BR`)
      .then((data) => data.json())
      .then((data) => data.data)
      .catch((error) => console.log(error));

    const armasRetorno = armaSolo.skins.filter((arma) => armaSolo.displayName !== arma.levels[0].displayName);   
    this.setState({todasSkins: todasSkins.concat(armasRetorno), arma:armaSolo.displayName});
  }

  imgCarregada = (chave) => {
    const { loadingState } = this.props;
    const { todasSkins } = this.state
    if(todasSkins.length - 1 === chave ) {
      setTimeout(() => {
        loadingState('LOADING_STATE', { pageLoading: false, componentLoading: true} );
      }, 1500)
    }
  };

  getArmaModal = (skin) => {
    fetch(`https://valorant-api.com/v1/weapons/skins/${skin}?language=pt-BR`)
    .then((data) => data.json())
    .then((data) => {
      const { modalSkin } = this.state;
      this.setState({modalSkin: modalSkin.concat(data.data)});
    }).catch((error) => console.log(error));
  }

  fecharModalSkinFun = () => this.setState({modalSkin: []})
  
  render() { 
    const { todasSkins, arma, modalSkin } = this.state;
    const {
      state: {
        reducerLoading: {statesLoading}
      }
    } = this.props;

    return ( 
      <>
        {(statesLoading.pageLoading === true) && <Loading />}
        { 
          (modalSkin.length === 1) && 
            <ModalSkin 
              infoArma={modalSkin[0]}
              arma={ arma }
              fecharModalSkin={this.fecharModalSkinFun}
            /> 
        }
        <Header />
        <div className='container-armas-solo'>
          <div className='cards-armas'>
            {
              (todasSkins.length > 1) && todasSkins.map((skin, index) => 
                (skinsTiradas.includes(skin.displayName) === false) && 
                  <GerarSkin 
                    key={index} 
                    arma={arma} 
                    skin={skin.levels[0]}
                    uuidSkin={skin.uuid}
                    chave={index}
                    carregarImg={this.imgCarregada}
                    gerarModalSkin={this.getArmaModal}
                  />)
            }
          </div>
        </div>
      </> 
    );
  }
};

const mapDispatchToProps = (dispatch) => ( {
  loadingState: (localRedux, value) => dispatch(addAssigment(localRedux, value))
});

const mapStateToProps = (state) => ({state});
export default connect(mapStateToProps, mapDispatchToProps)(ArmaSolo);