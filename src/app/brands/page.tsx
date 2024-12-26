'use client';
import { Button } from '@/components/button';
import React, { useEffect, useState } from 'react';
import Cross from '@/assets/icons/cross.svg';
import SearchBox from '@/components/search-box';
import { FaCaretRight } from 'react-icons/fa';
import { FaSlidersH } from 'react-icons/fa';
import ProductTable, { OfferData } from '@/components/product-table';
import amway from '@/assets/images/brands/amway.png';
import arbone from '@/assets/images/brands/Arbonne.png';
import avon from '@/assets/images/brands/avon.png';
import forever from '@/assets/images/brands/forever.png';
import herbalife from '@/assets/images/brands/herbalife.png';
import Image from 'next/image';
import ProductTableWithPagination from '@/components/table-with-pagination';
import BrandPageDrawer from '@/pageComponent/brand-page';
import SkuListingTable from '@/pageComponent/sku-listing-page/page';

const TOTAL_DATA = 121;
const Page = () => {
  const [activeView, setActiveView] = useState('brands');
  const [productSearch, setProductSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [initialProductData, setInitialProductData] = useState<OfferData[]>([]);
  const [initialBrandData, setInitialBrandData] = useState<OfferData[]>([]);

  // 3. Add types for productData and brandData to match OfferData
  const [productData, setProductData] = useState<OfferData[]>([]);
  const [brandData, setBrandData] = useState<OfferData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [brandName, setBrandName] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleCrossClick = () => {
    setActiveView('brands');
    setBrandSearch('');
    // setProductSearch('');
    // Reset the data to initial states
    setBrandData(initialBrandData);
    // setProductData(initialProductData);
    setBrandName('');
  };
  console.log('brand name is here', brandName, activeView);

  useEffect(() => {
    const brandData = generateBrandProducts(
      TOTAL_DATA,
      setBrandName,
      setActiveView
    );
    const productData = generatedProductsData(TOTAL_DATA);
    setInitialBrandData([...brandData]);
    setBrandData([...brandData]);

    setProductData([...productData]);
    setInitialProductData([...productData]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (productSearch) {
      const filteredProducts = initialProductData.filter((product) => {
        const productTitle = product.product_title as string;
        return productTitle.toLowerCase().includes(productSearch.toLowerCase());
      });
      setProductData(filteredProducts);
    } else {
      setProductData(initialProductData);
    }
  }, [productSearch, initialProductData]);
  useEffect(() => {
    if (brandSearch) {
      const filteredBrands = initialBrandData.filter((brand) => {
        const brandName = brand.brandName as string;
        return brandName.toLowerCase().includes(brandSearch.toLowerCase());
      });
      setBrandData(filteredBrands);
    } else {
      setBrandData(initialBrandData);
    }
  }, [brandSearch, initialBrandData]);

  const handleProductFilter = (searchTerm: string) => {
    setProductSearch(searchTerm);
  };

  const handleBrandFilter = (searchTerm: string) => {
    setBrandSearch(searchTerm);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-between text-[#043A87]">
        <BrandPageDrawer
          open={openDrawer}
          setOpen={() => setOpenDrawer(false)}
        />
        <div className="flex items-center ml-0.5 mb-2 text-[14px] font-medium">
          <p className="text-[#667085]">All Brands</p>
          {brandName != '' && (
            <div className="flex items-center">
              <FaCaretRight className="mx-1" />
              <p>{brandName}</p>
            </div>
          )}
        </div>
        {/* <Button
          variant="solid"
          customColor="#0168B4"
          customStyle={{
            fontSize: '12px',
            fontWeight: 500,
            padding: '7px 10px',
            height: '30px',
          }}
        >
          <span className="text-[24px]">+</span> Add New Brand
        </Button> */}
      </div>

      <div className="flex gap-1">
        <TableType
          label="All Brands"
          count={brandData.length}
          active={activeView === 'brands'}
          onClick={() => setActiveView('brands')}
          showCross={false}
        />
        {brandName != '' && (
          <TableType
            label={brandName}
            count={brandData.length}
            active={activeView === 'products'}
            onClick={() => setActiveView('products')}
            showCross={true}
            handleCrossClick={() => handleCrossClick()}
          />
        )}
      </div>
      <div className="w-full flex items-center py-2 pl-3 bg-white border-t border-x border-[#E4E4F0]">
        <SearchBox
          value={activeView === 'products' ? productSearch : brandSearch}
          placeholder={
            activeView === 'products'
              ? 'Search by product name or SKU ID'
              : 'Search brands'
          }
          setValue={
            activeView === 'products' ? handleProductFilter : handleBrandFilter
          }
          defaultStyle={{
            container: { height: '30px' },
            input: { height: '28px' },
            onFocusColor: '#075FCC',
          }}
        />
        {/* {activeView == 'products' && (
          <div
            className="border ml-3 pt-1 h-7 px-3 rounded-md text-[#667085] text-[12px] cursor-pointer"
            onClick={() => setOpenDrawer(true)}
          >
            <span>
              <FaSlidersH
                className="inline mr-1"
                stroke="#0168B4"
                width={16}
                height={16}
              />
            </span>
            Filters
          </div>
        )} */}
      </div>

      <div className="h-[calc(100vh-180px)] overflow-y-auto" key={brandName}>
        {activeView == 'brands' ? (
          <GenerateBrandTable mainTableData={brandData} key={brandData} />
        ) : (
          <SkuListingTable
            value={productSearch}
            key={productSearch}
            showExtraColumn={true}
          />
          // <GenerateProductTable data={productData} key={productData} />
        )}
      </div>
      {/* <div className="mb-4"></div> */}
    </>
  );
};

export default Page;

const TableType = ({
  label,
  count,
  active,
  showCross,
  onClick,
  handleCrossClick,
}: {
  label: string;
  count: number;
  active: boolean;
  showCross: boolean;
  onClick: () => void;
  handleCrossClick?: () => void;
}) => {
  return (
    <div
      className={`${active ? 'bg-white' : 'bg-[#E2ECF0]'}  rounded-t-md border-t border-r border-l border-[#E0E2E7] inline-block py-2 px-4 text-[13px]`}
      onClick={() => onClick()}
    >
      <p>
        {label}
        {showCross && handleCrossClick ? (
          <span>
            <Image
              onClick={(e) => {
                e.stopPropagation();

                handleCrossClick();
              }}
              src={Cross.src}
              alt="cross"
              width={16}
              height={16}
              className="inline ml-2 mb-1 cursor-pointer"
            />
          </span>
        ) : (
          <span
            className={`ml-2 text-[12px] rounded-full px-1 py-0.5 text-white ${active ? 'bg-primary' : 'bg-[#7E8794]'} `}
          >
            {count}
          </span>
        )}
      </p>
    </div>
  );
};

const GenerateBrandTable = ({ mainTableData }: any) => {
  return (
    <ProductTableWithPagination
      columns={[
        { field: 'brands', headerName: 'Brands', minWidth: 200 },
        { field: 'total_skus', headerName: 'SKUs Added', minWidth: 110 },
        { field: 'total_live_skus', headerName: 'Live SKUs', minWidth: 110 },
        {
          field: 'total_marketplaces',
          headerName: 'Marketplace',
          minWidth: 110,
        },
        {
          field: 'total_country',
          headerName: 'Countries',
          minWidth: 110,
        },
        {
          field: 'current_status',
          headerName: 'Currently On',
          minWidth: 180,
        },
        {
          field: 'brand_onbording_status',
          headerName: 'Brand Onbording',
          minWidth: 200,
        },
        {
          field: 'onbording_date',
          headerName: 'Onboarded On',
          minWidth: 150,
        },
      ]}
      rowHeight="20px"
      borderRounded={false}
      data={mainTableData}
      pagination={{
        itemsPerPage: 10,
        totalItems: mainTableData.length,
      }}
    />
  );
};

const brandNames = ['Amway', 'Herbalife', 'Avon', 'Arbonne', 'Forever Living'];
const brandLogo = [amway, herbalife, avon, arbone, forever];

function getRandomStatus(): string {
  const statuses = [
    'Step 2: Logistics Form',
    'All Steps Completed',
    'Step 4: Compliance Form',
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}
function getRandomOnboardingStatus(): React.ReactNode {
  const statuses = ['In Progress', 'Completed'];
  const statusIndex = Math.floor(Math.random() * statuses.length);
  const mainColor = statusIndex === 1 ? '#09AA61' : '#2877EE';
  const bgColor = statusIndex === 1 ? '#E7FCF3' : '#E7EFFC';
  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderColor: mainColor,
        color: mainColor,
      }} // Corrected style application
      className={`w-20 rounded py-1 px-2 border text-[12px]`}
    >
      {statuses[statusIndex]}
    </div>
  );
}

function getRandomDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const day = Math.floor(Math.random() * lastDay) + 1;
  const monthName = now.toLocaleString('default', { month: 'short' });

  return `${day}-${monthName}-${year}`;
}
const generateBrandProducts = (
  count: number,
  setBrandName: (val: string) => void,
  setActiveView: (val: string) => void
): OfferData[] => {
  const products: OfferData[] = [];

  for (let i = 0; i < count; i++) {
    const randomBrand = Math.floor(Math.random() * brandNames.length);
    products.push({
      brands: (
        <div
          className="flex gap-1.5 cursor-pointer"
          onClick={() => {
            setBrandName(`${brandNames[randomBrand]}-${i}`);
            setActiveView('products');
          }}
        >
          <Image
            alt={brandNames[randomBrand]}
            src={brandLogo[randomBrand]}
            height={24}
            width={24}
            className="rounded-full"
          />
          <p className="text-[12px]">
            {brandNames[randomBrand]}-{i}
          </p>
        </div>
      ),
      total_skus: Math.floor(Math.random() * 200),
      total_live_skus:
        Math.floor(Math.random() * 150) % Math.floor(Math.random() * 200),
      total_marketplaces: Math.floor(Math.random() * 10),
      total_country: Math.floor(Math.random() * 20),
      current_status: getRandomStatus(),
      brand_onbording_status: getRandomOnboardingStatus(),
      onbording_date: getRandomDate(),
      brandName: brandNames[randomBrand],
    });
  }

  return products;
};

