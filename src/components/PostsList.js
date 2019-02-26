import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';


class PostsList extends Component {

  render(){
    const { postIds } = this.props
    return(
      <div>
        <ul>
          { postIds.map((id) => (
            <li key={id}>
              <Post id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  const {posts} = store.posts
  return {
    postIds : Object.keys(posts).map(id => id)
  }
}

export default connect(mapStateToProps)(PostsList)