const knex = require("../db/connection.js");


function list(reservation_date) {

    return knex("reservations")
      .where({ reservation_date })
      .orderBy("reservation_time")
      .first();
};

module.exports = {
  list,
};
