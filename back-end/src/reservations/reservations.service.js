const knex = require("../db/connection.js");

function list(reservation_date) {
  if (reservation_date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date })
      .orderBy("reservations.reservation_date")
  }
}

module.exports = {
  list,
};
