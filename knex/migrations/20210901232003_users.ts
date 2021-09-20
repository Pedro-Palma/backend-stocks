import { Knex } from "knex";


export  async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable('users').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('users', function(t) {
            t.increments('id').notNullable().primary();
            t.string('first_name', 50);
            t.string('last_name', 50);
            t.string('email', 50);
            t.string('password', 100);
          });
        }
      });
}


export  async function down(knex: Knex): Promise<void> {
    return knex.schema.hasTable('users').then(function(exists) {
        if (exists) {
          return knex.schema.dropTable('users');
        }
      });
}
