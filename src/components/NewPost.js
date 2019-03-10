import React, {useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPost } from '../actions/posts';

function NewPost(props){   
    
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
        
         title.bind.reset();
         body.bind.reset();
         category.bind.reset();
         author.bind.reset();
        
    }

    /**
     * todo: Redirect to / if submited
     */
    
    return (
        <div>
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
                    disabled={body === ''}>
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