// {product data }

const GenerateProductTable = ({ data }: any) => {
  console.log('data in the generateb table', data);
  return (
    <ProductTableWithPagination
      columns={[
        { field: 'product_title', headerName: 'Product Title', minWidth: 200 },
        {
          field: 'marketplace_and_country',
          headerName: 'Marketplaces & Countries',
          minWidth: 110,
        },
        { field: 'inventory', headerName: 'Inventory', minWidth: 110 },
        {
          field: 'upc_gtin',
          headerName: 'UPC/GTIN',
          minWidth: 110,
        },
        {
          field: 'epic_purchase_code',
          headerName: 'Epic Purchase Cost',
          minWidth: 110,
        },
        {
          field: 'product_status',
          headerName: 'Product Status',
          minWidth: 110,
        },
        {
          field: 'marketplace_status',
          headerName: 'Marketplace Status',
          minWidth: 200,
        },
      ]}
      rowHeight="20px"
      borderRounded={false}
      data={data}
      pagination={{
        itemsPerPage: 10,
        totalItems: data.length,
      }}
    />
  );
};

const productNames = [
  'Young Living Thieves Household Cleaner Refill',
  'Thieves Dentarome Plus Toothpaste By Young Living',
  'Peppermint Vitality Essential Oil by Young Living - 100% Pure',
];

