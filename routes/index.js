const router = require("express").Router();
const customerRouter = require("./customers");

router.get("/", (req, res) => {
  res.render("home");
});

router.use("/customers", customerRouter);

module.exports = router;
