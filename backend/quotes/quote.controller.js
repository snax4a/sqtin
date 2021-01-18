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
  // Managers can see all quotes, service providers can see only their quotes
  if (req.user.role !== Role.Manager) {
    quoteService
      .getAllByUser(req.user.id)
      .then((quotes) => res.json(quotes))
      .catch(next);
  } else {
    quoteService
      .getAll()
      .then((quotes) => res.json(quotes))
      .catch(next);
  }
}

function getById(req, res, next) {
  quoteService
    .getById(req.params.id)
    .then((quote) => {
      if (!quote) return res.sendStatus(404);
      if (quote.accountId !== req.user.id && req.user.role !== Role.Manager) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return res.json(quote);
    })
    .catch(next);
}

function getWithDetails(req, res, next) {
  quoteService
    .getWithDetails(req.params.id)
    .then((quote) => {
      if (!quote) return res.sendStatus(404);
      if (quote.account.id !== req.user.id && req.user.role !== Role.Manager) {
        return res.status(404).json({ message: "Unauthorized" });
      }
      return res.json(quote);
    })
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
    status: Joi.string(),
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
