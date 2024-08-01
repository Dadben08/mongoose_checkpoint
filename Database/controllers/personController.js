const Person = require('../models/personModel');

// Create and Save a Record of a Model
const createPerson = (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  const newPerson = new Person({ name, age, favoriteFoods });

  newPerson.save((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
};

// Create Many Records with model.create()
const createManyPeople = (req, res) => {
  Person.create(req.body, (err, people) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(people);
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = (req, res) => {
  Person.find({ name: req.params.name }, (err, people) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(people);
  });
};

// Use model.findOne() to Return a Single Matching Document
const findOneByFavoriteFood = (req, res) => {
  Person.findOne({ favoriteFoods: req.params.food }, (err, person) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(person);
  });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(person);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) return res.status(500).json({ error: err.message });

    person.favoriteFoods.push('hamburger');
    person.save((err, updatedPerson) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(updatedPerson);
    });
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findOneAndUpdate = (req, res) => {
  Person.findOneAndUpdate(
    { name: req.params.name },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(updatedPerson);
    }
  );
};

// Delete One Document Using model.findByIdAndRemove
const findByIdAndRemove = (req, res) => {
  Person.findByIdAndRemove(req.params.id, (err, removedPerson) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(removedPerson);
  });
};

// MongoDB and Mongoose - Delete Many Documents with model.remove()
const removeManyPeople = (req, res) => {
  Person.remove({ name: req.params.name }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
};

// Chain Search Query Helpers to Narrow Search Results
const findPeopleWhoLikeBurritos = (req, res) => {
  Person.find({ favoriteFoods: 'burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(data);
    });
};

module.exports = {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOneByFavoriteFood,
  findPersonById,
  findEditThenSave,
  findOneAndUpdate,
  findByIdAndRemove,
  removeManyPeople,
  findPeopleWhoLikeBurritos,
};
