import React, { useState, useContext } from 'react';
import { removeRow, getColumns } from './util';
import { Rows as RowsType, Row as RowType } from './types';
import styled from 'styled-components';

const TableWrapper = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const ActionCell = styled.td`
  text-align: center;
  cursor: pointer;
`;

type TableContextType = { deleteRow?: (id: string) => void };

const TableContext = React.createContext<TableContextType>({});

type RowsProps = { rows: RowsType };

const Rows: React.FC<RowsProps> = ({ rows }) => {
  const columns = getColumns(rows);

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Actions</th>
          {columns.map((name) => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <Row row={row} columns={columns} key={row.id} />
        ))}
      </tbody>
    </table>
  );
};

const Row: React.FC<{ row: RowType; columns: string[] }> = ({
  row: { id, data, children = {} },
  columns,
}) => {
  const { deleteRow } = useContext(TableContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const childEntries = Object.entries(children);

  const hasKids =
    childEntries.length > 0 &&
    childEntries.some(([_, table]) => table.records.length > 0);

  return (
    <>
      <tr>
        <ActionCell onClick={() => deleteRow?.(id)} colSpan={hasKids ? 1 : 2}>
          ⨉
        </ActionCell>
        {hasKids ? (
          <ActionCell
            onClick={() => {
              if (hasKids) {
                setIsExpanded((value) => !value);
              }
            }}
          >
            {isExpanded ? '▼' : '▶'}
          </ActionCell>
        ) : null}
        {columns.map((name) => (
          <td key={`${id}${name}`}>{data[name]}</td>
        ))}
      </tr>
      {isExpanded &&
        hasKids &&
        childEntries.map(([key, child]) => {
          if (!child?.records || child?.records.length === 0) {
            return null;
          }
          return (
            <tr key={`${id}${key}`}>
              <td colSpan={100}>
                <p>{key}</p>
                <Rows rows={child.records} />
              </td>
            </tr>
          );
        })}
    </>
  );
};

const Table: React.FC<RowsProps> = ({ rows: propRows }) => {
  const [rows, setRows] = useState(propRows);

  const deleteRow = (rowId: string) => {
    const newRows = removeRow(rows, rowId);
    setRows(newRows);
  };

  return (
    <>
      <button onClick={() => setRows(propRows)}>Reset</button>
      {rows.length === 0 ? (
        <p>No data</p>
      ) : (
        <TableWrapper>
          <TableContext.Provider value={{ deleteRow }}>
            <Rows rows={rows} />
          </TableContext.Provider>
        </TableWrapper>
      )}
    </>
  );
};

export default Table;
