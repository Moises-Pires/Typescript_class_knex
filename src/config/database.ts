import knex from 'knex';

export default knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '5506',
    database: 'knext',
  },
});
