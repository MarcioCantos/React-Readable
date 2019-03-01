import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

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
            <NavLink to='/new' activeClassName='active'>
              New Post
            </NavLink>
          </li>
          {
            categories.map(cat => (
              <li key={cat}>
                <NavLink to={`/${cat}`}>
                  {cat}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
    )
  }
}

export default withRouter(Nav)
