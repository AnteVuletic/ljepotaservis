const roleNavbarConstants = {
  SuperAdmin: {
    homePath: "/super-admin",
    items: [
      { text: "Naslovnica", path: "/super-admin" },
      { text: "Dodaj salon", path: "/super-admin/add-store" }
    ]
  },
  Owner: {
    homePath: "/owner",
    items: [
      { text: "Naslovnica", path: "/owner" },
      { text: "Dodaj uslugu", path: "/owner/add-service" },
      { text: "Dodaj zaposlenika", path: "/owner/add-employee" }
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
