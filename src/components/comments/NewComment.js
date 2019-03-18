import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.css';
//Helpers
import { useFormImput } from '../../utils/useFields';
import { resetFields } from '../../utils/helpers';
//Form Components
import Input from '../FormComponents/Input';
import Select from '../FormComponents/Select';
import TextArea from '../FormComponents/TextArea';
import Button from '../FormComponents/Button';
//Action Creators
import { addComments, updateComment } from '../../actions/comments'

const NewComment = (props) => {
    const {comment, parentId, addComments, updateComment} = props

    //set hooks for managing form fields
    const author = useFormImput(comment ? comment.author : '');
    const body = useFormImput(comment ? comment.body : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const holdFormsData = {
            id : comment ? comment.id : null,
            author : author.value,
            body : body.value
        }

        if(comment){
            updateComment(holdFormsData);
            props.onHide();
        } else {
            addComments(holdFormsData, parentId);
            handleClearForm(e);
        }  
    }

    const handleClearForm = (e) => {
        e.preventDefault();

        resetFields({ author, body });
    }
   
    return (
        <div className="container">
            <div className="comment-form-page">
                <form onSubmit={handleSubmit}>                
                
                    <TextArea 
                        {...body}
                        title={"What are you thinking?"}
                        name={'message'}
                        placeholder={'I guess...'}
                        rows={3}
                    />               
                    <Input 
                        {...author}
                        name={'author'}
                        title={'Name'}
                        placeholder={'Vous vous appelez?'}
                        disabled={comment ? true : false}
                    />
                    <Button
                        action={handleSubmit}
                        type={"primary"}
                        title={comment ? props.buttonTxt : 'Add Comment'}
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
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addComments : bindActionCreators(addComments, dispatch),
    updateComment : bindActionCreators(updateComment, dispatch),
})

export default connect(null, mapDispatchToProps)(NewComment);

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};