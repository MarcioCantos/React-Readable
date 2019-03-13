import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect'
import { sortList } from '../utils/helpers'
//actions creators
import { requestPostsList, sortPosts, listByCategory } from '../actions/posts';
import Post from './posts';


function Dashboard(props) {
  const [column, setColumn] = useState('');
  const { postIds, order,  match, getAll, sortList, listByCategory } = props;

  console.log(props)
  

  useEffect(()=>{
    if(Object.keys(match.params).length !== 0) {
      listByCategory(match.params);
    } else {
      getAll();
    }
  },[match.params.category])

  const toggleOrder = (c) => {
    const sort = (column === c) ? !order : true ;
    setColumn(c);
    sortList(c, sort);
  }    

  return(
    <div>        
      <button onClick={() => toggleOrder('title')}>Order by Title</button>
      <button onClick={() => toggleOrder('timestamp')}>Order by Date</button>
      <button onClick={() => toggleOrder('voteScore')}>Order by Vote Score</button>
      <button onClick={() => toggleOrder('commentCount')}>Order by Comment Count</button>
      <ul>
        { postIds.map((id) => (
          <li key={id}>
            <Post id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAll : bindActionCreators(requestPostsList, dispatch),
    sortList : bindActionCreators(sortPosts, dispatch),
    listByCategory : bindActionCreators(listByCategory, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);