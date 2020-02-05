exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments('userId')
      users.string('username', 255).notNullable().unique();
      users.string('password', 255).notNullable();
      users.string('phone', 10).notNullable().unique();
    })
    .createTable('pets', pets => {
        pets.increments('petId');
    
        pets
            
            .integer('userId')
            .unsigned()
            .notNullable()
            .references('userId')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    
        pets.string('petName', 255).notNullable();
        pets.integer('petScore', 2).notNullable();
        pets.string('petImgSet', 255).notNullable();
    
        })
        .createTable('meals', meals => {
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
            meals.datetime('date').defaultTo(knex.fn.now());
            meals.integer('fruitsVeg', 3);
            meals.integer('protein', 3);
            meals.integer('grains', 3);
            meals.integer('sweets', 3);
            meals.integer('mealScore', 10);
            })

  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('meals')
    .dropTableIfExists('pets')
    .dropTableIfExists('users')

  };