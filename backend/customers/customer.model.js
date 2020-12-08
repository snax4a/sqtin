const { DataTypes } = require("sequelize");
const { db } = require("_helpers/sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
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
      // include customer addresses
      withAddresses: {
        include: [
          {
            model: db.CustomerAddress.scope("onlyName"),
            include: [
              {
                model: db.Address,
              },
            ],
          },
        ],
      },
    },
  };

  return sequelize.define("customer", attributes, options);
}
