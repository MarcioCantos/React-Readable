import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import NavBootstrap from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Nav = ({categories}) => {
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        {categories &&
          <Fragment>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavBootstrap className="mr-auto">
                <NavLink to='/' className="nav-link">Home</NavLink>
                <NavDropdown title="Categories" id="basic-nav-dropdown">
                    {categories.map(c => (
                      <NavDropdown.Item key={c.name} href={`/category/${c.path}`}>
                        {c.name}
                      </NavDropdown.Item>
                      ))
                    }
                </NavDropdown>
              </NavBootstrap>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>            
          </Fragment>
        }              
      </Navbar>



    )
}

const mapStateToProps = (store) => {
  return {categories : store.posts.categories};
}

export default connect(mapStateToProps)(Nav)