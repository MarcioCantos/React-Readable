import React, {Fragment, useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteComment, rateComment } from '../../actions/comments';
import NewComment from './NewComment'
import Rating from '../shared/Rating';
import Modal from '../shared/Modal';

const Comment = ({comment, setRate, onDeleteClick}) => {
    const {id, author, body, voteScore} = comment;
    const [modalShow, setModalShow] = useState(false);

    //Modal - Close
    const closeModal = () => setModalShow(false);

    return (
        <Fragment>
            <div>
                <p>
                    {author}
                </p>
                <p>
                    {body}
                </p>
                <p>
                </p>
                <Rating values={{
                    id,
                    vote : voteScore,
                    setRate : setRate,
                }} />
                <button onClick={() => setModalShow(true)}>Editar</button>
                <button onClick={() => onDeleteClick(id)}>Delete</button>
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