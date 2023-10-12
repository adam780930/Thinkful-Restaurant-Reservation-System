import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TableForm from "./TableForm";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TableNew() {
  const history = useHistory();

  const initialTableState = {
    table_name: "",
    capacity: "",
  };

  const [tableData, setTableData] = useState({
    ...initialTableState,
  });
  const [createTableError, setTableError] = useState(null);

  const changeHandler = (e) => {
    e.preventDefault();
        setTableData({
        ...tableData,
        [e.target.name]: e.target.value,
      });
    }

    const changeCapacityHandler = (e) => {
      e.preventDefault();
          setTableData({
          ...tableData,
          [e.target.name]: Number(e.target.value),
        });
      }

  const submitHandler = (e) => {
    e.preventDefault();
    const controller = new AbortController();
    createTable(tableData, controller.signal)
      .then(() => history.push("/"))
      .catch(setTableError);
    return () => controller.abort();
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    const controller = new AbortController();
    history.goBack();
    return () => controller.abort();
  };

  return (
    <section>
      <h2>New Table:</h2>
      <ErrorAlert error={createTableError} />
      <TableForm
        changeHandler={changeHandler}
        changeCapacityHandler={changeCapacityHandler}
        tableData={tableData}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </section>
  );
}

export default TableNew;
