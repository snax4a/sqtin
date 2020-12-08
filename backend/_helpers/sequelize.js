const config = require("config");
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
  db.CustomerAddress = require("customers/customer-address.model")(sequelize);
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

  // sync all models with database
  await sequelize.sync();

  // insert roles into table
  for (const property in Role) {
    await db.Role.findOrCreate({ where: { name: Role[property] } });
  }
}
