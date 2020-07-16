const { Router } = require("express");

const router = Router();

/* GET home page. */
router.get("/todos", function (req, res, next) {
  res.send("asdf");
});

module.exports = router;
