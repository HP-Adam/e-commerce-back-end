const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Product }],
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "No tag with this id found" });
        return;
      }
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "No tag with this id found" });
        return;
      }
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "No category with this id found" });
        return;
      }
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
