const { DataTypes } = require("sequelize");
const { db } = require("_helpers/sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    total: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
      defaultValue: 0,
    },
    description: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "OPEN" },
    serviceProviderQuoteId: { type: DataTypes.INTEGER, allowNull: true },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated: { type: DataTypes.DATE },
  };

  const options = {
    // disable default timestamp fields (createdAt and updatedAt)
    timestamps: false,
    scopes: {
      // include related models
      withDetails: {
        attributes: { exclude: ["accountId", "customerId", "addressId"] },
        include: [
          { model: db.Account.scope("withRole") },
          { model: db.Customer },
          { model: db.Address },
        ],
      },
      withCustomer: {
        attributes: { exclude: ["customerId"] },
        include: [{ model: db.Customer }],
      },
    },
  };

  return sequelize.define("quote", attributes, options);
}
