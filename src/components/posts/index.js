import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { timeSince } from '../../utils/helpers';
import { deletePost, ratePost } from '../../actions/posts';
import Rating from '../shared/Rating';

const Post = ({post, commentCount, history, setRate, onDeleteClick}) => {

  const toCategory = (e, category) => {
    e.preventDefault();
    history.push(`/category/${category}`)
  }

  const handleDelete = (e) => {
    e.preventDefault();
    console.log('delete post')
    onDeleteClick(post.id);
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
          <Rating values={{
            id : post.id,
            vote : post.voteScore,
            setRate : setRate,
          }} />
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      }
    </Fragment>
  )
}

// const updateCommentsCount = (state) => {

//   return 1;
// }

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

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteClick: bindActionCreators(deletePost, dispatch),
    setRate: bindActionCreators(ratePost, dispatch),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Post)
);