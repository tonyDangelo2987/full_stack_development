require("../models/user");

const express = require("express"); // Express app
const router = express.Router(); // Router logic
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "payload",
});
const authController = require("../controllers/authentication");

// This is where we import the controllers we will route
const tripsController = require("../controllers/trips");

// Define route for our trips endpoint
router
  .route("/trips")
  .get(tripsController.tripsList) // GET Method routes tripList
  .post(auth, tripsController.tripsAddTrip); // POST Method adds a trip

// GET method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(auth, tripsController.tripsUpdateTrip);

router.route("/login").post(authController.login);

router.route("/register").post(authController.register);

module.exports = router;
