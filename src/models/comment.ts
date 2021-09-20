import { Id, RelationMappings } from "objection";
import Base from "./base";
import Stock from "./stock";
import  Stock_movements  from "./stock_movements"

export class Comment extends Base {
    id!: Id;
    comment!: string;

    idStock_movements?: Id;
    stock_movements!: Stock_movements;    
    
    idStock?: Id;
    stock!:Stock;

    static get tableName() {
      return "comments";
    }
    static get relationMappings(): RelationMappings {
        return {
            stock_movements:{
                relation: Base.BelongsToOneRelation,
                modelClass: Stock_movements,
                join:{
                    from:'comments.idStock_movements',
                    to: 'stock_movements.id'
                }
            },
            stock:{
                relation: Base.BelongsToOneRelation,
                modelClass: Stock,
                join:{
                    from:'comments.idStock',
                    to: 'stocks.id'
                }
            }
        }

    }

  }
  export default Comment;