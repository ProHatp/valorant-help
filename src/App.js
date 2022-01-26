import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Home from './pages/Home';
import Agentes from './pages/Agentes';
import AgenteSolo from './pages/AgenteSolo';
import Armas from './pages/Armas';
import ArmaSolo from './pages/ArmaSolo';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/agentes' component={Agentes}/>
        <Route path='/agente-solo/:id' render={(props) => <AgenteSolo {...props} />} />
        <Route path='/agente-solo' render={(props) => <AgenteSolo {...props} />}  />
        <Route path='/arma-solo/:id' render={(props) => <ArmaSolo { ...props } />} />
        <Route path='/armas' component={Armas}/>
        <Route exact path='/' component={Agentes} />
      </Switch>    
    </BrowserRouter>
  );
}

export default App;
