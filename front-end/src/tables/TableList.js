import { useHistory } from "react-router-dom";

function TableList({ tables }) {
  const history = useHistory();

  // List of tables
  const tableList = tables.map((table) => {
    return (
      <tr key={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td>{table.status}</td>
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
        </tr>
      </thead>
      <tbody>{tableList}</tbody>
    </table>
  );
}

export default TableList;
