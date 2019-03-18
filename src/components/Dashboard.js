import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect'
import { sortList } from '../utils/helpers'
//Bootstrap
import {Container, Col, Row, Button, DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap';
//ICONS
import { FaPlus } from "react-icons/fa";
//actions creators
import { requestPostsList, sortPosts, listByCategory } from '../actions/posts';
//components
import Post from './posts';
import NewPost from './posts/NewPost';
import Modal from './shared/Modal';

function Dashboard(props) {
  const [column, setColumn] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const { postIds, order,  match, getAll, sortList, listByCategory, categories } = props;

  const TITLE = 'title';
  const TIMESTAMP = 'timestamp';
  const VOTESCORE = 'voteScore';
  const COMMENTCOUNT = 'commentCount';
  
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
    <Container>
        <Row>
          <Col md={{ span: 2, offset: 10 }}>
            <ButtonGroup >        
              <DropdownButton as={ButtonGroup} title="Order by" id="bg-nested-dropdown" variant="secondary" size="sm"  >
                <Dropdown.Item eventKey="1" onClick={() => toggleOrder(TITLE)} >
                  Title
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => toggleOrder(TIMESTAMP)}>
                  Date
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={() => toggleOrder(VOTESCORE)}>
                  Vote Score
                </Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </Col>

        </Row>
      
      {/** Modal Button */}
      <Button
          onClick={() => setModalShow(true)}
          className="btn-addNew"
        >
          <FaPlus/>
          <div>
            New 
          </div>
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
      <Row className="dashboard">
        <ul>
          { postIds.map((id) => (
            <li key={id}>
              <Post id={id} />
            </li>
          ))}
        </ul>

      </Row>
    </Container>
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
  // sort((a,b,) => tweets[b].timestamp - twwets[a].timestamp)

  const initialList = posts === undefined ? []
    : Object.keys(posts)
    .sort((a,b,) => posts[b].timestamp - posts[a].timestamp )
    .map(id => id);
  
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