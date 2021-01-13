const { db, sequelize } = require("_helpers/sequelize");

exports.getAll = async () => {
  return await db.Customer.findAll();
};

exports.getById = async (id) => {
  return await getCustomer(id);
};

exports.getWithAddresses = async (id) => {
  const customer = await db.Customer.scope("withAddresses").findByPk(id);
  if (!customer) throw "Customer not found";
  return customer;
};

exports.create = async (params) => {
  // validate
  if (await getCustomerByName(params.name)) {
    throw `Customer ${params.name} already exists`;
  }

  const customer = new db.Customer(params);

  // save customer
  await customer.save();

  return customer;
};

exports.update = async (id, params) => {
  const customer = await getCustomer(id);

  // validate (if name was changed)
  if (params.name && customer.name !== params.name && (await getCustomerByName(params.name))) {
    throw `Customer ${params.name} already exists`;
  }

  // copy params to customer and save
  Object.assign(customer, params);
  customer.updated = Date.now();

  await customer.save();

  return customer;
};

exports._delete = async (id) => {
  const customer = await getCustomer(id);
  const transaction = await sequelize.transaction();

  try {
    await db.CustomerAddress.destroy({
      where: { customerId: id },
      transaction,
    });
    await customer.destroy({ transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// helper functions
const getCustomer = async (id) => {
  const customer = await db.Customer.findByPk(id);
  if (!customer) throw "Customer not found";
  return customer;
};

const getCustomerByName = async (name) => {
  return await db.Customer.findOne({ where: { name } });
};
