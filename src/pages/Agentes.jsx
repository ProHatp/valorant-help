import React, { Component } from 'react';
import { connect } from 'react-redux';
import addAssigment from '../redux/action'
import Agente from '../components/Agent';
import '../css/agentes.css'
import Header from '../components/Header';
import Modal from '../components/Modal';
import Loading from '../components/Loading';

class Agentes extends Component {
  constructor(props) {
    super(props);

    const { loadingState, addModal } = props
    loadingState('LOADING_STATE',{ pageLoading: true, componentLoading: false} );
    addModal('MODAL_AGENTE', {});
    
    this.state = {  }
  };

  clickInfoAgentes = (valor) => {
    const { addModal, loadingState } = this.props;
    addModal('MODAL_AGENTE', valor)
    loadingState('LOADING_STATE',{ pageLoading: false, componentLoading: true} );
  };

  clickSairAgente = () => {
    const { addModal } = this.props;
    addModal('MODAL_AGENTE', {});
  };

  imgCarregada = (chave) => {
    const { state: {myReducer}, loadingState } = this.props;
    if(myReducer.agentes.length - 1 === chave ) {
      setTimeout(() => {
        loadingState('LOADING_STATE', { pageLoading: false, componentLoading: true} );
      }, 1500)
    }
  };

  imgModal = () => {
    setTimeout(() => {
      const {loadingState} = this.props;
      document.querySelector('.modal-overflow').style.display = 'flex';
      loadingState('LOADING_STATE',{ pageLoading: false, componentLoading: false} );
    }, 1500)
  }

  async componentDidMount() {
    const { addAgentes } = this.props;
    const agents = await fetch('https://valorant-api.com/v1/agents?language=pt-BR')
      .then((data) => data.json())
      .then((data) => data.data)
      .catch((error) => console.log('error na api', error));
    
    const sova = agents.filter((agent) => (agent.displayName === 'Sova'))[1]
    const sovinha = {
      id: sova.uuid,
      displayName: sova.displayName,
      fullPortrait: sova.fullPortrait,
      description: sova.description,
      bustPortrait: sova.bustPortrait,
      agentRole: sova.role
    };
    const valorDeRetorno = agents.filter((agent) => (agent.displayName !== 'Sova'))
      .map((agent) => ({
        id: agent.uuid,
        displayName: agent.displayName,
        fullPortrait: agent.fullPortrait,
        description: agent.description,
        bustPortrait: agent.bustPortrait,
        agentRole: agent.role
      }));
    
    addAgentes('ADD_AGENTES', valorDeRetorno.concat(sovinha));
  };

  render() { 
    const {
      state: {
        myReducer,
        reducerLoading: {statesLoading}
      }
    } = this.props;
    return ( 
      <>
        { (myReducer.modalAgente !== undefined) && (Object.keys(myReducer.modalAgente).length !== 0) && 
          <Modal 
            agent={myReducer.modalAgente} 
            btnSair={this.clickSairAgente} 
            carregarImg={this.imgModal}
          /> 
        }
        {(statesLoading.pageLoading === true) && <Loading />}
        <Header />
        <section className='cards-agentes-container'>
          <div className='cards-agentes'>
            {(myReducer.agentes !== undefined) && myReducer.agentes
              .map((agent, index) => 
                <Agente 
                  key={index} 
                  agent={agent} 
                  clickAgente={this.clickInfoAgentes}
                  carregarImg={this.imgCarregada}
                  chave={index}
                />)}
          </div>
        </section>
      </> 
    );
  }
};

const mapDispatchToProps = (dispatch) => ( {
  addAgentes: (localRedux, value) => dispatch(addAssigment(localRedux, value)),
  addModal: (localRedux, value) => dispatch(addAssigment(localRedux, value)),
  loadingState: (localRedux, value) => dispatch(addAssigment(localRedux, value))
});
const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps, mapDispatchToProps)(Agentes);