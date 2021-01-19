const config = require("config");
const { custom } = require("joi");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const Role = require("./role");

const { host, port, user, password, database } = config.database;

let db = {};
const sequelize = new Sequelize(database, user, password, {
  dialect: "mysql",
});

initialize();

module.exports = { db, sequelize };

async function initialize() {
  // create db if it doesn't already exist
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // init models and add them to the exported db object
  db.Role = require("accounts/role.model")(sequelize);
  db.Account = require("accounts/account.model")(sequelize);
  db.RefreshToken = require("accounts/refresh-token.model")(sequelize);
  db.Address = require("customers/address.model")(sequelize);
  db.CustomerAddress = require("customer-addresses/customer-address.model")(sequelize);
  db.Customer = require("customers/customer.model")(sequelize);
  db.Quote = require("quotes/quote.model")(sequelize);

  // account relations
  db.Role.hasMany(db.Account);
  db.Account.belongsTo(db.Role);
  db.Account.hasMany(db.RefreshToken, { onDelete: "CASCADE" });
  db.RefreshToken.belongsTo(db.Account);

  // customer relations
  db.Customer.hasMany(db.CustomerAddress);
  db.CustomerAddress.belongsTo(db.Customer);
  db.CustomerAddress.belongsTo(db.Address);
  db.Address.hasMany(db.CustomerAddress);

  // quote relations
  db.Account.hasMany(db.Quote);
  db.Quote.belongsTo(db.Account);
  db.Customer.hasMany(db.Quote);
  db.Quote.belongsTo(db.Customer);
  db.Address.hasMany(db.Quote);
  db.Quote.belongsTo(db.Address);

  // sync all models with database and insert test data
  // we should not use force: true on production
  // im using it here only for demonstration purposes
  await sequelize
    .sync({ force: true })
    .then(() => db.Role.findAll())
    .then((roles) => {
      if (!roles || roles.length == 0) {
        const roles = [];
        for (const property in Role) {
          roles.push({ name: Role[property] });
        }
        return db.Role.bulkCreate(roles);
      }
    })
    .then((roles) => {
      return db.Account.findAll();
    })
    .then((accounts) => {
      if (!accounts || accounts.length == 0) {
        // hashed password "test123"
        const passwordHash = "$2a$10$DJUV8FTxZk57aKRh33/7qOSE8XX/GqWRsfgyqCd9cjGgkjFNdlXCa";
        return db.Account.bulkCreate([
          {
            email: "manager@test.com",
            passwordHash,
            firstName: "Szymon",
            lastName: "Sus",
            roleId: 2,
          },
          {
            email: "service-provider@test.com",
            passwordHash,
            firstName: "John",
            lastName: "Doe",
            roleId: 3,
          },
          {
            email: "user@test.com",
            passwordHash,
            firstName: "Zwykły",
            lastName: "User",
            roleId: 1,
          },
        ]);
      } else {
        return accounts;
      }
    })
    .then((accounts) => {
      return db.Address.findAll();
    })
    .then((addresses) => {
      if (!addresses || addresses.length == 0) {
        return db.Address.bulkCreate([
          {
            street: "al. Jerozolimskie 54",
            city: "Warszawa",
            zipCode: "00-024",
            state: "Mazowieckie",
          },
          {
            street: "al. Jerozolimskie 142",
            city: "Warszawa",
            zipCode: "02-305",
            state: "Mazowieckie",
          },
          {
            street: "Świętokrzyska 3",
            city: "Warszawa",
            zipCode: "00-360",
            state: "Mazowieckie",
          },
          {
            street: "Marszałkowska 179",
            city: "Warszawa",
            zipCode: "02-222",
            state: "Mazowieckie",
          },
          {
            street: "Złota 59",
            city: "Warszawa",
            zipCode: "00-120",
            state: "Mazowieckie",
          },
          {
            street: "Górczewska 124",
            city: "Warszawa",
            zipCode: "01-124",
            state: "Mazowieckie",
          },
        ]);
      } else {
        return addresses;
      }
    })
    .then((addresses) => {
      return db.Customer.findAll();
    })
    .then((customers) => {
      if (!customers || customers.length == 0) {
        return db.Customer.bulkCreate([
          {
            name: "McDonald’s",
            email: "contact@mcdonalds.com",
          },
          {
            name: "Subway",
            email: "contact@subway.com",
          },
          {
            name: "Multikino",
            email: "kontakt@multikino.pl",
          },
          {
            name: "Helios",
            email: "kontakt@helios.pl",
          },
        ]);
      } else {
        return customers;
      }
    })
    .then((customers) => {
      return db.CustomerAddress.findAll();
    })
    .then((customerAddresses) => {
      if (!customerAddresses || customerAddresses.length == 0) {
        return db.CustomerAddress.bulkCreate([
          {
            name: "Dworzec centralny",
            customerId: 1,
            addressId: 1,
          },
          {
            name: "Dworzec zachodni",
            customerId: 1,
            addressId: 2,
          },
          {
            name: "Świętokrzyska liceum",
            customerId: 1,
            addressId: 3,
          },
          {
            name: "Blue City",
            customerId: 4,
            addressId: 4,
          },
          {
            name: "Złote Tarasy",
            customerId: 3,
            addressId: 5,
          },
          {
            name: "Wola park",
            customerId: 3,
            addressId: 6,
          },
        ]);
      } else {
        return customerAddresses;
      }
    })
    .then((customerAddresses) => {
      return db.Quote.findAll();
    })
    .then((quotes) => {
      if (!quotes || quotes.length == 0) {
        return db.Quote.bulkCreate([
          {
            total: 245.99,
            description: "Front doors replacement, lightning repair.",
            status: "APPROVED",
            accountId: 2,
            customerId: 1,
            addressId: 1,
          },
          {
            total: 1120.0,
            description: "Toilet repair, sinks replacement.",
            status: "OPEN",
            accountId: 2,
            customerId: 1,
            addressId: 3,
          },
          {
            total: 95.55,
            description: "Replacement of 2 fire extinguishers.",
            status: "SENT TO CUSTOMER",
            accountId: 1,
            customerId: 4,
            addressId: 4,
          },
          {
            total: 199.99,
            description: "Repair of cash registers",
            status: "SENT TO CUSTOMER",
            accountId: 1,
            customerId: 3,
            addressId: 5,
          },
          {
            total: 95.0,
            description: "2 Fire extenguishers replacement",
            status: "REJECTED",
            accountId: 1,
            customerId: 3,
            addressId: 6,
          },
          {
            total: 45.0,
            description: "Fire extenguisher replacement",
            status: "APPROVED",
            accountId: 1,
            customerId: 3,
            addressId: 5,
          },
        ]);
      }
    });
}
