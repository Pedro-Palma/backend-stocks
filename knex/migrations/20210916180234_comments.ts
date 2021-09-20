import { Knex } from "knex";
import {Stock} from "../../src/models/stock"
import {Stock_movements} from "../../src/models/stock_movements"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable("comments").then(function(exists){
        if (!exists) {
            return knex.schema.createTable("comments", function (t) {
              t.increments("id").notNullable().primary();
                t.text("comment").notNullable()
                t.date("date").notNullable();
                t.integer("idStock")
                t.integer("idStock_movements").notNullable()
                t.foreign("idStock").references("id").inTable(Stock.tableName).onDelete("CASCADE");
                t.foreign("idStock_movements").references("id").inTable(Stock_movements.tableName).onDelete("CASCADE");
            });
          }
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.hasTable("comments").then(function (exists) {
        if (exists) {
          return knex.schema.dropTable("comments");
        }
      });
}

