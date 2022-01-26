import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import addAssigment from '../redux/action'
import '../css/modal.css'

class Modal extends Component {
  constructor(props) {
    super(props);

    for (let i = 0; i <= 50; i += 1) {
      window.clearInterval(i);
    }

    const {loadingState} = props;
    loadingState('LOADING_STATE',{ pageLoading: false, componentLoading: true} );

    this.state = {  }
  }

  render() {
    const { state: {reducerLoading: {statesLoading}}, agent, btnSair, carregarImg } = this.props;
    return (
      <div className='modal-overlaw-agente'>
        <div className='modal'>
          <div className='modal-button-sair'onClick={btnSair}>X</div>
          <div className='agent-display'>
          {(statesLoading.componentLoading === true) && 
            <div className='modal-name'><h1>CARREGANDO...</h1></div>
          }
          <div className='modal-overflow'>
            <div className='modal-name'><h1>{agent.displayName.toUpperCase()}</h1></div>
              <div className='modal-img'><img src={ agent.fullPortrait } alt="" /></div>
              <div className='modal-infos'>
                <div className='modal-funcao'>
                  <h3>FUNÇÃO</h3>
                  <p>{agent.agentRole.displayName.toUpperCase()} <img src={ agent.agentRole.displayIcon } alt={ agent.agentRole.displayName } onLoad={() => carregarImg()} /></p>
                </div> 

                <div className='modal-biografia'>
                  <h3>BIOGRAFIA</h3>
                  <p>{agent.description}</p>
                </div>

                <div className='modal-button'>
                  <Link to={`/agente-solo/${agent.id}`}>          
                    <p>
                      <span className="bg"></span>
                      <span className="base"></span>
                      <span className="text">SABER MAIS</span>
                    </p>
                  </Link>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ( {
  loadingState: (localRedux, value) => dispatch(addAssigment(localRedux, value))
});

const mapStateToProps = (state) => ({state});
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
