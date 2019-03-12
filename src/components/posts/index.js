import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { timeSince } from '../../utils/helpers';
import { deletePost } from '../../actions/posts';
import Rating from '../shared/Rating';
// import CommentsList from './CommentsList';

const Post = ({post, commentCount, onDeleteClick, history}) => {

  const toCategory = (e, category) => {
    e.preventDefault();
    history.push(`/category/${category}`)
  }

  return (
    <Fragment>
      {post === undefined 
      ? 'null'
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
          <Rating id={post.id}/>
          <div>
            <button onClick={() => onDeleteClick(post.id)}>Delete</button>
          </div>
        </div>
      }
    </Fragment>
  )
}

const updateCommentsCount = (state) => {

  return 1;
}

const mapStateToProps = (store, {id} ) => {
  const post = store.posts.posts[id];
  const loading = store.posts.loading;
  const commentCount = store.comments.qtdComments;
  
  return {
    post,
    loading,
    commentCount : commentCount,
  }
}
export default withRouter(
  connect(mapStateToProps, {onDeleteClick: deletePost})(Post)
);