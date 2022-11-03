const { where } = require("../db/connection");
const knex = require("../db/connection");

function list(is_showing = false) {
  if(is_showing) {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .distinct("m.movie_id")
    .where({"mt.is_showing": true});
  }
  return knex("movies as m")
    .select("*");
}

function read(movieId) {
  return knex("movies as m")
    .select("m.*")
    .where({"m.movie_id": movieId})
    .first();
}

function readTheater(movieId) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({"mt.is_showing": true})
    .where({"mt.movie_id": movieId});
}

async function readReview(movieId) {
  const reviews = await knex("reviews as r")
    .select ("r.*")
    .where({"r.movie_id": movieId});
  const critics = await knex("critics as c")
    .select ("c.*");
  reviews.forEach(review => {
    const critic = critics.find(critic => critic.critic_id === review.critic_id)
    review["critic"] = critic
  })
  return reviews;
}

module.exports = {
  list,
  read,
  readTheater,
  readReview,
}