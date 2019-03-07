import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from '../actions/posts';
import { createSelector } from 'reselect'
import { sortList } from '../utils/helpers'
import Post from './Post';


class Dashboard extends Component {
  state = {
    lastColumn : '',
  }

  render(){
    const { postIds, order, sortList } = this.props;
    
    const toggleOrder = (column) => {
      const sort = (this.state.lastColumn === column) ? !order : true 
      this.setState({lastColumn : column});
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

//Selector: Reordena a lista após ação do usuário.
const sortingList = createSelector(
  state => state.posts,
  state => state.column,
  state => state.order,
  state => state,
  (posts, column, order) => {
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

const mapDispatchToProps = dispatch => ({sortList : bindActionCreators(postsActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)