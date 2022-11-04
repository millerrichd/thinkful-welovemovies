const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const foundReview = await service.read(reviewId);
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  }
  next({status: 404, message: `Review cannot be found.`})
}

async function update(req, res, next) {
  const { score, content } = req.body.data;
  const newUpdate = {
    ...res.locals.review,
    score,
    content
  }
  const data = await service.update(newUpdate);
  res.json({data});
}

async function destroy(req, res, next) {
  const { reviewId } = req.params;
  const data = await service.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}