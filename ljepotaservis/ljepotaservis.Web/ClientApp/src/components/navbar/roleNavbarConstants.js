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
      { text: "Usluge", path: "/owner" },
      { text: "Zaposlenici", path: "/owner/employees" },
      { text: "Portfolio", path: "/owner/portfolios" }
    ]
  },
  Employee: {
    homePath: "/employee",
    items: [{ text: "Rezervacije", path: "/employee" }]
  },
  User: {
    homePath: "/",
    items: [
      { text: "Naslovnica", path: "/" },
      { text: "Profile (not implemented)", path: "/user/profile" },
      { text: "Moje rezervacije", path: "/reservations" }
    ]
  },
  Guest: {
    homePath: "/",
    items: [{ text: "Naslovnica", path: "/" }]
  }
};

export default roleNavbarConstants;
