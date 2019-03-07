import React, {useState} from 'react';

function NewPost(){    

    const [text, setText] = useState('');

    const handleChange = (e) => {
        const text = e.target.value;
        setText(text)
        console.log("Typing....   ", text)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Post: ', text);
        setText('');
    }

    /**
     * todo: Redirect to / if submited
     */

    return (
        <div>
            <h3>Compose New Post</h3>
            <form onSubmit={handleSubmit}>
                <textarea 
                    placeholder="What'shapping?"
                    value={text}
                    onChange={handleChange}
                    className='textarea'
                    maxLength={280}
                />
                <button
                    className='btn'
                    type='submit'
                    disabled={text === ''}>
                        Submit
                </button>
            </form>
        </div>
    );

}

export default NewPost;