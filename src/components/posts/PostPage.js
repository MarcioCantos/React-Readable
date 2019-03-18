import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestComentsByPost } from '../../actions/comments';
import Post from './index';
import Comment from '../comments';
import NewComment from '../comments/NewComment'

const PostPage = ({id, commentID, loadingBar, getPostComments}) => {

    // console.log('LOADHERE:',commentID)
    // getPostComments(id);
    useEffect(()=>{
        getPostComments(id)
    }, [])

    return (
        <div>
            <Post id={id} />
            {loadingBar.default === 1
            ? null
            : <ul>
                { commentID.map((id)=> (
                    <li key={id}>
                        <Comment id={id}/>
                    </li>
                )) }
              </ul>
            }
            <NewComment parentId={id} />
        </div>
    )
}

const mapStateToProps = ({loadingBar, comments}, props) =>{
    const { id } = props.match.params;
    return {
        id,
        commentID : Object.keys(comments.comments).map(id => id),
        loadingBar,
    }
};

const mapDispatchToProps = dispatch =>
    ({getPostComments: bindActionCreators(requestComentsByPost, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
