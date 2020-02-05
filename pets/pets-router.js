const router = require("express").Router();
const restrictAuth = require("../restrictAuthMiddleware")
const { signToken } = require('../token/token')
const jwt = require('jsonwebtoken')
const db = require("../database/dbConfig")

router.get('/', restrictAuth, (req, res) => {

  db('pets').orderBy('petId')
  .then(pets => {
      res.status(201).json(pets)
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
db("pets").where("petId", req.params.petId)
.first()
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

db("meals")
  .join("pets", "meals.petId", "pets.petId")
  .where("meals.petId", req.params.petId)
  .select("meals.*")
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

  const payload = {
    mealId: 0,
    mealType: '',
    fruitVeg: '',
    protein: '',
    grains: '',
    sweets: '',
    mealScore: ''
  }
db("meals").where("mealId", req.params.mealId)
.first()
  .then(meal => {
    //console.log(meal);
    payload.mealId = meal.mealId
    payload.mealType = meal.mealType
    payload.fruitVeg = meal.fruitVeg
    payload.protein = meal.protein
    payload.grains = meal.grains
    payload.sweets = meal.sweets
    payload.mealScore = meal.mealScore

    res.status(200).json(payload)

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
  db('pets').insert(payload)
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
      petId: req.params.petId,
     
     
  }
  db('meals').insert(payload)
  .then(pet => {
      res.status(201).json(pet)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({message: 'fail'})
  })
})
router.put('/:petId/meals/:mealId', restrictAuth, (req, res) => {
    
  db('meals').update(req.body).where('mealId', req.params.mealId)
  .then(post => {
      res.status(201).json(post)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({message: 'fail'})
  })
})

router.delete("/:petId", restrictAuth, (req,res) => {
  db('pets').where('petId', req.params.petId).del()
      .then(deleted => res.status(200).json(deleted))
      .catch(err => {
          console.log(err)
          res.status(500).json({ error: "can't delete user" })
      })
})


router.delete("/:petId/meals/:mealId", restrictAuth, (req,res) => {
  db("meals").where("mealId", req.params.mealId).del()
  .then(deleted => res.status(200).json(deleted))
  .catch(err => {
      console.log(err)
      res.status(500).json({ error: "can't delete user" })
  })
})

module.exports = router;