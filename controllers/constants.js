const db = require("../config/database");
const Joi = require("joi");

// Schema for validation
const constantSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  value: Joi.number().required(),
});

// Get all constants
const getAllConstants = (req, res) => {
  const query = "SELECT * FROM constants";

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching constants: " + err.message });
    }
    res.status(200).json(results);
  });
};

// Create constant
const createConstant = async (req, res) => {
  const { name, value } = req.body;

  const { error } = constantSchema.validate({ name, value });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const query = "INSERT INTO constants (name, value) VALUES (?, ?)";
  db.query(query, [name, value], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error creating constant: " + err.message });
    }
    res.status(201).json({ id: results.insertId, name, value });
  });
};

// Delete constant
const deleteConstant = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Constant ID is required." });
  }

  const query = "DELETE FROM constants WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting constant: " + err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Constant not found." });
    }
    res.status(204).send();
  });
};

// Edit constant
const editConstant = async (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;

  const { error } = constantSchema.validate({ name, value });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const query = "UPDATE constants SET name = ?, value = ? WHERE id = ?";
  db.query(query, [name, value, id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating constant: " + err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Constant not found." });
    }
    res.status(200).json({ id, name, value });
  });
};

module.exports = {
  createConstant,
  deleteConstant,
  editConstant,
  getAllConstants,
};
