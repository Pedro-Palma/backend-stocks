import { Id, RelationMappings } from 'objection';
import Base from './base';
import {Area} from './area';
import {Stock_movements} from './stock_movements';

export class Collaborator extends Base {
    id!: Id;
    first_name! : string;
    last_name! : string;
    email! : string;
    gender! : number; 
    phone! : number;
    cui!: number;
    nit!: number;
    idArea?: Id;    
    area!: Area;
   
    static get tableName(){
        return 'collaborators';}


static get relationMappings(): RelationMappings{
    return {
        area: {
            relation: Base.BelongsToOneRelation,
            modelClass: Area,
            join:{
                from: 'collaborators.idArea',
                to: 'areas.id',
            }

        },

        id:{
            relation: Base.HasManyRelation,
            modelClass: Stock_movements,
            join:{
                from: 'collaborators.id',
                to: 'stock_movements.idCollaborator',
            }

        },
        
    }
}




}

export default Collaborator;