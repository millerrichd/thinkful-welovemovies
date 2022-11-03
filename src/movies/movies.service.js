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

module.exports = {
  list,
}