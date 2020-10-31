/** Represents the content of a row */
export type Data = Record<string, string | number | boolean>;

/** Represents a raw row from the original JSON */
export type RawRow = {
  data: Data;
  kids: Record<string, { records: Array<RawRow> } | undefined>;
};

/** Raw collection of rows or table */
export type RawRows = Array<RawRow>;

/** Represents an annotaded row with an ID */
export type Row = {
  data: Data;
  id: string;
  children: Record<string, { records: Array<Row> }>;
};

/** Annotaded collection of rows or table. Each row has an ID */
export type Rows = Array<Row>;
