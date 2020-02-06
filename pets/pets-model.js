  
const db = require("../database/dbConfig.js");


module.exports = {
findAllPets,
findPetById,
findPetMealById,
findMealById,
addPet,
addMeal,
updatePet,
updateMeal,
deletePet,
deleteMeal
};


function findAllPets(userId) {
  return db('pets').where({userId}).orderBy('petId');
}

function findPetById(petId) {
 return db("pets").where("petId", petId)
.first() 
}

function findPetMealById(petId) {
 
  return db("meals")
  .join("pets", "meals.petId", "pets.petId")
  .where("meals.petId", petId)
  .select("meals.*")
}

function findMealById(mealId) {

  return db("meals").where("mealId", mealId)
 
}

function addPet(payload) {
  return db('pets').insert(payload)
}


function addMeal(payload) {
  return db('meals').insert(payload)
}

function updatePet(body, petId) {
  
  return  db('pets').update(body)
  .where('petId', petId)
}

function updateMeal(body, mealId) {
  
  return  db('meals').update(body)
  .where('mealId', mealId)
}

function deleteMeal(mealId) {
  return db("meals").where("mealId", mealId).del()
}

function deletePet(petId) {
  return db('pets').where('petId', petId).del()
}