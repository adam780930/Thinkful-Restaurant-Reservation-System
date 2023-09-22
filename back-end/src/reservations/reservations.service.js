const knex = require("../db/connection.js");

function list(reservation_date) {
  if (reservation_date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date })
      .orderBy("reservations.reservation_time");
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

module.exports = {
  list,
  read,
  create,
};
