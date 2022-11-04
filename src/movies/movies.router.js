const router = require("express").Router({mergeParams: true});
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

var corsOptions = {
  origin: 'https://thinkful-welovemovies-frontend.vercel.app',
  optionsSuccessStatus: 200
}

//router.use(cors(corsOptions));

router.route("/")
  .options(cors(corsOptions))
  .get(cors(corsOptions), controller.list)
  .all(methodNotAllowed);

router.route("/:movieId")
  .options(cors(corsOptions))
  .get(cors(corsOptions), controller.read)
  .all(methodNotAllowed);

router.route("/:movieId/theaters")
  .get(controller.readTheater)
  .all(methodNotAllowed);

router.route("/:movieId/reviews")
  .options(cors(corsOptions))
  .get(cors(corsOptions), controller.readReview)
  .all(methodNotAllowed);

module.exports = router;