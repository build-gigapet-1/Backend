
exports.up = function(knex) {
    return knex.schema.createTable('pets', pets => {
    pets.increments('petId')

    pets
        
        .integer('userId')
        .unsigned()
        .notNullable()
        .references('userId')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    pets.string('petName', 255).notNullable().unique();
    pets.integer('petScore', 2).notNullable();
    pets.string('petImgSet', 255).notNullable();

    })




  
};

exports.down = function(knex) {
   return knex.schema.dropTableIfExists('pets');
};
