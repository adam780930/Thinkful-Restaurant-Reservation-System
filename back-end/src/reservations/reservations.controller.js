/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Middlewares
async function reservationIdExists(req, res, next) {
  const resId = req.params.reservation_id;
  const reservation = await service.read(resId);
  if (resId && resId !== "" && reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    message: `Reservation ${resId} cannot be found`,
    status: 404,
  });
}

function validData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({
    message: "Reservation information required",
    status: 400,
  });
}

function validFirstName(req, res, next) {
  if (req.body.data.first_name) {
    return next();
  }
  next({
    message: "first_name is required",
    status: 400,
  });
}

function validLastName(req, res, next) {
  if (req.body.data.last_name) {
    return next();
  }
  next({
    message: "last_name is required",
    status: 400,
  });
}

function validMobileNumber(req, res, next) {
  if (req.body.data.mobile_number) {
    return next();
  }
  next({
    message: "mobile_number is required",
    status: 400,
  });
}

function validDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const valid = Date.parse(date);

  if (date && date !== "" && valid) {
    return next();
  }
  next({
    message: "reservation_date must be valid",
    status: 400,
  });
}

function hasTime(req, res, next) {
  const time = req.body.data.reservation_time;
  if (time && typeof time === "string") {
    return next();
  }
  next({
    message: "reservation_time is required",
    status: 400,
  });
}

function validTime(req, res, next) {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  const valid = time.match(timeRegex);
  if (valid) {
    return next();
  }
  next({
    message: "reservation_time must be valid",
    status: 400,
  });
}

function validPeople(req, res, next) {
  const people = req.body.data.people;
  if (people && people > 0 && typeof people === "number") {
    return next();
  }
  next({
    message: `people is required`,
    status: 400,
  });
}

//Check if the reservation is made for a Tuesday
function reservationOnTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const tuesday = new Date(reservation_date).getUTCDay();
  if (tuesday === 2) {
    next({
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
    next({
      message: "Reservation must be made for the future",
      status: 400,
    });
  }
  return next();
}

//Check is the reservation is made for business hour
function reservationDuringBusHours(req, res, next) {
  const { reservation_time } = req.body.data;
  const resTime = reservation_time.split(":");
  const hour = Number(resTime[0]);
  const min = Number(resTime[1]);
  if (hour < 10 || (hour === 10 && min < 30)) {
    next({
      status: 400,
      message: "Reservation must be within business hour 10:30 to 21:30",
    });
  }
  if (hour > 21 || (hour === 21 && min > 30)) {
    next({
      status: 400,
      message: "Reservation must be within business hour 10:30 to 21:30",
    });
  }
  return next();
}

function postStatusCheck(req, res, next) {
  if (req.body.data.status) {
    if (req.body.data.status === "booked") {
      return next();
    } else {
      next({
        message: `Status cannot be ${req.body.data.status}`,
        status: 400,
      });
    }
  } else {
    return next();
  }
}

function updateStatusCheck(req, res, next) {
  const status = req.body.data.status;
  if (
    status === "booked" ||
    status === "seated" ||
    status === "finished" ||
    status === "cancelled"
  ) {
    return next();
  } else {
    next({
      message: `Unknown status ${status}`,
      status: 400,
    });
  }
}

function finishedRes(req, res, next) {
  if (res.locals.reservation.status === "finished") {
    next({
      message: "A finished reservation cannot be updated",
      status: 400,
    });
  }
  return next();
}

// List reservation
async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (mobile_number) {
    const reservationData = await service.search(mobile_number);
    res.json({ data: reservationData });
  } else {
    const reservationData = await service.list(date);
    res.json({ data: reservationData });
  }
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

async function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({ data });
}

async function update(req, res) {
  const updatedData = {
    ...res.locals.reservation,
    status: req.body.data.status,
  };
  const resStatusUpdate = await service.update(updatedData);
  res.status(200).json({ data: resStatusUpdate });
}

async function resUpdate(req, res) {
  const updatedData = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };

  const updatedReservation = await service.resUpdate(updatedData);
  res.status(200).json({ data: updatedReservation });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(validData),
    asyncErrorBoundary(validFirstName),
    asyncErrorBoundary(validLastName),
    asyncErrorBoundary(validMobileNumber),
    asyncErrorBoundary(validDate),
    asyncErrorBoundary(hasTime),
    asyncErrorBoundary(validTime),
    asyncErrorBoundary(validPeople),
    asyncErrorBoundary(reservationDuringBusHours),
    asyncErrorBoundary(reservationOnTuesday),
    asyncErrorBoundary(reservationIsInPast),
    asyncErrorBoundary(postStatusCheck),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationIdExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationIdExists),
    asyncErrorBoundary(updateStatusCheck),
    asyncErrorBoundary(finishedRes),
    asyncErrorBoundary(update),
  ],
  resUpdate: [
    asyncErrorBoundary(reservationIdExists),
    asyncErrorBoundary(validFirstName),
    asyncErrorBoundary(validLastName),
    asyncErrorBoundary(validMobileNumber),
    asyncErrorBoundary(validDate),
    asyncErrorBoundary(hasTime),
    asyncErrorBoundary(validTime),
    asyncErrorBoundary(validPeople),
    asyncErrorBoundary(reservationDuringBusHours),
    asyncErrorBoundary(reservationOnTuesday),
    asyncErrorBoundary(reservationIsInPast),
    asyncErrorBoundary(postStatusCheck),
    asyncErrorBoundary(resUpdate),
  ],
};
