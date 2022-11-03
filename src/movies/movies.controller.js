const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function list(req, res, next) {
  const data = await service.list(req.query.is_showing);
  res.status(201).json({data});
}

module.exports = {
  list: [asyncErrorBoundary(list)]
}