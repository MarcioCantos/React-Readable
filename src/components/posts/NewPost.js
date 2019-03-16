import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Action Creators
import { addPost, updatePost } from '../../actions/posts';
//Form Components
import Input from '../FormComponents/Input';
import Select from '../FormComponents/Select';
import TextArea from '../FormComponents/TextArea';
import Button from '../FormComponents/Button';
//Components
import { useFormImput } from '../../utils/useFields';
import { resetFields } from '../../utils/helpers';


function NewPost(props){
    const {post, categories, addPost, updatePost} = props;

    //set hooks for managing form fields
    const title = useFormImput(post ? post.title : '');
    const body = useFormImput(post ? post.body : '');
    const author = useFormImput(post ? post.author : '');
    const category = useFormImput(post ? post.category : '');


    const handleSubmit = (e) => {
        e.preventDefault();
        const holdFormsData = {
            id : post ? post.id : null,
            title : title.value,
            body : body.value,
            author : author.value,
            category : category.value,
        };

        post ? updatePost(holdFormsData) : addPost(holdFormsData);

        handleClearForm(e);
        props.onHide();
    };

    const handleClearForm = (e) => {
        e.preventDefault();
        const params = { title, body, author, category }
        resetFields(params)
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>                
                <Input 
                    {...title}
                    name={'title'}
                    title={'Lets Talk About:'}
                    placeholder={'I would like to talk...'}
                />
                <TextArea 
                    {...body}
                    title={"Whats Matter:"}
                    name={'message'}
                    placeholder={'What you are thinking goes here.'}
                    rows={10}
                />
                <Select
                    {...category}
                    name={'category'}
                    title={'The subject will be:'}
                    options={categories}
                    placeholder={'The subject is...'}
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
                />
                <Button
                    action={handleClearForm}
                    type={"secondary"}
                    title={"Clear"}
                />
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        addPost : bindActionCreators(addPost, dispatch),
        updatePost : bindActionCreators(updatePost, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(NewPost);
