import ProductTableWithPagination, {
  OfferData,
} from '@/components/table-with-pagination';

const GenerateProductTable = ({ data }: any) => {
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
        totalItems: 121,
      }}
    />
  );
};

const productNames = [
  'Young Living Thieves Household Cleaner Refill',
  'Thieves Dentarome Plus Toothpaste By Young Living',
  'Peppermint Vitality Essential Oil by Young Living - 100% Pure',
];

const marketplacesAndCountries = [
  {
    amazon: ['India', 'Canada', '+3'],
    lazada: ['US', 'Canada', '+3'],
    walmart: ['India', 'UK', 'Canada'],
  },
  {
    amazon: ['India', 'Canada', '+3'],
    lazada: ['Netherlands', 'Canada', '+3'],
    walmart: ['India', 'UK', 'Canada'],
    others: [
      { name: 'Flipkart', country: 'India' },
      { name: 'Shopee', country: 'India, UK' },
    ],
  },
  {
    amazon: ['India', 'Canada', '+3'],
    lazada: ['India', 'Canada', '+3'],
    walmart: ['India', 'UK', 'Canada'],
    others: [{ name: 'UK', country: 'Netherlands, India' }],
  },
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
      marketplace_status: getMarketplaceStatus(),
    });
  }

  return products;
};
export { generatedProductsData, GenerateProductTable };
