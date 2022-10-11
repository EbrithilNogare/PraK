const router = require("express").Router();
const Model = require("../models/metadata.model");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const auth = require("../auth.js");

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  if (id === undefined) res.status(400).json({ message: "missing id" });

  Model.findById(id)
    .populate("author.author_person", ["name", "surname"])
    .populate("author.author_corporation", "name_main_part")
    .populate("other_authors_person.id", ["name", "surname"])
    .populate("other_authors_corporation.id", "name_main_part")
    .populate("publish.publish_place", "name_main_part")
    .populate("publish.publisher", "name_main_part")
    .populate("action_name", "name_main_part")
    .populate("source_document_name", "name")
    .populate("corporation.corporation_name", "name_main_part")
    .populate("external_source.name", "name")
    .populate("described_object_citation", "name")
    .populate("previous_name", "name")
    .populate("following_name", "name")
    .populate("archival_aids", "name")
    .populate("source_citation", "name")
    .populate(
      "multiple_placement_category.multiple_placement",
      "name_main_part"
    )
    // available of dynamic ref populate (use third param)
    .populate("topic.topic_person", ["name", "surname"])
    .populate("topic.topic_corporation", "name_main_part")
    .populate("topic.topic_place", "name_main_part")
    .populate("topic.topic_event", "name_main_part")
    .populate("topic.topic_creation", "name_main_part")
    .populate("topic.topic_keyword", "name_main_part")
    //.populate("topic.topic_family", "name_main_part")
    .populate("corporation_content_specification_person", ["name", "surname"])
    .populate("corporation_content_specification_corporation", "name_main_part")
    .populate("geographical_content_specification", "name_main_part")
    .populate("keywords", "name_main_part")
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json("something went wrong");
    });
});

router.route("/").post((req, res) => {
  // support for regexp search
  for (let key of Object.keys(req.body))
    if (
      req.body[key] &&
      typeof req.body[key] === "string" &&
      req.body[key].length > 1 &&
      req.body[key][0] == "/" &&
      req.body[key].slice(-1) == "/"
    )
      req.body[key] = {
        $regex: req.body[key].substring(1, req.body[key].length - 1),
        $options: "i",
      };

  // extract special attributes
  const { _limit, ...description } = req.body;

  Model.find(description)
    .limit(_limit || 5)
    .populate("author.id", ["name", "surname"])
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ description, err });
    });
});

router.route("/").put(auth("write"), (req, res) => {
  const newModel = new Model({
    _id: mongoose.Types.ObjectId(),
    ...req.body,
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

router.route("/:id").patch(auth("write"), (req, res) => {
  const id = req.params.id;
  if (id === undefined) res.status(400).json({ message: "missing id" });

  Model.findByIdAndUpdate(id, req.body, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
        details: err,
      });
    } else {
      res.status(200).json({});
    }
  });
});

router.route("/:id").delete(auth("write"), (req, res) => {
  const id = req.params.id;
  if (id === undefined) res.status(400).json({ message: "missing id" });

  Model.findByIdAndDelete(id, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
        details: err,
      });
    } else {
      res.status(200).json({});
    }
  });
});

module.exports = router;
