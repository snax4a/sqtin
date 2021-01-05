const { db } = require("_helpers/sequelize");

exports.getAll = async () => {
  return await db.CustomerAddress.findAll({ include: [db.Customer, db.Address] });
};

exports.getById = async (customerId, addressId) => {
  return await getCustomerAddress(customerId, addressId);
};

exports.getDetails = async (customerId, addressId) => {
  return await db.CustomerAddress.findOne({
    where: { customerId, addressId },
    include: [db.Customer, db.Address],
  });
};

exports.getAllAddresses = async () => {
  return await db.Address.findAll();
};

exports.create = async (params) => {
  const { customerId, name, ...addressParams } = params;

  // validate
  if (!(await getCustomer(customerId))) {
    throw `Customer not found`;
  }

  const address = await db.Address.findOrCreate({
    where: { ...addressParams },
  });

  if (await getCustomerAddress(customerId, address[0].id)) {
    throw `The customer has already been assigned this address.`;
  }

  if (await getByCustomerAndName(customerId, name)) {
    throw `Customer address with this name already exists.`;
  }

  const customerAddress = new db.CustomerAddress({
    customerId,
    addressId: address[0].id,
    name,
  });

  // save customerAddress
  await customerAddress.save();

  return { name: customerAddress.name, address: { ...address[0].dataValues } };
};

exports.update = async (customerId, addressId, params) => {
  const { name, ...addressParams } = params;
  const customerAddress = await getCustomerAddress(customerId, addressId);

  // validate
  if (!customerAddress) {
    throw `Customer address not found`;
  }

  // check if name was updated
  if (name !== customerAddress.name) {
    // check if name is used
    if (await getByCustomerAndName(customerId, name)) {
      throw `Customer address with this name already exists.`;
    }
  }

  const address = await db.Address.findOrCreate({
    where: { ...addressParams },
  });

  if (addressId !== address[0].id) {
    // if address was updated we have to remove old record
    // and insert new one as sequelize does not let us update primary keys
    await customerAddress.destroy();
    const newCustomerAddress = new db.CustomerAddress({
      customerId,
      addressId: address[0].id,
      name,
    });
    await newCustomerAddress.save();
  } else {
    customerAddress.name = name;
    await customerAddress.save();
  }

  return { name, address: { ...address[0].dataValues } };
};

exports._delete = async (customerId, addressId) => {
  const customerAddress = await getCustomerAddress(customerId, addressId);
  await customerAddress.destroy();
};

// helper functions

const getCustomer = async (id) => {
  const customer = await db.Customer.findByPk(id);
  if (!customer) throw "Customer not found";
  return customer;
};

const getCustomerAddress = async (customerId, addressId) => {
  return await db.CustomerAddress.findOne({
    where: { customerId, addressId },
  });
};

const getByCustomerAndName = async (customerId, name) => {
  return await db.CustomerAddress.findOne({
    where: { customerId, name },
  });
};
