import React, { ReactNode } from 'react';
// Define interfaces for type safety
interface ColumnDefinition {
  field: string;
  headerName: React.ReactNode;
  minWidth: number;
  maxWidth?: number;
  marginLeft?: string;
}
export interface OfferData {
  [key: string]: ReactNode;
}
interface ProductTableProps {
  columns?: ColumnDefinition[];
  data?: any[];
  rowHeight?: string;
  headerHeight?: string;
  tableHeight?: string;
  summarise?: boolean;
  borderRounded?: boolean;
}
const truncateText = (
  text: string | ReactNode,
  maxLines: number = 2
): string | ReactNode => {
  // If not a string, return as-is
  if (typeof text !== 'string') return text;
  // If text is short enough, return it
  const words = text.split(' ');
  const maxChars = maxLines * 25; // Approximate characters that fit in 2 lines
  // If text is short, return it
  if (text.length <= maxChars) return text;
  // Truncate with ellipsis
  const truncated = words.reduce((acc, word) => {
    const testText = acc ? `${acc} ${word}` : word;
    return testText.length <= maxChars ? testText : acc;
  }, '');
  return `${truncated}...`;
};
const ProductTable: React.FC<ProductTableProps> = ({
  columns = [],
  data = [],
  rowHeight = '50px',
  headerHeight = '38px',
  tableHeight = '100%',
  summarise = true,
  borderRounded = true,
}) => {
  // Calculate total table width to determine if scrolling is needed
  const totalTableWidth = columns.reduce(
    (sum, column) => sum + column.minWidth,
    0
  );
  return (
    <div
      className={`overflow-auto border border-gray-200 ${borderRounded && 'rounded-lg'}`}
      style={{
        maxWidth: '100%',
        height: tableHeight,
      }}
    >
      <table
        className={`w-full table-auto ${borderRounded && 'border-collapse'}`}
        style={{
          minWidth: `${totalTableWidth}px`,
        }}
      >
        <thead
          style={{
            height: headerHeight,
            background: '#F3F9FC',
            borderBottom: '1px solid #E4E4F0',
          }}
        >
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                className="px-4 py-2 text-left sticky top-0 bg-white z-10"
                style={{
                  minWidth: `${column.minWidth}px`,
                  maxWidth: column?.maxWidth ? `${column.maxWidth}px` : `100%`,
                  borderTop: '1px solid #E4E4F0',
                  borderBottom: '1px solid #E4E4F0',
                  // Removed bottom and top borders
                  background: '#F3F9FC',
                  color: '#1D1F2C',
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal',
                  textTransform: 'capitalize',
                  ...(column.marginLeft
                    ? { marginLeft: column.marginLeft }
                    : {}),
                }}
              >
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`bg-white hover:bg-gray-100 transition-colors`}
            >
              {columns.map((column) => (
                <td
                  key={column.field}
                  className="px-4 py-2"
                  style={{
                    minWidth: `${column.minWidth}px`,
                    maxWidth: `${column.maxWidth}px`,
                    ...(column.marginLeft
                      ? { marginLeft: column.marginLeft }
                      : {}),
                    height: rowHeight,
                    borderTop: '1px solid #E4E4F0',
                    borderBottom: '1px solid #E4E4F0',
                    // Removed top and bottom borders
                  }}
                  title={
                    typeof row[column.field] === 'string'
                      ? (row[column.field] as string)
                      : ''
                  }
                >
                  <div
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: '#4D4D4D',
                      fontFamily: 'Lato',
                      fontSize: '12px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '16px',
                      textTransform: 'capitalize',
                      // maxHeight: '32px', // 2 lines * 16px
                    }}
                  >
                    {truncateText(row[column.field]) || '---'}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProductTable;
