import { Knex } from "knex";
import {User} from "../../src/models/user";
import {Collaborator} from "../../src/models/collaborator";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable("stock_movements").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("stock_movements", function (t) {
        t.increments("id").notNullable().primary();
        t.date("start_date").notNullable();
        t.date("finish_date");
        t.string("status").notNullable();
        t.integer("idUser").notNullable();
        t.integer("idCollaborator");
        t.foreign("idUser").references("id").inTable(User.tableName).onDelete("CASCADE");
        t.foreign("idCollaborator").references("id").inTable(Collaborator.tableName).onDelete("CASCADE");

      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.hasTable("stock_movements").then(function (exists) {
    if (exists) {
      return knex.schema.dropTable("stock_movements");
    }
  });
}
