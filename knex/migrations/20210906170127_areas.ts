import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable('areas').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('areas', function(t) {
            t.increments('id').notNullable().primary();
            t.string('name', 50);
            t.string('description', 100);
        
          });
        }
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.hasTable('areas').then(function(exists) {
        if (exists) {
          return knex.schema.dropTable('areas');
        }
      });
}

