import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.css'
//ICONS
import { FiThumbsUp, FiThumbsDown, FiEdit3, FiTrash2 } from "react-icons/fi";
//Helpers
import { timeSince } from '../../utils/helpers';
//Actions Creators
import { deleteComment, rateComment } from '../../actions/comments';
//Components
import NewComment from './NewComment'
import Rating from '../shared/Rating';
import Modal from '../shared/Modal';


const Comment = ({comment, setRate, onDeleteClick}) => {

    Comment.propTypes = {
        comment: PropTypes.object.isRequired,
        setRate : PropTypes.func.isRequired,
        onDeleteClick : PropTypes.func.isRequired,
    }

    const {id, author, body, voteScore} = comment;
    const [modalShow, setModalShow] = useState(false);

    //Modal - Close
    const closeModal = () => setModalShow(false);

    return (
        <Fragment>
            <div className="row comment">
                <div className="comment-score-box">
                    <Rating 
                        values={{
                            id,
                            vote : voteScore,
                            setRate : setRate,
                        }}
                        iconVoteUp={FiThumbsUp}
                        iconVoteDown={FiThumbsDown}
                    />
                </div>
                <div className="comment-content">
                    <div className="comment-txt">
                        {body}
                    </div>
                    <div className="comment-footer">
                        <div className="comment-author">
                            Posted by <b>{author}</b> :: <i> {timeSince(comment.timestamp)}</i>
                        </div>
                    </div>
                </div>
                <div className="comment-buttons">
                    <button
                        className="btn btn-default btn-edit"
                        onClick={() => setModalShow(true)}
                        > 
                            <FiEdit3 />
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => onDeleteClick(id)}
                        >
                            <FiTrash2 />
                        </button>
                            </div>                                
                    </div>
            <Modal 
                inner={NewComment}
                show={modalShow}
                onHide={closeModal}
                title={`Editing Comment from ${author}`}
                buttonTxt={'Confirm'}
                comment={comment}
            />

        </Fragment>
    );
};

const mapStateToProps = ({comments}, {id}) => {
    return {
        comment: comments.comments[id],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteClick: bindActionCreators(deleteComment, dispatch),
        setRate: bindActionCreators(rateComment, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);