/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { date } = req.query;
    console.log(date)
    const data = await service.list(date);
    res.json({data})
  }


// function reservationOnTuesday (req, res, next) {
//   const { reservation_date } = req.body.data;
//   const tuesday = new Date(reservation_date).getUTCDay();
//   if(tuesday === 2) {
//     return next({
//       message: "The restaurant is closed on Tuesday!",
//       status: 400,
//     })
//   }
//   return next();
// }

module.exports = {
  list: asyncErrorBoundary(list),
};
