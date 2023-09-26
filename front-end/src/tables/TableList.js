import { useHistory } from "react-router-dom";
import { unassignTable } from "../utils/api";

function TableList({ tables }) {
  const history = useHistory();

  // List of tables
  const tableList = tables.map((table) => {
    const finishHandler = (e) => {
      e.preventDefault();
      const controller = new AbortController();
      const message = `Is this table ready to seat new guests? This cannot be undone.`;
      const clicked = window.confirm(message);
      if (clicked) {
        unassignTable(e.target.value, controller.signal);
        console.log(table.reservation_id);
        console.log("this is " + e.target.value);
      }
      return;
      // return () => controller.abort();
    };

    return (
      <tr key={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td>{table.status}</td>
        <td>
          {table.status === "occupied" ? (
            <button
              data-table-id-finish={table.table_id}
              type="button"
              className="btn-dark"
              onClick={finishHandler}
              value={table.table_id}
            >
              Finish
            </button>
          ) : null}
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Table Name</th>
          <th scope="col">Capacity</th>
          <th scope="col">Status</th>
          <th scope="col">Click when table is open</th>
        </tr>
      </thead>
      <tbody>{tableList}</tbody>
    </table>
  );
}

export default TableList;
