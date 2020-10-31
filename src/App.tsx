import React from 'react';
import Table from './components/Table/';
import tableData from './data-1.json';
import { RawRows } from './components/Table/types';
import { parseTable } from './components/Table/util';

const App: React.FC = () => {
  const data: RawRows = tableData;
  const rows = parseTable(data);
  return (
    <>
      <h2>JSON to Table</h2>
      <Table rows={rows} />
    </>
  );
};

export default App;
