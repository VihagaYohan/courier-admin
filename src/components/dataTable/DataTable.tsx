import React from "react";
import {
  DataGrid,
  GridToolbar,
  renderActionsCell,
  GridColDef,
} from "@mui/x-data-grid";
import { Alert } from "@mui/material";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import toast, { Toaster } from "react-hot-toast";

// service
import { UserService } from "services";

interface propTypes {
  columns: GridColDef[];
  rows: object[];
  slug: string;
}

const DataTable = ({ columns, rows, slug }: propTypes) => {
  const notify = () => toast.success(" Record has been added");

  // handle delete record
  const handleDelete = async (slug: string, id: string) => {
    try {
      if (slug == "users") {
        // remove user
        await UserService.removeUser(id);
      }

      notify();
    } catch (e) {
      console.log(e);
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${slug}/${params.row.id}`}>
            <img
              src="/view.svg"
              alt="view"
              onClick={() => console.log("view")}
            />
          </Link>

          <div
            className="delete"
            onClick={() => handleDelete(slug, params.row.id)}
          >
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
        rowSelection={true}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
