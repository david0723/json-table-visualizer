import { getColumns } from './util';
import { Rows } from './types';

const sampleValue = 'value';

describe('Get columns function', () => {
  const rows: Rows = [
    {
      data: {
        key1: sampleValue,
        key2: sampleValue,
        key3: sampleValue,
      },
      id: 'row1',
      children: {},
    },
    {
      data: {
        key3: sampleValue,
        key4: sampleValue,
        key5: sampleValue,
      },
      id: 'row2',
      children: {},
    },
    {
      data: {
        key1: sampleValue,
        key6: sampleValue,
        key3: sampleValue,
      },
      id: 'row3',
      children: {},
    },
  ];
  const expectedKeys = ['key1', 'key2', 'key3', 'key4', 'key5', 'key6'];
  const columns = getColumns(rows);

  test('returns only the expected keys', () => {
    expect(columns.length).toBe(expectedKeys.length);

    columns.forEach((key) => {
      expect(expectedKeys.includes(key)).toBeTruthy();
    });
  });
});
