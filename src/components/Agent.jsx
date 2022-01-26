import React, { Component } from 'react';

class Agente extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    const {agent, clickAgente, carregarImg, chave} = this.props
    return ( 
      <div 
        className={`card-item-agentes card-item-${agent.agentRole.displayName.toLowerCase()}-agentes`}
        onClick={() => clickAgente(agent)}
      >
        <div className='card-tipo-agentes'>
          <img 
            src={agent.agentRole.displayIcon} 
            alt={agent.agentRole.displayName} 
            onLoad={() => carregarImg(chave)}
          />
        </div>
        <div className='card-nome-agentes'>{agent.displayName}</div>
        <div className='card-agentes'>
          <img src={agent.bustPortrait} alt="" />
        </div>
      </div>
    );
  }
}

export default Agente;
