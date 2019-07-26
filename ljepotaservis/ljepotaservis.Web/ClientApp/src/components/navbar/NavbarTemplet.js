import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";

export default function NavbarTemplet(props) {
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
            <LinkContainer to="/authentication/register">
              <NavItem eventKey={1}>Registration</NavItem>
            </LinkContainer>
            <LinkContainer to="/authentication/login">
              <NavItem eventKey={2}>Log in</NavItem>
            </LinkContainer>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
