import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPost } from '../actions/posts';

function NewPost(props){   
    const [toHome, setToHome] = useState(false);

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
         resetFields();
         setToHome(true);
    }

    const resetFields = () => {
        title.bind.reset();
        body.bind.reset();
        category.bind.reset();
        author.bind.reset();
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

//Manage form's fields 
function useFormImput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e){
        setValue(e.target.value)
    }

    return {
        value,
        onChange : handleChange,
        bind : {reset: () => setValue(""),}
    };
}

const mapDispatchToProps = dispatch => ({addPost : bindActionCreators(addPost, dispatch)})

export default connect(null, mapDispatchToProps)(NewPost);