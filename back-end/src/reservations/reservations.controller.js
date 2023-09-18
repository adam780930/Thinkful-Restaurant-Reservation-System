/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Middlewares
function validData(req, res, next) {
  if (!req.body.data) {
    next({
      message: "Reservation information required",
      status: 400,
    });
  }
  return next();
}

function validFirstName(req, res, next) {
  if (!req.body.data.first_name) {
    next({
      message: "First name is required",
      status: 400,
    });
  }
  return next();
}

function validLastName(req, res, next) {
  if (!req.body.data.last_name) {
    next({
      message: "Last name is required",
      status: 400,
    });
  }
  return next();
}

function validMobileNumber(req, res, next) {
  if (!req.body.data.mobile_number) {
    next({
      message: "Mobile number is required",
      status: 400,
    });
  }
  return next();
}

function validDate(req, res, next){
  if (!req.body.data.reservation_date) {
    next ({
      message: "Reservation date is required",
      statis: 400,
    })
  }
  return next();
}

//Check if the reservation is made for a Tuesday
function reservationOnTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const tuesday = new Date(reservation_date).getUTCDay();
  if (tuesday === 2) {
    return next({
      message: "The restaurant is closed on Tuesday!",
      status: 400,
    });
  }
  return next();
}

//Check if the reservation is made for a time in the past
function reservationIsInPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const now = Date.now();
  const resDate = new Date(`${reservation_date} ${reservation_time}`).valueOf();
  if (resDate < now) {
    return next({
      message: "Reservation must be made for the future",
      status: 400,
    });
  }
  return next();
}

//Check is the reservation is made for business hour
function reservationDuringBusHours (req, res, next) {
  const { reservation_time } = req.body.data;
  const resTime = reservation_time.split(":");
  const hour = Number(resTime[0]);
  const min = Number(resTime[1]);
  if (hour <= 10 && min < 30) {
    next({
      status: 400,
      message: "Reservation must be within business hour 10:30 to 21:30",
    })
  } else if (hour > 21 || (hour = 21 && min > 30)) {
    next({
      status: 400,
      message: "Reservation must be within business hour 10:30 to 21:30",
    })
  }
  return next();
}


// List reservation
async function list(req, res) {
  const { date } = req.query;
  const ReservationData = await service.list(date);
  res.json({ data: ReservationData });
}

//Create reservation
async function create(req, res) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = req.body.data;
  const newReservationData = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status: "booked",
  };
  const newReservation = await service.create(newReservationData);
  res.status(201).json({ data: newReservation });
}



module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(validData),
    asyncErrorBoundary(validFirstName),
    asyncErrorBoundary(validLastName),
    asyncErrorBoundary(validMobileNumber),
    asyncErrorBoundary(validDate),
    asyncErrorBoundary(reservationDuringBusHours),
    asyncErrorBoundary(reservationOnTuesday),
    asyncErrorBoundary(reservationIsInPast),
    asyncErrorBoundary(create),
  ],
};
