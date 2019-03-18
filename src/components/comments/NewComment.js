import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useFormImput } from '../../utils/useFields';
import { resetFields } from '../../utils/helpers';
import { addComments } from '../../actions/comments'

const NewComment = ({parentId, addcomments}) => {

    const author = useFormImput('');
    const body = useFormImput('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addcomments({
            author: author.value,
            body: body.value,
        }, parentId);
        resetFields(author, body);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    {...author}
                    placeholder='Author'
                />
                <textarea
                    {...body}
                    placeholder="What I'm thinking right now..."
                    className='textarea'
                    maxLength={280}
                />
                <button
                    className='btn'
                    type='submit'
                    disabled={body.value === ''}>
                        Submit
                </button>
            </form>
        </div>
    )
}
// const mapStateToProps = (store, parentId) => {
//     console.log('STORE COMMENT PAGE: ', store);
//     return { parentId }
// }

const mapDispatchToProps = dispatch => ({
    addcomments : bindActionCreators(addComments, dispatch)
})

export default connect(null, mapDispatchToProps)(NewComment);
