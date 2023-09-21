const knex = require("../db/connection.js");

function list() {
  return knex("tables").select("*");
}

// const read = (reservation_id) => {
//   return knex("reservations").where({ reservation_id }).first();
// };

// const create = (newReservation) => {
//   return knex("reservations")
//     .insert(newReservation)
//     .returning("*")
//     .then((createdReservation) => createdReservation[0]);
// };

module.exports = {
  list,
  //   read,
  //   create,
};
