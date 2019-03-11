import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
//action creator
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
    const{loading} = this.props.posts
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Nav />
          {loading === true
          ? null
          : <div>              
              <Route path='/' exact component={Dashboard} />
              <Route path='/post/:id' component={PostPage} />
              <Route path='/new' component={NewPost} />
            </div>          
          }
        </Fragment>
      </Router>
    );
  }
}


const mapStateToProps = ({posts}) => {
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