import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
//action creator
import {requestPostsList, listByCategory} from '../actions/posts'
//components
import Dashboard from './Dashboard';
import NewPost from './posts/NewPost';
import PostPage from './posts/PostPage';
import Nav from './shared/Nav';

const App = ({loadingBar}) => {
 
  return (
    <Router>
      <Fragment>
        <LoadingBar />
        <Nav />
        {loadingBar === 1
        ? null
        : <div>              
            <Route path='/' exact component={Dashboard} />
            {/* {categories.map(c => 
              <Route key={c.name} path={`/:${c.name}`} exact component={Dashboard} />
            )} */}
            <Route path='/post/:id' component={PostPage} />
            <Route path='/new' component={NewPost} />
            <Route path='/category/:category' exact component={Dashboard} />
          </div>          
        }
      </Fragment>
    </Router>
  );
}


const mapStateToProps = ({loadingBar}) => {
  return {
    loadingBar,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getPost : bindActionCreators(requestPostsList, dispatch),    
//     listByCategory : bindActionCreators(listByCategory, dispatch),
//   };
// }

export default connect(mapStateToProps)(App)