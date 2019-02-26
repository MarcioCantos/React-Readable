import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//actions creators
import * as postsActions from '../actions/posts';
import * as authedUser from '../actions/authedUser';
//components
import PostsList from './PostsList';
import Loading from '../utils/Loading'

class App extends Component {

  componentDidMount(){
    const userId = "thingone";
    this.props.posts.requestPostsList();
    this.props.authedUser.setAuthedUser(userId);
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div>
            { this.props.loading === true
              ? <Loading />
              : <div>
                <Route patth='/' exact component={PostsList} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps(store) {
  const { loading } = store.posts
  return {
    postslista : store.posts.posts,
    loading
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    posts : bindActionCreators(postsActions, dispatch),
    authedUser :  bindActionCreators(authedUser, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)