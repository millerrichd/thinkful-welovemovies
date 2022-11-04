const router = require("express").Router({mergeParams: true});
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

var corsOptions = {
  origin: 'https://thinkful-welovemovies-frontend.vercel.app',
  optionsSuccessStatus: 200
}

//router.use(cors(corsOptions));

router.route("/:reviewId")
  .options(cors(corsOptions))
  .put(cors(corsOptions), controller.update)
  .delete(cors(corsOptions), controller.delete)
  .all(methodNotAllowed);

  module.exports = router;