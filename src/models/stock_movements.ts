import { Id, RelationMappings } from "objection";
import Base from "./base";
import Collaborator from "./collaborator";
import Stock from "./Stock";
import Comment from "./comment";

import User from "./user";

export class Stock_movements extends Base {
  id!: Id;
  start_date!: Date;
  finish_date!: Date;
  status!: string;
  
  idCollaborator? :Id;
  collaborator!:Collaborator;

  idUser?: Id;
  user!: User;

  static get tableName() {
    return "stock_movements";
  }

  static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Base.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "stock_movements.idUser",
          to: "users.id",
        },
      },
        collaborator: {
            relation: Base.BelongsToOneRelation,
            modelClass: Collaborator,
            join: {
              from: 'stock_movements.idCollaborator',
              to: 'collaborator.id',
            },

      },
      
      id:{
        relation: Base.HasManyRelation,
        modelClass: Stock,
        join: {
          from: 'stock_movements.id',
          to: 'stocks.idStock_movements',
        },
      },

      idComment:{
        relation: Base.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'stock_movements.id',
          to: 'comments.idStock_movements',
        },
      },
    };
  }
}
export default Stock_movements;
