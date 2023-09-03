const fs = require('fs');
const { CONF } = require("../config.js");
const { query } = require('express');

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

if (!CONF.pg_user.startsWith("postgres")){
    console.log("DB:", CONF.pg_database);
    throw new Error("Carefull!!!");
}

const db_init_pool = new (require('pg').Pool)(client_conf)

db_init_pool.query(`DROP DATABASE IF EXISTS ${ CONF.pg_database }`, (err, res) => {
    db_init_pool.query(`CREATE DATABASE ${ CONF.pg_database }`, (err, res) => {
        db_init_pool.end();
        if (err) throw (err);
        
        run_table_init_queries();
    })
})

async function run_table_init_queries(){
    const { make_query, end_connection } = require('../db_connection.js');

    queries = [
        fs.readFileSync("db/tables.sql", encoding = 'utf8'),
        ...create_init_language_queries(),
        ...create_init_category_names()
    ];

    for (i in queries){
        if (typeof queries[i] == "object"){
            await make_query(...queries[i])
        } else {
            await make_query(queries[i]);
        }
    }
    
    end_connection();
    console.log("Done!");
}

function create_init_language_queries(){
    return JSON.parse(
        fs.readFileSync("data/init_language_table_data.json", encoding = 'utf8')
    ).map(x => [
        "INSERT INTO Language (name, english_name, short) VALUES ($1, $2, $3);",
        [x.name, x.english_name, x.short]
    ])
}

function create_init_category_names(){
    const { categories, languages } = JSON.parse(
        fs.readFileSync("data/category_names.json", encoding = 'utf8')
    )

    const res = [];

    for (c in categories){
        res.push([
            `INSERT INTO Category (name) Values ($1)`,
            [categories[c]]
        ]);
    }

    for (l in languages){
        for (c in languages[l]){
            const [en_name, lan_name, lan_descr] = languages[l][c];
            res.push([
                `INSERT INTO SupportedCategory (category_id, lan_id, name, description) Values (
                    (SELECT id FROM Category WHERE name = $1), 
                    (SELECT id FROM Language WHERE english_name = $2),
                    $3,
                    $4
                )`,
                [en_name, l, lan_name, lan_descr]
            ]);
        }
    }

    return res
}