import React from "react";
import {
  DataGrid,
  GridToolbar,
  renderActionsCell,
  GridColDef,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";

interface propTypes {
  columns: GridColDef[];
  rows: object[];
  slug: string;
}

const DataTable = ({ columns, rows, slug }: propTypes) => {
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${slug}/${params.row.id}`}>
            <img src="/view.svg" alt="view" />
          </Link>

          <div className="delete" onClick={() => console.log("delete")}>
            <img src="/delete.svg" alt="delete" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableDensitySelector
      />
    </div>
  );
};

export default DataTable;
