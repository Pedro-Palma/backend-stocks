import * as path from 'path';


const knexFile = {
  
  client: 'postgresql',
  useNullAsDefault: true,
  connection: {
    database: 'Stocks',
    user:     'postgres',
    password: 'root'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve('../knex/migrations'),
    extension: '.ts',
    loadExtensions: ['.ts'],
  },
  
}



export default {
development:{
  ...knexFile
}
}