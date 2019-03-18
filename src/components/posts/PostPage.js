import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Actions Creators
import { requestComentsByPost } from '../../actions/comments';
import { requestSinglePost } from '../../actions/posts'
//Components
import Page404 from '../shared/Page404/'
import Post from './index';
import Comment from '../comments';
import NewComment from '../comments/NewComment'
import Spinner from '../shared/Spinner'

const PostPage = (props) => {

    PostPage.propTypes = {
        id: PropTypes.string.isRequired,
        commentID : PropTypes.array.isRequired,
        loading : PropTypes.bool,
        getPostComments : PropTypes.func.isRequired,
        getPost: PropTypes.func.isRequired,
        errorMsg : PropTypes.string,
    }

    const {id, commentID, loading, getPostComments, getPost, errorMsg} = props

    useEffect(()=>{
        getPost(id);
        getPostComments(id);

    }, [])



    return (
        <Fragment>
            {errorMsg
            ? <Page404 msg={errorMsg} /> 
            :   
            <div className="container single-post-page">
                {/* Flag "pagePost" se TRUE retornar a página de categoria quando deletar uma postagem */}
                <Post id={id} pagePost />
                <NewComment parentId={id} />
                {loading
                ? <Spinner />
                : <ul>
                    { commentID.map((id)=> (
                        <li key={id}>
                            <Comment id={id}/>
                        </li>
                    )) }
                </ul> 
                }
            </div>
            }
        </Fragment>
    )
}

const mapStateToProps = ({loadingBar, comments, posts}, props) =>{
    const { id } = props.match.params;
    const {errorMsg} = posts
    const commentID = Object.keys(comments.comments)
        .sort((a,b,) => comments.comments[b].timestamp - comments.comments[a].timestamp )
        .map(id => id);

    return { 
        id, 
        commentID, 
        loadingBar,
        errorMsg,
    }
};

const mapDispatchToProps = dispatch => ({
    getPostComments: bindActionCreators(requestComentsByPost, dispatch),
    getPost : bindActionCreators(requestSinglePost, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
