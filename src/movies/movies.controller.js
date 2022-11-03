const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovie = await service.read(movieId);
  if(foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  next({status: 404, message: "Movie not found."});  
}

async function movieTheaterExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovies = await service.readTheater(movieId);
  if(foundMovies.length) {
    res.locals.movies = foundMovies;
    return next();
  }
  next({status: 404, message: "Movie not found."});  
}

async function movieReviewExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovies = await service.readReview(movieId);
  console.log(foundMovies)
  if(foundMovies.length) {
    res.locals.movies = foundMovies;
    return next();
  }
  next({status: 404, message: "Movie not found."});  
}

async function list(req, res, next) {
  const data = await service.list(req.query.is_showing);
  res.status(201).json({data});
}

async function read(req, res, next) {
  const data = res.locals.movie;
  res.json({data});
}

async function readMovies(req, res, next) {
  const data = res.locals.movies;
  res.json({data});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  readTheater: [asyncErrorBoundary(movieTheaterExists), readMovies],
  readReview: [asyncErrorBoundary(movieReviewExists), readMovies],
}