function generateInventory(): number {
  const inventories = [2000, 5000, 4000, 5600, 2300, 800, 770, 4000, 1270];
  return inventories[Math.floor(Math.random() * inventories.length)];
}
function generateUPC(): string {
  return '012345678905';
}

function generateEpicPurchaseCost(): string {
  const costs = [1200, 500, 1200, 700, 1200, 1000, 800, 300, 1200, 1270];
  return `$${costs[Math.floor(Math.random() * costs.length)]}`;
}
function getMarketplaceStatus(): React.ReactNode {
  const statuses = ['NA', 'Live', 'In Progress', 'Declined'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  let bgColor = '';
  let textColor = '';

  switch (status) {
    case 'NA':
      bgColor = '#F5F5F5';
      textColor = '#949494';
      break;
    case 'Live':
      bgColor = '#E7FCF3';
      textColor = '#09AA61';
      break;
    case 'In Progress':
      bgColor = '#FFF2F2';
      textColor = '#EE312E';
      break;
    case 'Declined':
      bgColor = '#F2F4F7';
      textColor = '#334155';
      break;
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${textColor}`,
      }}
      className="w-24 rounded py-1 px-2 text-[12px] text-center"
    >
      {status}
    </div>
  );
}

function getProductStatus(): React.ReactNode {
  const statuses = ['Yet To Start', 'On Hold', 'In Review', 'Reviewed'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  let bgColor = '';
  let textColor = '';

  switch (status) {
    case 'Yet To Start':
      bgColor = '#FFF8E7';
      textColor = '#FFAA0E';
      break;
    case 'On Hold':
      bgColor = '#FFF2F2';
      textColor = '#EE312E';
      break;
    case 'In Review':
      bgColor = '#E7EFFC';
      textColor = '#2877EE';
      break;
    case 'Reviewed':
      bgColor = '#E7FCF3';
      textColor = '#09AA61';
      break;
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${textColor}`,
      }}
      className="w-24 rounded py-1 px-2 text-[12px] text-center"
    >
      {status}
    </div>
  );
}
const generatedProductsData = (count: number): OfferData[] => {
  const products: OfferData[] = [];

  for (let i = 0; i < count; i++) {
    const randomBrand = Math.floor(Math.random() * productNames.length);
    products.push({
      product_title: productNames[randomBrand],
      marketplace_and_country: '',
      inventory: generateInventory(),
      upc_gtin: generateUPC(),
      epic_purchase_code: generateEpicPurchaseCost(),
      product_status: getProductStatus(),
      productNames: productNames[randomBrand],
      marketplace_status: getMarketplaceStatus(),
    });
  }

  return products;
};
