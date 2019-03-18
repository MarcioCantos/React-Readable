import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import './App.css';
//bootstrap
import 'bootstrap/dist/css/bootstrap.css';
//action creator
import { listAllCategory } from '../actions/posts';
//components
import Spinner from './shared/Spinner';
import Dashboard from './Dashboard';
import NewPost from './posts/NewPost';
import PostPage from './posts/PostPage';
import Nav from './shared/Nav';

const App = (props) => {
	App.propTypes = {
		loading: PropTypes.string.isRequired
	};

	const { loading } = props;

	useEffect(() => {
		props.getCategories();
	}, []);

	return (
		<Router>
			<Fragment>
				<LoadingBar />
				<Nav />
				{loading ? (
					<Spinner />
				) : (
					<div>
						<Route path="/" exact component={Dashboard} />
						<Route path="/:category" exact component={Dashboard} />
						<Route path="/new" component={NewPost} />
						<Route path="/post/edit/:id" component={NewPost} />
						<Route path="/:category/:id" component={PostPage} />
					</div>
				)}
			</Fragment>
		</Router>
	);
};

const mapStateToProps = ({ loading }) => ({ loading });

const mapDispatchToProps = (dispatch) => ({ getCategories: bindActionCreators(listAllCategory, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(App);
