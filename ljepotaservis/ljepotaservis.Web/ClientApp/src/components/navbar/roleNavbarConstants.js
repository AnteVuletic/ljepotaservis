const roleNavbarConstants = {
  SuperAdmin: {
    homePath: "/super-admin",
    items: [
      { text: "Dashboard", path: "/super-admin" },
      { text: "Stores", path: "/super-admin/stores" }
    ]
  },
  Owner: {
    homePath: "/owner",
    items: [
      { text: "Dashboard", path: "/owner" },
      { text: "Employees", path: "/owner/employees" }
    ]
  },
  Employee: {
    homePath: "/employee",
    items: [
      { text: "Dashboard", path: "/employee" },
      { text: "Reservations", path: "/employee/reservations" }
    ]
  },
  User: {
    homePath: "/",
    items: [
      { text: "Home", path: "/" },
      { text: "Profile (not implemented)", path: "/user/profile" }
    ]
  },
  Guest: {
    homePath: "/",
    items: [{ text: "Home", path: "/" }]
  }
};

export default roleNavbarConstants;
