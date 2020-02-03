
exports.up = function(knex) {
    return knex.schema.createTable('meals', meals => {
    meals.increments('mealId')

    meals
        
        .integer('petId')
        .unsigned()
        .notNullable()
        .references('petId')
        .inTable('pets')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    meals.string('mealType', 255).notNullable();
    })




  
};

exports.down = function(knex) {
   return knex.schema.dropTableIfExists('meals');
};