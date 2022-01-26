import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import addAssigment from '../redux/action'
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

class Home extends Component {
  constructor(props) {
    super(props);

    const { loadingState } = props
    loadingState('LOADING_STATE',{ pageLoading: true, componentLoading: false} );

    this.state = {  }
  }

  testeButton = () => {

  }

  async componentDidMount() {
    setTimeout(() => {
      const { loadingState } = this.props
      loadingState('LOADING_STATE',{ pageLoading: false} );
    }, 1000)
  }

  render() {
    const { state: {reducerLoading: {statesLoading}} } = this.props;
    return ( 
      <>
        <Header />
        {/* {(statesLoading.pageLoading === true) && <Loading />} */}
        
      </> 
    );
  }
}

const mapDispatchToProps = (dispatch) => ( {
  addAgentes: (localRedux, value) => dispatch(addAssigment(localRedux, value)),
  loadingState: (localRedux, value) => dispatch(addAssigment(localRedux, value))
});
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
