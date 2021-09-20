import { Model } from "objection";
import knex from "../db/knex"
import * as path from 'path';

Model.knex(knex);
export default class Base extends Model {
static get modelPaths():string[] {
    return [path.resolve('src/models')];
}
}
