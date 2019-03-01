import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from '../actions/posts';
import { createSelector } from 'reselect'
import { sortList } from '../utils/helpers'
import Post from './Post';


class PostsList extends Component {
  state = {
    lastColumn : '',
  }

  render(){

    const { postIds, order, sortList } = this.props;
    
    const toggleOrder = (column) => {
      let sort;

      if(this.state.lastColumn === column) {
        sort = !order
      } else {
        this.setState({lastColumn : column});
        sort = true
      }
      console.log('lastColumn: ', this.state.lastColumn)      
      return sortList.sortPost(column, sort)
    }    

    return(
      <div>        
        <ul>
          { postIds.map((id) => (
            <li key={id}>
              <Post id={id} />
            </li>
          ))}
        </ul>
        <button onClick={() => toggleOrder('title')}>Order by Title</button>
        <button onClick={() => toggleOrder('timestamp')}>Order by Date</button>
        <button onClick={() => toggleOrder('voteScore')}>Order by Vote Score</button>
        <button onClick={() => toggleOrder('commentCount')}>Order by Comment Count</button>
      </div>
    )
  }
}

const sortingList = createSelector(
  state => state.posts,
  state => state.column,
  state => state.order,
  state => state,
  (posts, column, order, teste) => {
    console.log('selector: ', order)
    const sortingList = Object.values(posts).sort(sortList(column, order));
    return sortingList.map(post => post.id);
  }
);

const mapStateToProps = (store) => {
  const {posts, column, order } = store.posts
  const initialList = Object.keys(posts).map(id => id);
  return {
    posts,
    order,
    postIds : column === undefined ? initialList : sortingList(store.posts),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sortList : bindActionCreators(postsActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)