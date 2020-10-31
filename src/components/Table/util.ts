import { Data, RawRows, Rows } from './types';
import { mapFilterNull } from '../../util';

/** This function takes in a collection of rows, and returns an array of unique keys found in the row's data object */
export function getColumns(rows: Rows): string[] {
  const mergedRows = rows.reduce((rowFusion, row) => {
    return { ...rowFusion, ...row.data };
  }, {} as Data);
  return Object.keys(mergedRows);
}

/** Returns an annotaded version of the table (array of rows) where each row has a unique ID */
export function parseTable(rows: RawRows, parentId?: string): Rows {
  return rows.map(({ data, kids = {} }, id) => {
    const children = Object.entries(kids).reduce((prev, [key, kid]) => {
      const parsedTable = kid?.records
        ? parseTable(
            kid.records,
            [parentId, id, key].filter((item) => item !== undefined).join('.')
          )
        : [];
      return {
        ...prev,
        [key]: { records: parsedTable },
      };
    }, {} as Record<string, { records: Rows }>);
    return {
      data,
      children,
      id: [parentId, id].filter((item) => item !== undefined).join('.'),
    };
  });
}

// To do: improve search so that it iteration stops when the row is found
/** Returns a copy of the table (array of rows) without the the specified row */
export function removeRow(rows: Rows, id: string): Rows {
  return mapFilterNull(rows, (row) => {
    if (id === row.id) {
      return null;
    }

    const children = Object.entries(row.children).reduce(
      (prev, [key, child]) => ({
        ...prev,
        [key]: { records: removeRow(child.records, id) },
      }),
      {} as Record<string, { records: Rows }>
    );

    return { ...row, children };
  });
}
