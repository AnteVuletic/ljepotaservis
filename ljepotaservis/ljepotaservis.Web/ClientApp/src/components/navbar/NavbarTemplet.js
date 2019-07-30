import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";

const NavbarTemplet = props => {
  const { role, navigation } = props;
  return (
    <Navbar collapseOnSelect fixedTop={true} fluid={true}>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to={navigation.homePath}>
            <a>Ljepota servis logo</a>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {navigation.items.map((item, index) => (
          <Nav key={index}>
            <IndexLinkContainer to={item.path}>
              <NavItem eventKey={index}>{item.text}</NavItem>
            </IndexLinkContainer>
          </Nav>
        ))}

        {role === "Guest" && (
          <Nav pullRight>
            <LinkContainer to="/authentication/registration">
              <NavItem eventKey={1}>Registracija</NavItem>
            </LinkContainer>
            <LinkContainer to="/authentication/login">
              <NavItem eventKey={2}>Prijava</NavItem>
            </LinkContainer>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarTemplet;
