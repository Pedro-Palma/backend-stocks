import { Id, RelationMappings} from 'objection';
import Base from './base';
import Stock_movements from './stock_movements';

export class User extends Base {
id!: Id;
first_name! : string;
last_name! : String;
email! : string;
password! : string; 

static get tableName(){
    return'users';}



static get relationMappings(): RelationMappings{
    return {
        id:{
            relation: Base.HasManyRelation,
            modelClass: Stock_movements,
            join:{
                from: 'user.id',
                to: 'stock_movements.idUser',
            }

        },
        
    }
}
}


export default User;