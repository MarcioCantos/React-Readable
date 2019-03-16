import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect'
import { sortList } from '../utils/helpers'
import './styles.css'
//Bootstrap
import Button from 'react-bootstrap/Button'
//actions creators
import { requestPostsList, sortPosts, listByCategory } from '../actions/posts';
//components
import Post from './posts';
import NewPost from './posts/NewPost';
// import ModalWindows from './shared/Modal/ModalWindow'
import Modal from './shared/Modal'


function Dashboard(props) {
  const [column, setColumn] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const { postIds, order,  match, getAll, sortList, listByCategory, categories } = props;
  console.log('props em dashboard: ', props)
  
  //Load Posts by Categories or load all
  useEffect(()=>{
    const params = Object.keys(match.params)
    if(params.length !== 0) {
      listByCategory(match.params);
    } else {
      getAll();
    }
  },[match.params.category])

  //Sorting Columns
  const toggleOrder = (c) => {
    const sort = (column === c) ? !order : true ;
    setColumn(c);
    sortList(c, sort);
  }  
  
  //Modal - Close
  const closeModal = () => setModalShow(false);

  return(
    <div>        
      <button onClick={() => toggleOrder('title')}>Order by Title</button>
      <button onClick={() => toggleOrder('timestamp')}>Order by Date</button>
      <button onClick={() => toggleOrder('voteScore')}>Order by Vote Score</button>
      <button onClick={() => toggleOrder('commentCount')}>Order by Comment Count</button>
      
      {/** Modal Button */}
      <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          className="addNew"
        >
          Add Post
        </Button>
      
      {
        /**
         * @inner recebe o Componente que será exibido dentro do Modal
         * @show e @onHide devem ser criados no componente que conteŕa o modal e passado como props
         * @title título que será exibido quando o componente for exibido ao usuário
         * Qualquer outro props que for passado será "enviado" ao @inner como props.
         */
      }
      <Modal 
        inner={NewPost} 
        show={modalShow}
        onHide={closeModal}
        title='Add New Post'
        categories={categories}        
      />

      {/* <ModalWindows
        show={modalShow}
        onHide={closeModal}
        title='Add New Post'
      >
        <NewPost 
          categories={categories}
          onHide={closeModal}
        />
      </ModalWindows> */}

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
  const {categories, posts, column, order } = store.posts
  const initialList = Object.keys(posts).map(id => id);
  
  return {
    categories,
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