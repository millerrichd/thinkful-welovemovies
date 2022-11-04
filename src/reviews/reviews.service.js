const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(reviewId) {
  return knex("reviews as r")
    .select("r.*")
    .where({ "r.review_id": reviewId})
    .first();
}

function destroy(reviewId) {
  return knex("reviews as r")
    .where({ "r.review_id": reviewId })
    .del();
}

const addCriticsToReview = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
})

async function update(newReview) {
  const reviewUpdate = await knex("reviews as r")
    .select("r.*")
    .where({ "r.review_id": newReview.review_id })
    .update(newReview, "*");
  //this is because of SQLite in the testing engine needs a separate read call
  const review = await knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.review_id": newReview.review_id})
    .first()
    .then(addCriticsToReview)
  return review;
}

module.exports = {
  read,
  update,
  delete: destroy,
}