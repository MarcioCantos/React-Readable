import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
//components
import Dashboard from './Dashboard';
import NewPost from './NewPost';
import Nav from './Nav';

class App extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <Nav />
            <Route path='/' exact component={Dashboard} />
            <Route path='/new' component={NewPost} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect()(App)