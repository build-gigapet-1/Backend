const router = require("express").Router();
const restrictAuth = require("../restrictAuthMiddleware")
const db = require("../database/dbConfig")
const Pets = require("./pets-model")

router.get('/', restrictAuth, (req, res) => {

  Pets.findAllPets(req.decodedJwt.userId)
  .then(pets => {
      res.status(200).json(pets)
    
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'failed'})  
  })

})

router.get('/:petId', restrictAuth, (req,res) => {

  const payload = {
    petId: 0,
    petName: '',
    petScore: '',
    petImgSet: '',
    meals: []
  }
  Pets.findPetById(req.params.petId)
  .then(pet => {
    //console.log(pet);
    payload.petId = pet.petId
    payload.petName = pet.petName
    payload.petScore = pet.petScore
    payload.petImgSet = pet.petImgSet
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ Error: "can't get pet"})
  })

  Pets.findPetMealById(req.params.petId)
  .then(meal => {
    payload.meals = meal
    res.status(200).json(payload)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "can't get meal "})
  })
})

router.get('/:petId/meals/:mealId', restrictAuth, (req,res) => {

  Pets.findPetMealById(req.params.mealId).first()
  .then(meal => {

    res.status(200).json(meal)

  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ Error: "can't get meal"})
  })
})

router.post('/', restrictAuth, (req, res) => {
  payload = {
      ...req.body,
      userId: req.decodedJwt.userId
      
  }

  Pets.addPet(payload)
  .then(pet => {
      res.status(201).json(pet)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({message: 'fail'})
  })
})

router.post('/:petId/meals', restrictAuth, (req, res) => {
  const payload = {
      ...req.body,
      petId: req.params.petId
  }

  Pets.addMeal(payload)
  .then(meal => {
      res.status(201).json(meal)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({message: 'fail'})
  })
})

router.put('/:petId/', restrictAuth, (req, res) => {
  const body = req.body
  const petId = req.params.petId
Pets.updatePet(body, petId)
  .then(meal => {
      res.status(200).json(meal)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({message: 'fail'})
  })
})

router.put('/:petId/meals/:mealId', restrictAuth, (req, res) => {
  const body = req.body
  const mealId = req.params.mealId
Pets.updateMeal(body, mealId)
  .then(meal => {
      res.status(200).json(meal)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({message: 'fail'})
  })
})

router.delete("/:petId", restrictAuth, (req,res) => {
  const petId = req.params.petId
    Pets.deletePet(petId)
      .then(deleted => res.status(200).json(deleted))
      .catch(err => {
          console.log(err)
          res.status(500).json({ error: "can't delete user" })
      })
})


router.delete("/:petId/meals/:mealId", restrictAuth, (req,res) => {
  const mealId = req.params.mealId
  Pets.deleteMeal(mealId)
  .then(deleted => res.status(200).json(deleted))
  .catch(err => {
      console.log(err)
      res.status(500).json({ error: "can't delete user" })
  })
})

module.exports = router;