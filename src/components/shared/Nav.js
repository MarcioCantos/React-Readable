import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';

class Nav extends Component {
  render() {
    const { categories } = this.props

    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' exact activeClassName='active'>
              New Post
            </NavLink>
          </li>
          {
            categories.map(c => (
              <li key={c.name}>
                <NavLink to={`/category/${c.path}`} exact>
                  {c.name}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = (store) => {
  return {categories : store.posts.categories};
}

export default connect(mapStateToProps)(Nav)
