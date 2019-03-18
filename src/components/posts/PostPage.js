import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Bootstrap
import {Container, Col, Row, Button, DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap';
//Actions Creators
import { requestComentsByPost } from '../../actions/comments';
import { requestSinglePost } from '../../actions/posts'
//Components
import Page404 from '../shared/Page404/'
import Post from './index';
import Comment from '../comments';
import NewComment from '../comments/NewComment'

const PostPage = (props) => {

    const {id, commentID, loadingBar, getPostComments, getPost, errorMsg} = props

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
