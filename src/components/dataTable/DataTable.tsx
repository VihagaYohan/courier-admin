import React from "react";
import {
  DataGrid,
  GridToolbar,
  renderActionsCell,
  GridColDef,
} from "@mui/x-data-grid";
import "./dataTable.scss";

interface propTypes {
  columns: GridColDef[];
  rows: object[];
}

const DataTable = ({ columns, rows }: propTypes) => {
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
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
