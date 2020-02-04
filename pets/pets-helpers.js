

module.exports = {
    addPet,
    getAllPets
    };
    const Pets = require("./pets-model.js");
    const Users = require("../users/users-model.js");

    function addPet(req, res, next) {
        const newPet = {
          userId: req.body.userId,
          petId: req.body.petId,
          petName: req.body.petName || null,
          petScore: req.body.petScore || null,
          petImgSet: req.body.petImgSet || null
          }

          Pets.add(newPet)
          .then(pet => {
            req.newPet = pet;
            next();
          })
          .catch(err => {
            console.log("error from addPet middleware", err);
            res.status(500).json({
              message: `Error adding the pet to database.`,
              error: err.toString()
            })
          });
      } 

      function getAllPets(req, res, next) {

        Pets.find()
          .then(Pets => {
            let petList = Pets.map(pet => {
              return {
                petId: pet.petId,
                userId: pet.userId,
                petName: pet.petName,
                petScore: pet.petScore,
                petImgSet: pet.petImgSet,

              }
            }
              )
            res.json(petList);
          })
          .catch(err => {
            res.status(500).json({
              message: `Error getting Pets from the database.`,
              error: err.toString()
            })
          });
      }