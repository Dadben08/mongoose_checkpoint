const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router.post('/person', personController.createPerson);
router.post('/people', personController.createManyPeople);
router.get('/people/name/:name', personController.findPeopleByName);
router.get('/person/food/:food', personController.findOneByFavoriteFood);
router.get('/person/id/:id', personController.findPersonById);
router.put('/person/id/:id', personController.findEditThenSave);
router.put('/person/name/:name', personController.findOneAndUpdate);
router.delete('/person/id/:id', personController.findByIdAndRemove);
router.delete('/people/name/:name', personController.removeManyPeople);
router.get('/people/burritos', personController.findPeopleWhoLikeBurritos);

module.exports = router;
