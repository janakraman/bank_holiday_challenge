const router = require("express").Router();
const customerRouter = require("./customers");

router.get("/", (req, res) => {
  res.send("Home!");
});

router.use("/customers", customerRouter);

module.exports = router;
