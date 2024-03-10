import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
export default function DataTable({ columns, rows}) {

  return (
    <div className="w-full hidden  md:block">
      <div className="w-4/5 mx-auto">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
        />
      </div>
    </div>
  );
}
