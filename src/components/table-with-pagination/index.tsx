import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

import React, { ReactNode, useEffect, useState } from 'react';
import Shimmer from '../shimmer.tsx';
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
interface PaginationConfig {
  itemsPerPage: number;
  totalItems: number;
  serverSide?: boolean;
  onPageChange?: (page: number, itemsPerPage: number) => void;
}
interface ProductTableProps {
  columns?: ColumnDefinition[];
  data?: any[];
  rowHeight?: string;
  loading?: boolean;
  headerHeight?: string;
  tableHeight?: string;
  summarise?: boolean;
  borderRounded?: boolean;
  pagination?: PaginationConfig;
}
const truncateText = (
  text: string | ReactNode,
  maxLines: number = 2,
  lineHeight: number = 16
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
const ProductTableWithPagination: React.FC<ProductTableProps> = ({
  columns = [],
  data = [],
  rowHeight = '50px',
  headerHeight = '38px',
  tableHeight = '100%',
  summarise = true,
  loading = false,
  borderRounded = true,
  pagination,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    pagination?.itemsPerPage || 10
  );
  const [displayData, setDisplayData] = useState<any[]>([]);
  const totalItems = pagination?.totalItems || data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    if (loading) {
      setDisplayData(generateShimmerRows(columns.length));
      return;
    }
    if (!pagination?.serverSide) {
      setDisplayData(data.slice(startIndex, endIndex));
      return;
    }

    // For server-side pagination, use the data as-is
    setDisplayData(data);
  }, [currentPage, itemsPerPage, loading]);

  const totalTableWidth = columns.reduce(
    (sum, column) => sum + column.minWidth,
    0
  );
  const generateShimmerRows = (columnCount: number, rowCount: number = 10) => {
    return Array.from({ length: rowCount }).map((_, index) => {
      const row: Record<string, ReactNode> = {};
      // Dynamic shimmer width based on column type
      const getShimmerWidth = (field: string) => {
        switch (field) {
          case 'sku':
            return '80px';
          case 'productName':
            return '250px';
          case 'marketplaces':
            return '200px';
          case 'productURl':
            return '300px';
          default:
            return '100px';
        }
      };

      // Generate shimmer for each column
      columns.forEach((column) => {
        row[column.field] = (
          <Shimmer
            key={`${column.field}-shimmer-${index}`}
            width={getShimmerWidth(column.field)}
            height="16px"
          />
        );
      });

      return row;
    });
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (pagination?.serverSide && pagination.onPageChange) {
      pagination.onPageChange(newPage, itemsPerPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    if (pagination?.serverSide && pagination.onPageChange) {
      pagination.onPageChange(1, newItemsPerPage);
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      <React.Fragment key={index}>
        {typeof page === 'number' ? (
          <button
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-[#0168B4] text-white'
                : 'bg-[#F2F2F8] hover:bg-[#eee]'
            }`}
          >
            {page}
          </button>
        ) : (
          <span className="px-1">{page}</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div
      className={`overflow-auto border border-gray-200 flex justify-between flex-col ${borderRounded && 'rounded-lg'}`}
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
          {displayData.map((row, rowIndex) => (
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
      {pagination && (
        <div className="flex items-center justify-between pl-4 pr-8 py-2 bg-white border-x border-b border-[#E4E4F0]">
          <div className="text-[12px] flex items-center">
            <span className=" text-gray-700">
              Showing:
              <select
                className="mx-2 py-1 px-1 rounded-md text-black border border-[#E4E4F0] bg-white focus:null"
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
              {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[#0168B4] text-[10px] font-semibold">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded bg-[#F2F2F8] hover:bg-[#eee] disabled:opacity-50"
            >
              <FaCaretLeft className="w-3 h-3" />
            </button>

            {renderPaginationNumbers()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded bg-[#F2F2F8] hover:bg-[#eee] disabled:opacity-50"
            >
              <FaCaretRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductTableWithPagination;
