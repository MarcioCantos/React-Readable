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
    console.log('storeeeeeee',props)
    const { id } = props.match.params;
    console.log('idddd: ', id)
    return { id }

}

export default connect(mapStateToProps)(PostPage);