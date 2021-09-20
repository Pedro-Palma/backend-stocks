import { Id, RelationMappings } from "objection";
import Base from "./base";
import Collaborator from "./collaborator";
import User from "./user";
import { Stock_movements } from "./stock_movements";
import Comment from "./comment"

export class Stock extends Base {
  id!: Id;
  brand!: string;
  model!: string;
  serialNumber!: string;
  status!: string;

  //FK
  stockMovement!: Stock_movements;
  idStock_movements?: Id;

  static get relationMappings(): RelationMappings {
    return {
      stockMovement:{
            relation: Base.BelongsToOneRelation,
            modelClass: Stock_movements,
            join:{ 
                from:'stocks.idStock_movements',
                to:'stock_movements.id'
            }
        },
        id:{
          relation: Base.HasManyRelation,
          modelClass: Comment,
        join: {
          from: 'stocks.id',
          to: 'comments.idStock',
        },
        }
    };
  }

  static get tableName() {
    return "stocks";
  }
}
export default Stock;
