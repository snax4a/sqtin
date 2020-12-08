const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const Role = require("_helpers/role");
const customerService = require("./customer.service");

// routes
router.get("/", authorize([Role.Manager, Role.ServiceProvider]), getAll);
router.get("/:id", authorize([Role.Manager, Role.ServiceProvider]), getById);
router.post("/", authorize(Role.Manager), createSchema, create);
router.put("/:id", authorize(Role.Manager), updateSchema, update);
router.delete("/:id", authorize(Role.Manager), _delete);
router.get(
  "/:id/details",
  authorize([Role.Manager, Role.ServiceProvider]),
  getDetails
);
router.post(
  "/:id/address",
  authorize(Role.Manager),
  createAddressSchema,
  createAddress
);

module.exports = router;

function getAll(req, res, next) {
  customerService
    .getAll()
    .then((customers) => res.json(customers))
    .catch(next);
}

function getById(req, res, next) {
  customerService
    .getById(req.params.id)
    .then((customer) => (customer ? res.json(customer) : res.sendStatus(404)))
    .catch(next);
}

function getDetails(req, res, next) {
  customerService
    .getWithAddresses(req.params.id)
    .then((customer) => (customer ? res.json(customer) : res.sendStatus(404)))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  customerService
    .create(req.body)
    .then((customer) => res.json(customer))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(""),
    email: Joi.string().email().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  customerService
    .update(req.params.id, req.body)
    .then((customer) => res.json(customer))
    .catch(next);
}

function _delete(req, res, next) {
  customerService
    ._delete(req.params.id)
    .then(() => res.json({ message: "Customer deleted successfully" }))
    .catch(next);
}

function createAddressSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function createAddress(req, res, next) {
  customerService
    .createAddress(req.params.id, req.body)
    .then((address) => res.json(address))
    .catch(next);
}
