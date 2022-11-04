const { where } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

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

const addCriticsToReview = reduceProperties("review_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
})

function readReview(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({"r.movie_id": movieId})
    .then(addCriticsToReview)
}

module.exports = {
  list,
  read,
  readTheater,
  readReview,
}