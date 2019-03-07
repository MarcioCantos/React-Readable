import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingBar from 'react-redux-loading';
//actions creators
import * as postsActions from '../actions/posts';
import * as authedUser from '../actions/authedUser';
//components
import Dashboard from './Dashboard';
import NewPost from './NewPost';
import Nav from './Nav';

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
          <LoadingBar />
          <div>
            <Nav categories={this.props.categories}/>
            { this.props.loading === true
              ? 'loading...'
              : <div>
              <Route path='/' exact component={Dashboard} />
              <Route path='/new' component={NewPost} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps(store) {
  const { posts, loading } = store.posts
  return {
    loading,
    categories : Object.values(posts).map(cat => cat.category),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    posts : bindActionCreators(postsActions, dispatch),
    authedUser :  bindActionCreators(authedUser, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)