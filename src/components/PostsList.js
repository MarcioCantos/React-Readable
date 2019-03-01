import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from '../actions/posts';
import { createSelector } from 'reselect'
import { sortList } from '../utils/helpers'
import Post from './Post';


class PostsList extends Component {

  render(){
    const { postIds } = this.props
    console.log('postsSorting: ', this.props)
    return(
      <div>        
        <ul>
          { postIds.map((id) => (
            <li key={id}>
              <Post id={id} />
            </li>
          ))}
        </ul>
        {/* <button onClick={sortPost('title', true)}>Order by Title</button>
        <button onClick={sortPost('timestamp', true)}>Order by Title</button>
        <button onClick={sortPost('timestamp', true)}>Order by Title</button> */}
      </div>
    )
  }
}

const sortingList = createSelector(
  state => state.sorting,
  sorting => {
    const {posts} = this.props;
    return Object.values(posts).sort(sortList(sorting.column, sorting.order))
  }
);

const mapStateToProps = (store) => {
  const {posts, column, order} = store.posts
  console.log('teste coluna e order: ', column)

  console.log('teste2 ', Object.values(posts).sort(sortList('timestamp', true)))

  return {
    posts,
    sorting : {column, order},
    postIds : Object.keys(posts).map(id => id),
  }
}


export default connect(mapStateToProps)(PostsList)


// const tag = posts => t => contents => posts.sort((a,b)=> posts[a].category > posts[b].category);

// `<${t}>${contents}</${t}>`
// tag('b')('this is bold!') 
// > <b>this is bold!</b>

// (a,b) => tweets[b].timestamp - tweets[a].timestamp)