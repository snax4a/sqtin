const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const Role = require("_helpers/role");
const customerAddressService = require("./customer-address.service");

// routes
router.get("/address-list", authorize([Role.Manager, Role.ServiceProvider]), getAddressList);
router.get("/", authorize([Role.Manager, Role.ServiceProvider]), getAll);
router.get(
  "/customer/:customerId/address/:addressId",
  authorize([Role.Manager, Role.ServiceProvider]),
  getById
);
router.get(
  "/customer/:customerId/address/:addressId/details",
  authorize([Role.Manager, Role.ServiceProvider]),
  getDetails
);
router.post("/", authorize(Role.Manager), createSchema, create);
router.put(
  "/customer/:customerId/address/:addressId",
  authorize(Role.Manager),
  updateSchema,
  update
);
router.delete("/customer/:customerId/address/:addressId", authorize(Role.Manager), _delete);

module.exports = router;

function getAll(req, res, next) {
  customerAddressService
    .getAll()
    .then((customerAddresses) => res.json(customerAddresses))
    .catch(next);
}

function getById(req, res, next) {
  const { customerId, addressId } = req.params;
  customerAddressService
    .getById(customerId, addressId)
    .then((customerAddress) => (customerAddress ? res.json(customerAddress) : res.sendStatus(404)))
    .catch(next);
}

function getDetails(req, res, next) {
  const { customerId, addressId } = req.params;
  customerAddressService
    .getDetails(customerId, addressId)
    .then((customerAddress) => (customerAddress ? res.json(customerAddress) : res.sendStatus(404)))
    .catch(next);
}

function getAddressList(req, res, next) {
  customerAddressService
    .getAllAddresses()
    .then((addresses) => res.json(addresses))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    customerId: Joi.number().integer().required(),
    name: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  customerAddressService
    .create(req.body)
    .then((customerAddress) => res.json(customerAddress))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  const { customerId, addressId } = req.params;
  customerAddressService
    .update(customerId, addressId, req.body)
    .then((customerAddress) => res.json(customerAddress))
    .catch(next);
}

function _delete(req, res, next) {
  const { customerId, addressId } = req.params;
  customerAddressService
    ._delete(customerId, addressId)
    .then(() => res.json({ message: "Customer address deleted successfully" }))
    .catch(next);
}
