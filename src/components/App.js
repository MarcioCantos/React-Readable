import React, { Component, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

import {requestPostsList} from '../actions/posts'
//components
import Dashboard from './Dashboard';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Nav from './Nav';

class App extends Component {

  componentDidMount(){
    this.props.getPost();
  }  

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <Nav />
            <Route path='/' exact component={Dashboard} />
            <Route path='/new' component={NewPost} />
            <Route path='/post' component={PostPage} />
          </div>
        </Fragment>
      </Router>
    );
  }
}


const mapStateToProps = (store) => {
  const { posts } = store.posts
  const initialList = Object.keys(posts).map(id => id);
  return {
    posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPost : ()=> dispatch(requestPostsList())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)