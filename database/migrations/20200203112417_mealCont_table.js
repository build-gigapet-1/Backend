
exports.up = function(knex) {
    return knex.schema.createTable('mealContents', mealContents => {
        mealContents.increments('mCId')

    mealContents
        .integer('mealId')
        .unsigned()
        .notNullable()
        .references('mealId')
        .inTable('meals')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    mealContents.datetime('date').defaultTo(knex.fn.now());
    mealContents.integer('fruitsVeg', 3);
    mealContents.integer('protein', 3);
    mealContents.integer('grains', 3);
    mealContents.integer('sweets', 3);
    mealContents.integer('mealScore', 10);

    })




  
};

exports.down = function(knex) {
   return knex.schema.dropTableIfExists('mealContents');
};
