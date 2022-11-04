const router = require("express").Router({mergeParams: true});
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

var corsOptions = {
  origin: 'https://thinkful-welovemovies-frontend.vercel.app',
  optionsSuccessStatus: 200
}

//router.use(cors(corsOptions));

router.route("/")
  .get(cors(corsOptions), controller.list)
  .all(methodNotAllowed);

module.exports = router;