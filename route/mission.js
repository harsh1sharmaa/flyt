const express = require("express");
const {
  createMission,
  updateMission,
  deleteMission,
  createDrone,
} = require("../controllers/missionController");
const router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

// define the home page route
router
  .post("/mission", createMission)
  .put("/mission/:missionId", updateMission)
  .delete("/mission/:missionId", deleteMission)
  .post("/mission/drone", createDrone);
// router.post("/marklogin",markLogin);

module.exports = router;
