const knex = require("../db/connection.js");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").where({ table_id }).first();
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

module.exports = {
  list,
  read,
  create,
};
