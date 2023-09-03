const fs = require('fs');
const CONF = require("../config.js");

const client_conf = {
    user: CONF.pg_user,
    host: CONF.pg_host,
    password: CONF.pg_password,
    port: CONF.pg_port,
    database: CONF.pg_main_database
}

if (CONF.pg_ssl){
    client_conf.ssl = {
        rejectUnauthorized: false
    }
}

run_table_init_queries();

async function run_table_init_queries(){
    const { make_query, end_connection } = require('../db_connection.js');

    await make_query(fs.readFileSync("db/migrations.sql", encoding = 'utf8'));
    end_connection();
    console.log("Done!");
}