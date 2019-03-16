import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { useFormImput } from '../../utils/useFields';
import { resetFields } from '../../utils/helpers';
import { addComments } from '../../actions/comments'
//Form Components
import Input from '../FormComponents/Input';
import TextArea from '../FormComponents/TextArea';
import Button from '../FormComponents/Button';

const NewComment = (props) => {

    const {parentId, addcomments} = props

    const author = useFormImput('');
    const body = useFormImput('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addcomments({
            author: author.value,
            body: body.value,            
        }, parentId);       
        handleClearForm(e);
    }

    const handleClearForm = (e) => {
        e.preventDefault();

        const params = { author, body }
        resetFields(params)
    }
   
    return (
        <div>
            <form onSubmit={handleSubmit}>                
            
                <TextArea 
                    {...body}
                    title={"Whats Matter:"}
                    name={'message'}
                    placeholder={'What you are thinking goes here.'}
                    rows={10}
                />               
                <Input 
                    {...author}
                    name={'author'}
                    title={'Name'}
                    placeholder={'Author Name'}
                />
                <Button
                    action={handleSubmit}
                    type={"primary"}
                    title={"Submit Post"}
                    style={buttonStyle}
                />
                <Button
                    action={handleClearForm}
                    type={"secondary"}
                    title={"Clear"}
                    style={buttonStyle}
                />
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

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};