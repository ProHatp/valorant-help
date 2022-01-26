import { combineReducers } from "redux";

const INITIAL_REDUCER = {
  state: ''
}

const INITICAL_LOADING = {
  statesLoading: { 
    pageLoading: true,
    componentLoading: true,
  }
}

const myReducer = (state = INITIAL_REDUCER, action) => {
  switch(action.type) {
    case 'ADD_AGENTES':
      return { agentes: action.state};
    case 'MODAL_AGENTE':
      return { ...state, modalAgente: action.state }
    default:
      return state
  }
}

const reducerLoading = (state = INITICAL_LOADING, action) => {
  switch(action.type) {
    case 'LOADING_STATE':
      return { ...state, statesLoading: action.state }
    default:
      return state;
  }
}

const rootReducer = combineReducers({ myReducer, reducerLoading });
export default rootReducer;
