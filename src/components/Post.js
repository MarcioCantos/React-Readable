import React from 'react';
import { connect } from 'react-redux';
import { timeSince } from '../utils/helpers';
import { deletePost } from '../actions/posts'
import Rating from './Rating';
// import CommentsList from './CommentsList';

const Post = ({post, onDeleteClick}) => {

  return (
    <div>
      <div>
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
          categoria: {post.category}
        </p>
        <p>
          qtd. Comentários: {post.commentCount}
        </p>
        <p>
          timestamp: {timeSince(post.timestamp)}
        </p>
        <Rating score={post.voteScore}/>
        <div>
          <button onClick={() => onDeleteClick(post.id)}>Delete</button>
        </div>

      </div>
      {/* <CommentsList /> */}
      <hr />
    </div>
  )
}

const mapStateToProps = (store, {id} ) => {
  const post = store.posts.posts[id];
  return {
    post
  }
}
export default connect(mapStateToProps, {onDeleteClick: deletePost})(Post)