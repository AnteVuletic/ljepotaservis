import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";

export default function NavbarComponent() {
  return (
    <Navbar collapseOnSelect fixedTop={true} fluid={true}>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to="/">
            <a>Ljepota servis logo</a>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <IndexLinkContainer to="/">
            <NavItem eventKey={1}>Home</NavItem>
          </IndexLinkContainer>
        </Nav>
        <Nav pullRight>
          <LinkContainer to="/register">
            <NavItem eventKey={1}>Registration</NavItem>
          </LinkContainer>
          <LinkContainer to="/login">
            <NavItem eventKey={2}>Log in</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
