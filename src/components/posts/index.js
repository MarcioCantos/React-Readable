import React, {Fragment, useState} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//ICONS
import { FiThumbsUp, FiThumbsDown, FiUser, FiEdit3, FiTrash2, FiPlus } from "react-icons/fi";
import { FaCommentAlt } from "react-icons/fa";
//Helpers
import { timeSince } from '../../utils/helpers';
//API
import { deletePost, ratePost } from '../../actions/posts';
//Components
import NewPost from './NewPost'
import Rating from '../shared/Rating';
import Modal from '../shared/Modal';


const Post = ({post, categories, commentCount, history, pagePost, setRate, onDeleteClick}) => {
  const [modalShow, setModalShow] = useState(false);

  //Modal - Close
  const closeModal = () => setModalShow(false);

  // Handle category link clicked
  const toCategory = (e, category) => {
    e.preventDefault();
    history.push(`/${category}`)
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
      : 
      <Fragment>
        <div className="post">
          <div className="score-box">
            <Rating 
              values={{
                id : post.id,
                vote : post.voteScore,
                setRate : setRate,
              }}
              iconVoteUp={FiThumbsUp}
              iconVoteDown={FiThumbsDown}
            />
          </div>
          <div className="post-content">
            <div className="post-header">
              <div className="author-block">
                <FiUser className="icon-author" /> Posted by <b>{post.author}</b> in
                <span 
                  className="post-category" 
                  onClick={(e)=>toCategory(e, post.category)}> {post.category}
                </span>
              </div>
              <div className="post-date">
                {timeSince(post.timestamp)}
              </div>
            </div>
            <div className="post-title">
              <Link to={`/${post.category}/${post.id}`}>
                {post.title}
              </Link>
            </div>
            <div className="post-footer">
              <div className="post-comments">
                <FaCommentAlt className={`icon-comments ${commentCount > 0 ? "" : "empty"}`} />
                {commentCount} comment(s)
              </div>            
            </div>     
          </div>
          <div className="post-buttons">
              <button
                className="btn btn-default btn-edit"
                onClick={() => setModalShow(true)}
              > 
                <FiEdit3 />
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                <FiTrash2 />
              </button>

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
        {pagePost &&
          <div className="post-body">
            {post.body}
          </div>
        } 
      </Fragment>
      }
    </Fragment>
  )
}

const mapStateToProps = (store, {id} ) => {
  const post = store.posts.posts[id];
  const categories = store.posts.categories;
  const loading = store.posts.loading;
  const commentCount = store.comments.comments;
  
  return {
    post,
    categories,
    loading,
    commentCount : Object.keys(commentCount).length,
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