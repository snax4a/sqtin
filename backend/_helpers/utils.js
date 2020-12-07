const db = require("./db");

module.exports = {
  getRoleByName,
};

async function getRoleByName(name) {
  return await db.Role.findOne({
    where: {
      name,
    },
  });
}
