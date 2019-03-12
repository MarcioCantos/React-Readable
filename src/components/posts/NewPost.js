import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';
import { useFormImput } from '../../utils/useFields';
import { resetFields } from '../../utils/helpers';

function NewPost(props){   
    const [toHome, setToHome] = useState(false);

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
                <input
                    {...category}
                    placeholder="category"
                />
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

const mapDispatchToProps = dispatch => ({addPost : bindActionCreators(addPost, dispatch)})

export default connect(null, mapDispatchToProps)(NewPost);