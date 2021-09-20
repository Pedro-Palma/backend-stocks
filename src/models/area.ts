import { Id , RelationMappings} from 'objection';
import Base from './base';
import {Collaborator} from './collaborator';

export class Area extends Base {
id!: Id;
name! : string;
description! : string;

static get tableName(){
     return'areas';}
     
 static get relationMappings(): RelationMappings {
    return {
      id: {
        relation: Base.HasManyRelation,
        modelClass: Collaborator,
        join: {
          from: 'area.id',
          to: 'collaborators.idArea',
        },
      },
    };
}

}
export default Area;