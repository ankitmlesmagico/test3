import React, { useState, ChangeEvent } from 'react';

interface FilterItem {
  id: string;
  label: string;
}

interface CustomStyles {
  container?: React.CSSProperties;
  header?: React.CSSProperties;
  title?: React.CSSProperties;
  arrow?: React.CSSProperties;
  searchInput?: React.CSSProperties;
  optionsContainer?: React.CSSProperties;
  optionItem?: React.CSSProperties;
  radio?: React.CSSProperties;
  label?: React.CSSProperties;
}

interface FilterComponentProps {
  title?: string;
  items: FilterItem[];
  onFilterChange?: (selectedFilter: FilterItem | null) => void;
  searchPlaceholder?: string;
  defaultExpanded?: boolean;
  maxHeight?: string;
  width?: string;
  containerStyle?: React.CSSProperties;
  showSearch?: boolean;
  customStyles?: CustomStyles;
  value: string | null;
  onChange: (value: string | null) => void;
  onClear?: () => void;
}

const FilterRadioComponent: React.FC<FilterComponentProps> = ({
  title = 'Filters',
  items = [],
  onFilterChange,
  searchPlaceholder = 'Search options...',
  defaultExpanded = true,
  maxHeight = '400px',
  width = '300px',
  containerStyle = {},
  showSearch = false,
  customStyles = {},
  value,
  onChange,
  onClear,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRadioChange = (itemId: string): void => {
    onChange?.(itemId);

    if (onFilterChange) {
      const selectedFilter = items.find((item) => item.id === itemId) || null;
      onFilterChange(selectedFilter);
    }
  };
  const handleClear = () => {
    onChange?.(null);
    onClear?.();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const styles = `
    .filter-container {
      width: ${width};
    }

    .filter-header {
      display: flex;
      background-color: #F9F9FC;
      padding: 4px 12px; 
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      cursor: pointer;
    }
    .filter-header:hover {
  background-color: #E2E2F0;
    }

    .filter-title {
      font-size: 14px;
      font-weight: 600;
      color: #535353;
    }

    .filter-arrow {
      border: solid #666;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      transform: ${isExpanded ? 'rotate(-135deg)' : 'rotate(45deg)'};
      transition: transform 0.3s ease;
    }

    .search-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 12px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .options-container {
      max-height: ${isExpanded ? maxHeight : '0'};
      overflow-y: auto;
      transition: max-height 0.3s ease-in-out;
    }

    .option-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .radio-input {
      margin-right: 10px;
      cursor: pointer;
      width: 16px;
      height: 16px;
      accent-color: #1D1F2C;
    }

    .option-label {
      font-size: 14px;
      color: #444;
      cursor: pointer;
      user-select: none;
    }

    /* Custom scrollbar styles */
    .options-container::-webkit-scrollbar {
      width: 6px;
    }

    .options-container::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    .options-container::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 3px;
    }

    .options-container::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div
        className="filter-container"
        style={{ ...containerStyle, ...customStyles.container }}
      >
        <div
          className="filter-header"
          onClick={() => setIsExpanded(!isExpanded)}
          style={customStyles.header}
        >
          <span className="filter-title" style={customStyles.title}>
            {title}
          </span>
          <i className="filter-arrow" style={customStyles.arrow} />
        </div>

        <div
          className="options-container"
          style={customStyles.optionsContainer}
        >
          {showSearch && (
            <input
              type="text"
              className="search-input"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              style={customStyles.searchInput}
            />
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', width: width }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="option-item"
                style={{ ...customStyles.optionItem, minWidth: '50%' }}
              >
                <input
                  type="radio"
                  id={item.id}
                  // name="filter-radio-group"
                  className="radio-input"
                  checked={value === item.id}
                  onChange={() => handleRadioChange(item.id)}
                  style={customStyles.radio}
                />
                <label
                  htmlFor={item.id}
                  className="option-label"
                  style={customStyles.label}
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          {onClear && (
            <p
              style={{
                color: '#1D1F2C',
                fontSize: '13px',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={handleClear}
            >
              Clear
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterRadioComponent;
