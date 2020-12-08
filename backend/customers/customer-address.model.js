const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    customerId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  };

  const options = {
    // disable default timestamp fields (createdAt and updatedAt)
    timestamps: false,
    scopes: {
      // exclude foreign keys with this scope
      onlyName: { attributes: { exclude: ["customerId", "addressId"] } },
    },
  };

  return sequelize.define("customerAddress", attributes, options);
}
