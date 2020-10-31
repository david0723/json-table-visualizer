import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './index';
import { RawRows } from './types';
import { parseTable } from './util';

const VALUE_1 = 'value 1';
const VALUE_2 = 'value 2';

const sampleTable: RawRows = [
  {
    data: {
      key1: VALUE_1,
    },
    kids: {
      table1: {
        records: [
          {
            data: {
              key1: VALUE_2,
            },
            kids: {},
          },
        ],
      },
    },
  },
];

describe('Table component', () => {
  beforeEach(() => {
    render(<Table rows={parseTable(sampleTable)} />);
  });

  test('Only first level row is initially visible', () => {
    expect(screen.queryByText(VALUE_1)).toBeInTheDocument();

    expect(screen.queryByText(VALUE_2)).toBeNull();
  });

  test('Expand button triggers display of child tables', () => {
    const expandButton = screen.queryByText('▶');
    expect(expandButton).toBeInTheDocument();
    expandButton?.click();

    expect(screen.queryByText('▶')).toBeNull();

    const collapseButton = screen.getByText('▼');
    expect(collapseButton).toBeInTheDocument();

    const element2 = screen.queryByText(VALUE_2);
    expect(element2).toBeInTheDocument();
  });

  test('Remove button removes row', () => {
    expect(screen.queryByText(VALUE_1)).toBeInTheDocument();

    const removeButton = screen.queryByText('⨉');
    expect(removeButton).toBeInTheDocument();
    removeButton?.click();

    expect(screen.queryByText(VALUE_1)).toBeNull();
  });
});
