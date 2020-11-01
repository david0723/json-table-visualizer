import React from 'react';
import Table from './components/Table/';
import tableData from './data-1.json';
import { RawRows } from './components/Table/types';
import { parseTable } from './components/Table/util';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }`;

const Heading = styled.h2`
  padding: 1rem;
`;

const App: React.FC = () => {
  const data: RawRows = tableData;
  const rows = parseTable(data);
  return (
    <>
      <GlobalStyle />
      <Heading>JSON to table visualizer</Heading>
      <Table rows={rows} />
    </>
  );
};

export default App;
