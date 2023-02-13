var express = require("express");
var router = express.Router();


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get('/test', (req, res) => {
  res.send('Hello World!')
})

module.exports = router;

/**
 *
 * tables
 * -drivers/user
 * -individuals
 * -attendance
 * 
 * actions
 * -add individuals
 * -add driver/user
 * -print weedly report
 *
 */
