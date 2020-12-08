const { db, sequelize } = require("_helpers/sequelize");

exports.getAll = async () => {
  return await db.Quote.findAll();
};

exports.getById = async (id) => {
  return await getQuote(id);
};

exports.getWithDetails = async (id) => {
  const quote = await db.Quote.scope("withDetails").findByPk(id);
  if (!quote) throw "Quote not found";
  return quote.get();
};

exports.create = async (params) => {
  const quote = new db.Quote(params);
  await quote.save();
  return quote.get();
};

exports.update = async (id, params) => {
  const quote = await getQuote(id);

  // TODO VALIDATE if customer / address was changed
  // validate (if name was changed)
  if (params.name && customer.name !== params.name && (await getCustomerByName(params.name))) {
    throw `Customer ${params.name} already exists`;
  }

  // copy params to quote and save
  Object.assign(quote, params);
  quote.updated = Date.now();

  await quote.save();

  return quote.get();
};

exports._delete = async (id) => {
  const quote = await getQuote(id);
  await quote.destroy();
};

// helper functions

const getQuote = async (id) => {
  const quote = await db.Quote.findByPk(id);
  if (!quote) throw "Quote not found";
  return quote;
};