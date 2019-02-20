import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postsActions from '../actions/posts'
import PostsList from './PostsList'

class App extends Component {

  componentDidMount(){
    this.props.requestPostsList()
  }

  render() {
    // const { posts } = this.props
    // console.log('posts: ', posts)
    return (
      <div>
        <PostsList />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return{
    posts : store.posts,
    // loading : store.data.loading
  }
}

const mapDispatchToProps = dispatch =>{
  return bindActionCreators(postsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
