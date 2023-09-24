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

function validReservationId(req, res, next) {
  const reservationId = req.body.data.reservation_id;
  if (reservationId) {
    return next();
  }
  next({
    message: `reservation_id required`,
    status: 400,
  });
}

async function validTable(req, res, next) {
  const table_id = req.params.table_id;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    message: `Table does not exist`,
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

function validCapacity(req, res, next) {
  const capacity = req.body.data.capacity;
  if (capacity && capacity > 0 && !isNaN(capacity)) {
    return next();
  }
  next({
    message: "capacity is required",
    status: 400,
  });
}

async function list(req, res) {
  const tableData = await service.list();
  res.json({ data: tableData });
}

function read(req, res) {
  res.json({ data: res.locals.table });
}

async function create(req, res) {
  const { table_name, capacity } = req.body.data;
  const newTableData = {
    table_name,
    capacity,
    status: "Free",
  };
  const newTable = await service.create(newTableData);
  res.status(201).json({ data: newTable });
}

async function update(req, res) {
  const reservation_id = req.body.data.reservation_id;
  const { table_name, capacity, table_id } = res.locals.table;
  const updateDetail = {
    table_id,
    table_name,
    capacity,
    status: "Occupied",
    reservation_id,
  };
  const resUpdate = { ...res.locals.reservation, status: "Seated" };
  const updatedTable = await service.update(updateDetail, resUpdate);
  res.json({ data: updatedTable });
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
    asyncErrorBoundary(validReservationId),

    asyncErrorBoundary(update),
  ],
};
