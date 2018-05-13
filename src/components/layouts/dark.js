import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Helmet from 'react-helmet';


const Layout = (props) => (
  <div className="App">
    <Helmet>
      <meta charSet="utf-8" />
      <title>idle systems</title>
    </Helmet>

    <Navbar className="navbar-dark bg-dark mb-4">
      <NavbarBrand href="/">idleSYSTEMS</NavbarBrand>
      <Nav>
        <NavItem>
          <NavLink href="https://github.com/jeremygiberson/idlesystems">GitHub</NavLink>
        </NavItem>
      </Nav>
    </Navbar>

    <div className="container">
      <div className="col-sm-6 offset-sm-3">
        {props.children}
      </div>
    </div>
  </div>
);

export default Layout;



