import { Knex } from "knex";
import { Area } from "../../src/models/area";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable("collaborators").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("collaborators", function (t) {
        t.increments("id").notNullable().primary();
        t.string("first_name", 50).notNullable();
        t.string("last_name", 50).notNullable();
        t.string("email", 50).notNullable();
        t.integer("gender").notNullable();
        t.string("phone",50);
        t.integer("cui").notNullable();
        t.string("nit",50);
        t.integer("idArea").notNullable();
        t.foreign("idArea").references("id").inTable(Area.tableName).onDelete("CASCADE");
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.hasTable("collaborators").then(function (exists) {
    if (exists) {
      return knex.schema.dropTable("collaborators");
    }
  });
}
