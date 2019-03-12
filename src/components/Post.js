import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { timeSince } from '../utils/helpers';
import { deletePost } from '../actions/posts'
import Rating from './Rating';
// import CommentsList from './CommentsList';

const Post = ({post, onDeleteClick, history}) => {

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
              título: <b>{post.id}</b>
            </p>
            <p>
              título: {post.title}
            </p>
            <p>
              autor: {post.author}
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
              qtd. Comentários: {post.commentCount}
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

const mapStateToProps = (store, {id} ) => {
  const post = store.posts.posts[id];
  const loading = store.posts.loading;
  return {
    post,
    loading,
  }
}
export default withRouter(
  connect(mapStateToProps, {onDeleteClick: deletePost})(Post)
);