exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments('userId');
  
      users.string('username', 255).notNullable().unique();
      users.string('password', 255).notNullable();
      users.string('phone', 10).notNullable().unique();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };