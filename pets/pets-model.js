  
const db = require('../auth/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function add(pet) {
  return db('pets')
    .insert(pet, 'petId')
    .then(petIds => {
      const [petId] = petIds;
      return findById(petId);
    });
}

function find() {
  return db('pets as p')
    .select('p.*', 'm.mealId', 'm.mealType'
    .join('meals as m', 'm.mealId', 'm.mealType')
    .join('mealContents as mc', 'mc.mCId', 'mc.fruitsVeg', 'mc.protein', 'mc.grains',  'mc.sweets', 'mc.mealScore')
    .orderBy('p.start')
}

function findBy(filter) {
  return db('pets')
    .select('*')
    .where(filter);
}

function findById(petId) {
  return db('pets')
    .select('*')
    .where({ petId })
    .first();
}


function remove(petId){
    return db('pets')
        .where({ petId: petId })
        .del();
}