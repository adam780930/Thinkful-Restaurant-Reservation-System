const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    
    const tableData = await service.list();
    res.json({ data: tableData });
  }

  module.exports = {
    list: [asyncErrorBoundary(list)],
  };