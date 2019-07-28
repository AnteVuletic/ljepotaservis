import React from "react";
import roleNavbarConstants from "./roleNavbarConstants";
import NavbarTemplet from "./NavbarTemplet";

const RoleNavbar = props => {
  const { role } = props;
  return <NavbarTemplet navigation={roleNavbarConstants[role]} role={role} />;
};

export default RoleNavbar;
