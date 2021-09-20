import { Knex } from "knex";
import {Stock_movements } from "../../src/models/stock_movements"
import {Stock } from "../../src/models/stock"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable("stocks").then(function(exists){
        if (!exists) {
            return knex.schema.createTable("stocks", function (t) {
              t.increments("id").notNullable().primary();
              t.string("brand", 50).notNullable();
              t.string("model", 50).notNullable();
              t.string("serialNumber", 100).notNullable();
              t.string("status",50).notNullable();
              t.integer("idStock_movements");
              t.integer("idStock");
              t.foreign("idStock").references("id").inTable(Stock.tableName).onDelete("CASCADE");
              t.foreign("idStock_movements").references("id").inTable(Stock_movements.tableName).onDelete("CASCADE");
            });
          }
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.hasTable("stocks").then(function (exists) {
        if (exists) {
          return knex.schema.dropTable("stocks");
        }
      });
}

