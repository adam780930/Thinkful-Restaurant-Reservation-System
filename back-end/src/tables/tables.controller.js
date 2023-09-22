const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const tableData = await service.list();
    res.json({ data: tableData });
  }

  async function create(req, res) {
    const {
      table_name,
      capacity,
    } = req.body.data;
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
    create: [asyncErrorBoundary(create)]
  };