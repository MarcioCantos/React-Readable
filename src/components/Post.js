import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

// author: "thingone"
// body: "Just kidding. It takes more than 10 minutes to learn technology."
// category: "redux"
// commentCount: 0
// deleted: false
// id: "6ni6ok3ym7mf1p33lnez"
// timestamp: 1468479767190
// title: "Learn Redux in 10 minutes!"
// voteScore: -5