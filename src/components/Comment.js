import React, {Fragment} from 'react';
import { connect } from 'react-redux';

const Comment = ({comment}) => {
    const {author, body, voteScore} = comment;
    return (
        <Fragment>
                <div>
                    <p>
                        {author}
                    </p>
                    <p>
                        {body}
                    </p>
                    <p>
                        {voteScore}
                    </p>
                </div>

        </Fragment>
    );
};

const mapStateToProps = ({comments}, {id}) => {
    return {
        comment: comments.comments[id],
    }
}

export default connect(mapStateToProps)(Comment);