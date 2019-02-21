import React, { Component } from 'react';
import { connect } from 'react-redux';


class PostsList extends Component {

  render(){

    const { posts, loading } = this.props
    console.log('posts: ', posts)

    return(
      <div>
        <ul>
            { loading ? 'Loading...'
              : posts.map(posts => (
''
            )) }
          </ul>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    posts : store.posts.posts,
    loading : store.posts.loading,
  }
}

export default connect(mapStateToProps)(PostsList)