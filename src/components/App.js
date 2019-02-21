import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//actions creators
import * as postsActions from '../actions/posts';
import * as authedUser from '../actions/authedUser';
//components
import Post from './Post';

class App extends Component {

  componentDidMount(){
    const userId = "thingone";
    this.props.posts.requestPostsList();
    this.props.authedUser.setAuthedUser(userId);
  }

  render() {
    const { postIds, loading } = this.props
    return (
      <Router>
        <Fragment>
          <div>
            {loading}
          </div>
          <ul>
            { postIds.map((id) => (
              <li key={id}>
                <Post id={id} />
              </li>
            ))}
          </ul>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps(store) {
  console.log('store: ', store)
  const { posts, loading } = store.posts

  return{
    postIds : Object.keys(posts).map(id => id),
    loading,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    posts : bindActionCreators(postsActions, dispatch),
    authedUser :  bindActionCreators(authedUser, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
