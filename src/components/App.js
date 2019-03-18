import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import './App.css'
//bootstrap
import 'bootstrap/dist/css/bootstrap.css';
//action creator
import {listAllCategory} from '../actions/posts'
//components
import Dashboard from './Dashboard';
import NewPost from './posts/NewPost';
import PostPage from './posts/PostPage';
import Nav from './shared/Nav';

const App = (props) => {
  const { loadingBar } = props
  
  useEffect(()=>{
    props.getCategories();
  },[])

  return (
    <Router>
      <Fragment>
        <LoadingBar />
        <Nav />
        {loadingBar === 1
        ? 'Loading...'
        : <div>              
            <Route path='/' exact component={Dashboard} />
            <Route path='/:category' exact component={Dashboard} />
            <Route path='/new' component={NewPost} />
            <Route path='/post/edit/:id' component={NewPost} />
            <Route path='/:category/:id' component={PostPage} />
          </div>          
        }
      </Fragment>
    </Router>
  );
}


const mapStateToProps = ({loadingBar}) => {
  return {
    loadingBar,
  };
};

const mapDispatchToProps = (dispatch) => ({ getCategories : bindActionCreators(listAllCategory, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(App)