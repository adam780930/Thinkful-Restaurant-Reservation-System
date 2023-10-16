const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Middlewares

async function validData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({
    message: "Table information required",
    status: 400,
  });
}

function hasReservationId(req, res, next) {
  const reservationId = req.body.data.reservation_id;
  if (reservationId) {
    return next();
  }
  next({
    message: `reservation_id required`,
    status: 400,
  });
}

async function validReservation(req, res, next) {
  const resId = req.body.data.reservation_id;
  const reservation = await service.readReservation(resId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    message: `reservation_id ${resId} does not exist`,
    status: 404,
  });
}

async function resAlreadySeated(req, res, next){
  if (res.locals.reservation.status === "seated"){
    next({
      message: `reservation is already seated`,
      status: 400,
    });
  }
  return next();
}

async function validTable(req, res, next) {
  const table_id = req.params.table_id;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    message: `table_id ${table_id} does not exist`,
    status: 404,
  });
}

function validTableName(req, res, next) {
  const tableName = req.body.data.table_name;
  if (tableName && tableName !== "" && tableName.length > 1) {
    return next();
  }
  next({
    message: `table_name is required`,
    status: 400,
  });
}

async function validCapacity(req, res, next) {
  const capacity = req.body.data.capacity;
  if (capacity && capacity > 0 && typeof capacity === "number") {
    return next();
  }
  next({
    message: `capacity is required`,
    status: 400,
  });
}

function capacityCheck(req, res, next) {
  const people = res.locals.reservation.people;
  const capacity = res.locals.table.capacity;
  if (people <= capacity) {
    next();
  } else {
    next({
      message: `Table capacity not sufficient`,
      status: 400,
    });
  }
}

async function tableIsOccupied(req, res, next) {
  const reservation_id = res.locals.table.reservation_id;
  if (reservation_id) {
    next({
      message: "table_id is occupied",
      status: 400,
    });
  }
  return next();
}

async function tableNotOccupied(req, res, next) {
  const reservation_id = res.locals.table.reservation_id;
  if (reservation_id) {
    return next();
  }
  next({
    message: "table_id is not occupied",
    status: 400,
  });
}

// CRUD functions
async function list(req, res) {
  const tableData = await service.list();
  res.json({ data: tableData });
}

function read(req, res) {
  res.json({ data: res.locals.table });
}

async function create(req, res) {
  const { table_name, capacity, reservation_id } = req.body.data;
  const newTableData = {
    table_name,
    capacity,
    reservation_id,
  };
  const newTable = await service.create(newTableData);
  res.status(201).json({ data: newTable });
}

async function update(req, res) {
  const reservation_id = req.body.data.reservation_id;
  const { table_name, capacity, table_id } = res.locals.table;
  const tableUpdate = {
    table_id,
    table_name,
    capacity,
    reservation_id,
  };
  const resUpdate = { ...res.locals.reservation, status: "seated" };
  const updatedTable = await service.update(tableUpdate, resUpdate);
  res.status(200).json({ data: updatedTable });
}

async function destroy(req, res) {
  const resId = res.locals.table.reservation_id;
  const freeTable = {
    ...res.locals.table,
    reservation_id: null,
  };
  const reservation = await service.readReservation(resId);
  const resUpdate = {
    ...reservation,
    status: "finished",
  };
  const freeTableStatus = await service.destroy(freeTable, resUpdate);
  res.status(200).json({ data: freeTableStatus });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(validData),
    asyncErrorBoundary(validTableName),
    asyncErrorBoundary(validCapacity),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(validTable), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(validTable),
    asyncErrorBoundary(validData),
    asyncErrorBoundary(hasReservationId),
    asyncErrorBoundary(validReservation),
    asyncErrorBoundary(resAlreadySeated), //story 6
    asyncErrorBoundary(capacityCheck),
    asyncErrorBoundary(tableIsOccupied),
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(validTable),
    asyncErrorBoundary(tableNotOccupied),
    asyncErrorBoundary(destroy),
  ],
};
