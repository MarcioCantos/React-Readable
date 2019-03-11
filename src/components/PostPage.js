import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';

class PostPage extends Component {
    render() {
        const { id } = this.props
        console.log(id)
        return (
            <div>
                <Post id={id} />
            </div>
        )
    }
}

function mapStateToProps(store, props){
    const id = '8xf0y6ziyjabvozdd253nd';

    return { id }

}

export default connect(mapStateToProps)(PostPage);