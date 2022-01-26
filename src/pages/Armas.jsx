import React, { Component } from 'react';
import { connect } from 'react-redux';
import GerarArma from '../components/GerarArma';
import Header from '../components/Header'
import '../css/armas.css'
import Loading from '../components/Loading';
import addAssigment from '../redux/action'

class Armas extends Component {
  constructor(props) {
    super(props);

    const { loadingState } = props
    loadingState('LOADING_STATE',{ pageLoading: true, componentLoading: false} );

    this.state = { 
      selectArmas: []
     }
  }

  async componentDidMount() {
    const { selectArmas } = this.state;

    const armas = await fetch('https://valorant-api.com/v1/weapons?language=pt-BR')
      .then((data) => data.json())
      .then((data) => data.data)
      .catch((error) => console.log(error)); 
    
    const faca = armas.filter((arma) => arma.displayName === "Confronto").map((arma) => ({
      displayName: arma.displayName,
      displayIcon: arma.displayIcon,
      uuid: arma.uuid,
      categoryText: "Para uma solução mais íntima."
    }));
    
    const armasSelecionadas = armas.filter((arma) => arma.displayName !== "Confronto").map((arma) => ({
      displayName: arma.displayName,
      displayIcon: arma.displayIcon,
      uuid: arma.uuid,
      categoryText: arma.shopData.categoryText
    }));
    
    const armasDeRetorno = armasSelecionadas.concat(faca);

    this.setState({
      selectArmas: selectArmas.concat(armasDeRetorno)
    });

  }

  imgCarregada = (chave) => {
    const { loadingState } = this.props;
    const { selectArmas } = this.state
    if(selectArmas.length - 1 === chave ) {
      setTimeout(() => {
        loadingState('LOADING_STATE', { pageLoading: false, componentLoading: true} );
      }, 1500)
    }
  };

  render() { 
    const { selectArmas } = this.state;
    const {
      state: {
        reducerLoading: {statesLoading}
      }
    } = this.props;
    return ( 
      <>
        {(statesLoading.pageLoading === true) && <Loading />}
        <div className='page-agente-solo-armas'>
          <Header />
          <div className='container-antes-armas'>
              <div className='container-armas'>
                <div className='container-itens-armas'>
                  <div className='container-geral-armas'>

                    <div className='local-select-armas'>
                      {(selectArmas.length > 1) && selectArmas.map((arma, index) => 
                        <GerarArma 
                          key={index} 
                          arma={arma}
                          chave={index}
                          carregarImg={this.imgCarregada}
                        />)}
                    </div>
                    
                  </div>  
                </div>
            </div>
          </div>
        </div>
      </> 
    );
  }
}

const mapDispatchToProps = (dispatch) => ( {
  loadingState: (localRedux, value) => dispatch(addAssigment(localRedux, value))
});

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps, mapDispatchToProps)(Armas);