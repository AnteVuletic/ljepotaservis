// fetch

export const getAllStores = () =>
  new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Linea",
          score: 4,
          address: "Tavelićeva 7",
          workingHours: "08-20"
        },
        {
          id: 2,
          name: "Frizure",
          score: 4.5,
          address: "Tavelićeva 22",
          workingHours: "08-21"
        },
        {
          id: 3,
          name: "Modern",
          score: 4,
          address: "Tavelićeva 7",
          workingHours: "08-24"
        },
        {
          id: 4,
          name: "Brada",
          score: 4,
          address: "Tavelićeva 7",
          workingHours: "08-24"
        }
      ]);
    }, 1000);
  });
