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

function validTableName(req, res, next) {
  const tableName = req.body.data.table_name;
  if (tableName && tableName !== "" && tableName.length > 1) {
    return next();
  }
  next({
    message: "table_name is required",
    status: 400,
  });
}

function validCapacity(req, res, next) {
  const capacity = req.body.data.capacity;
  if (capacity && typeof capacity === "number" && capacity > 0) {
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

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(validData),
    asyncErrorBoundary(validTableName),
    asyncErrorBoundary(validCapacity),
    asyncErrorBoundary(create),
  ],
};
