import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPost, listAllCategory } from '../../actions/posts';
import { useFormImput } from '../../utils/useFields';
import { resetFields } from '../../utils/helpers';

function NewPost(props){   
    const [toHome, setToHome] = useState(false);

    useEffect(()=> {
        props.listCategory();
    }, []);

    console.log('categorias em new post: ', props.categories)
    //set hooks for managing form fields
    const title = useFormImput('')
    const body = useFormImput('')
    const author = useFormImput('')
    const category = useFormImput('')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addPost({
            title: title.value, 
            body: body.value,
            author : author.value,
            category : category.value,
         });
         resetFields(title, body, author, category);
         setToHome(true);
    }  
    
    return (
        <div>
            {toHome && <Redirect to='/' />}
            <h3>Compose New Post</h3>
            <form onSubmit={handleSubmit}>
                <input
                    {...author}
                    placeholder="Author"
                />
                {/* <input
                    {...category}
                    placeholder="category"
                /> */}
                {/* <select value={shelf} onChange={e => handleChange(e.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select> */}
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
                        Submit
                </button>
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