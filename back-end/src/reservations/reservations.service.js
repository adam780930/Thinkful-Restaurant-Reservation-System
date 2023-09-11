const knex = require("../db/connection.js");


function list(reservation_date) {
if (reservation_date){
  return knex("reservations")
      .where({ reservation_date })
      .first();
}
    
};





module.exports = {
  list,
};
