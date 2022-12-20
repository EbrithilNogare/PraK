const router = require("express").Router();
const Model = require("../models/log.model");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

router.route("/").put((req, res) => {
  const newModel = new Model({
    _id: mongoose.Types.ObjectId(),
    timestamp: new Date().toString(),
    data: JSON.stringify(req.body).length < 1000 ? req.body : "",
  });

  newModel
    .save()
    .then((result) => {
      res.status(201).json({
        id: newModel._id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
        details: err,
      });
    });
});

module.exports = router;
