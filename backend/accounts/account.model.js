const { DataTypes } = require("sequelize");
const { db } = require("../_helpers/sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    email: { type: DataTypes.STRING(30), allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING(20), allowNull: true },
    lastName: { type: DataTypes.STRING(20), allowNull: true },
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
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["passwordHash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {}, include: [{ model: db.Role }] },
      withRole: { attributes: { exclude: ["passwordHash"] }, include: [{ model: db.Role }] },
    },
  };

  return sequelize.define("account", attributes, options);
}
