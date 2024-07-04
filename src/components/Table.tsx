import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Post } from '../types';

const Table: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'body', headerName: 'Body', width: 300 }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={posts} 
        columns={columns} 
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => setPaginationModel(model)}
      />
    </div>
  );
};

export default Table;
