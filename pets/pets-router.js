const router = require("express").Router();

const Events = require("./pets-model.js")
const Users = require("../users/users-model.js")

const restrictAuth = require('../restrictAuthMiddleware'); // requires valid token
const { addPet, getAllPets } = require("./pets-helpers.js")

router.post("/", addPet, restrictAuth, (req, res) => {

    const newPet = req.newPet;
    res.status(201).json({
         petName: newPet.petName,
         petScore: newPet.petScore,
         petSetImg: newPet.petSetImg

        });
    });

    router.get('/', 
  getAllPets,
  // filterEventsByQuery // TODO: add query string middleware
  (req, res) => {
    const eventList = req.eventList;
    res.status(200).json(eventList);
});

router.get('/:petId',
  (req, res) => {
    const { petId } = req.params;
    Pets.findById(petId)
    .then(pet => {
      if (!pet) {
        res.status(404).json({ message: "pet with requested id is not found in database" });
      }
      res.status(200).json(pet);
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting pet from the database by id.`,
        error: err.toString()
      })
    });
});