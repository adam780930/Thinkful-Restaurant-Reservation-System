const knex = require("../db/connection.js");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function readReservation(reservation_id) {
  return knex("reservations").where({ reservation_id }).first();
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

async function update(updatedTable, updatedReservation) {
  const { table_id, reservation_id } = updatedTable;
  await knex("tables").where({ table_id }).update(updatedTable).returning("*");
  await knex("reservations")
    .where({ reservation_id })
    .update(updatedReservation)
    .returning("*");
  return read(table_id);
}

module.exports = {
  list,
  read,
  create,
  update,
  readReservation,
};