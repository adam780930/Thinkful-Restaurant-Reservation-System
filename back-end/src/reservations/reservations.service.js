const knex = require("../db/connection.js");

function list(reservation_date) {
  if (reservation_date) {
    return knex("reservations")
      .where({ reservation_date, status: "booked" })
      .orWhere({ reservation_date, status: "seated" })
      .orderBy("reservation_time");
  }
}

function read(reservation_id) {
  return knex("reservations").where({ reservation_id }).first();
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

async function update(updatedData){
  const { reservation_id } = updatedData;
  await knex("reservations")
  .where({ reservation_id })
  .update(updatedData)
  .returning("*")

  return read(reservation_id);
}

module.exports = {
  list,
  read,
  create,
  update,
};
