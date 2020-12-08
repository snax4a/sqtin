const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const Role = require("_helpers/role");
const quoteService = require("./quote.service");

// routes
router.get("/", authorize([Role.Manager, Role.ServiceProvider]), getAll);
router.get("/:id", authorize([Role.Manager, Role.ServiceProvider]), getById);
router.get("/:id/details", authorize([Role.Manager, Role.ServiceProvider]), getWithDetails);
router.post("/", authorize([Role.Manager, Role.ServiceProvider]), createSchema, create);
router.put("/:id", authorize([Role.Manager, Role.ServiceProvider]), updateSchema, update);
router.delete("/:id", authorize([Role.Manager, Role.ServiceProvider]), _delete);

module.exports = router;

function getAll(req, res, next) {
  quoteService
    .getAll()
    .then((quotes) => res.json(quotes))
    .catch(next);
}

function getById(req, res, next) {
  quoteService
    .getById(req.params.id)
    .then((quote) => (quote ? res.json(quote) : res.sendStatus(404)))
    .catch(next);
}

function getWithDetails(req, res, next) {
  quoteService
    .getWithDetails(req.params.id)
    .then((quote) => (quote ? res.json(quote) : res.sendStatus(404)))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    total: Joi.number().positive().precision(2).required(),
    description: Joi.string().required(),
    accountId: Joi.number().integer().positive().required(),
    customerId: Joi.number().integer().positive().required(),
    addressId: Joi.number().integer().positive().required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  quoteService
    .create(req.body)
    .then((quote) => res.json(quote))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    total: Joi.number().positive().precision(2),
    description: Joi.string().empty(""),
    userId: Joi.number().integer().positive(),
    customerId: Joi.number().integer().positive(),
    addressId: Joi.number().integer().positive(),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  quoteService
    .update(req.params.id, req.body)
    .then((quote) => res.json(quote))
    .catch(next);
}

function _delete(req, res, next) {
  quoteService
    ._delete(req.params.id)
    .then(() => res.json({ message: "Quote deleted successfully" }))
    .catch(next);
}
