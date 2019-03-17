import React, {Fragment, useState} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { timeSince } from '../../utils/helpers';
import { deletePost, ratePost } from '../../actions/posts';
import NewPost from './NewPost'
import Rating from '../shared/Rating';
import Modal from '../shared/Modal'

const Post = ({post, categories, commentCount, history, pagePost, setRate, onDeleteClick}) => {
  const [modalShow, setModalShow] = useState(false);

  //Modal - Close
  const closeModal = () => setModalShow(false);

  // Handle category link clicked
  const toCategory = (e, category) => {
    e.preventDefault();
    history.push(`/category/${category}`)
  }

  const handleDelete = () => {
    onDeleteClick(post.id);

    // se estiver na página individual do post, irá retornar para o destino antecedente.
    if(pagePost){
      history.goBack();
    }
  }

  return (
    <Fragment>
      {post === undefined 
      ? null
      : <div>
          <Link to={`/post/${post.id}`}> 
            <p>
              {post.title}
            </p>
            <p>
              autor: {post.author}
            </p>
            <p>
              texto: {post.body}
            </p>
            <p>
              categoria: 
              <button onClick={(e)=>toCategory(e, post.category)}>
                {post.category}
              </button>
            </p>
            <p>
              qtd. Comentários: {commentCount === 0 ? post.commentCount : commentCount}
            </p>
            <p>
              timestamp: {timeSince(post.timestamp)}
            </p>
          </Link>      
          <Rating values={{
            id : post.id,
            vote : post.voteScore,
            setRate : setRate,
          }} />
          <div>
            <button onClick={() => setModalShow(true)}>Editar</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <Modal 
            inner={NewPost} 
            show={modalShow}
            onHide={closeModal}
            title='Editing Post...'
            post={post}
            categories={categories}        
          />        
        </div>
      }
    </Fragment>
  )
}

const mapStateToProps = (store, {id} ) => {
  const post = store.posts.posts[id];
  const categories = store.posts.categories;
  const loading = store.posts.loading;
  const commentCount = store.comments.qtdComments;
  
  return {
    post,
    categories,
    loading,
    commentCount : commentCount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteClick: bindActionCreators(deletePost, dispatch),
    setRate: bindActionCreators(ratePost, dispatch),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Post)
);