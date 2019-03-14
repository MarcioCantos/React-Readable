import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//API
import { addPost, listAllCategory } from '../../actions/posts';
//Form Components
import Input from '../FormComponents/Input';
import Select from '../FormComponents/Select';
import TextArea from '../FormComponents/TextArea';
import Button from '../FormComponents/Button';
//Components
import { useFormImput } from '../../utils/useFields';
import { resetFields } from '../../utils/helpers';


function NewPost(props){   
    const [toHome, setToHome] = useState(false);

    useEffect(()=> {
        props.listCategory();
    }, []);

    //set hooks for managing form fields
    const title = useFormImput('');
    const body = useFormImput('');
    const author = useFormImput('');
    const category = useFormImput('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addPost({
            title: title.value, 
            body: body.value,
            author : author.value,
            category : category.value,
        });
        handleClearForm(title, body, author, category);
        setToHome(true);
    }
    const handleClearForm = (...args) => {
        resetFields(...args)
    }
    
    return (
        <div>
            {toHome && <Redirect to='/' />}
            <h3>Compose New Post</h3>
            <form onSubmit={handleSubmit}>
                {/* <input
                    {...author}
                    placeholder="Author"
                /> */}
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
                    options={props.categories}
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
                    style={buttonStyle}
                />
                <Button
                    action={handleClearForm}
                    type={"secondary"}
                    title={"Clear"}
                    style={buttonStyle}
                />
                {/* <input
                    {...category}
                    placeholder="category"
                /> */}
                {/* 
                <select {...category}>
                    <option value="black" disabled>Categoria</option>
                    {props.categories.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                        )
                    )}
                </select>
                <input
                    {...title}
                    placeholder="Title"
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
                        Submit Post
                </button>
                */}
            </form>
        </div>
    );
}

const mapStateToProps = (store) => {
    return {categories : store.posts.categories};
}

const mapDispatchToProps = dispatch => {
    return {
        addPost : bindActionCreators(addPost, dispatch),
        listCategory : bindActionCreators(listAllCategory, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};