const roleNavbarConstants = {
  SuperAdmin: {
    homePath: "/super-admin",
    items: [
      { text: "Naslovnica", path: "/super-admin" },
      { text: "Saloni", path: "/super-admin/stores" }
    ]
  },
  Owner: {
    homePath: "/owner",
    items: [
      { text: "Naslovnica", path: "/owner" },
      { text: "Zaposlenici", path: "/owner/employees" }
    ]
  },
  Employee: {
    homePath: "/employee",
    items: [
      { text: "Naslovnica", path: "/employee" },
      { text: "Rezervacije", path: "/employee/reservations" }
    ]
  },
  User: {
    homePath: "/",
    items: [
      { text: "Naslovnica", path: "/" },
      { text: "Profile (not implemented)", path: "/user/profile" }
    ]
  },
  Guest: {
    homePath: "/",
    items: [{ text: "Naslovnica", path: "/" }]
  }
};

export default roleNavbarConstants;
