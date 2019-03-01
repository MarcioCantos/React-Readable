import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as postsActions from '../actions/posts'
import * as authedUser from '../actions/authedUser'

const id = "thingone";

export function handleInitialData(posts) {
  // this.props.posts.requestPostsList();
  // this.props.authedUser.setAuthedUser(id);
  console.log('teste: ', posts)
}

const mapDispatchToProps = (dispatch) => {
  return {
    posts : bindActionCreators(postsActions, dispatch),
    authedUser :  bindActionCreators(authedUser, dispatch),
  }
}

export default connect(mapDispatchToProps)(handleInitialData)
