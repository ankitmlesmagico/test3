import ProductTable from '@/components/product-table';
import ProductTableWithPagination from '@/components/table-with-pagination';
import { useGetSkuListingQuery } from '@/store/features/apis/apiSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function getProductStatus(): React.ReactNode {
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
function getMarketplaceStatus(status: string): React.ReactNode {
  // const statuses = ['Live', 'In Progress'];
  // const status = statuses[Math.floor(Math.random() * statuses.length)];

  let bgColor = '';
  let textColor = '';

  switch (status) {
    case 'Live':
      bgColor = '#E7FCF3';
      textColor = '#09AA61';
      break;
    case 'In Progress':
      bgColor = '#E7EFFC';
      textColor = '#2877EE';
      break;
    default:
      bgColor = '#E7EFFC';
      textColor = '#2877EE';
      break;
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${textColor}`,
      }}
      className={`w-24 rounded py-1 px-2 text-[12px] text-center border  border-[${textColor}]`}
    >
      {status}
    </div>
  );
}
const generateProductData = (count: number) => {
  const marketplaces = ['Amazon', 'Walmart', 'eBay', 'Shopify'];
  const countries = ['India', 'USA', 'UK', 'Canada', 'Australia'];
  const warehouses = [
    'Washington',
    'California',
    'Texas',
    'New York',
    'Florida',
  ];

  return Array.from({ length: count }, (_, index) => {
    const skuNumber = String(index + 1).padStart(3, '0');
    return {
      skuId: `MED-G123`,
      productName: `Nescafe Kitkat`,
      mpnId: `YDGGY2A624274`,
      caseQty: 4000,
      marketplace: marketplaces[index % marketplaces.length],
      country: countries[index % countries.length],
      inventoryWarehouse: warehouses[index % warehouses.length],
      enhancementCost: '$1,200',
      marketplacesStatus: getMarketplaceStatus(''),
    };
  });
};

// Example usage with the ProductTable component
const SkuListingTable = ({
  value = '',
  showExtraColumn = false,
}: {
  value: string;
  showExtraColumn?: boolean;
}) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const { data, isLoading, isFetching } = useGetSkuListingQuery({
    brand_id: 1,
    page: currentPage,
    limit: 10,
  });

  // if (!data || !data.data) {
  //   return <div>Somethings went wrong</div>;
  // }
  const separatedArray: any = [];

  (data?.data?.sku || [])?.forEach((item: any) => {
    const { marketplaces, ...rest } = item;

    Object.entries(marketplaces).forEach(([marketplace, countries]) => {
      Object.entries(countries as any).forEach(([country, data]: any) => {
        separatedArray.push({
          ...rest,
          marketplace,
          country,
          warehouse: data.warehouse,
          status: data.status,
          skuItem: marketplaces,
        });
      });
    });
  });

  console.log('sku is here', data?.data?.sku, separatedArray);

  const columns = [
    { field: 'skuId', headerName: 'SKU ID', minWidth: 120 },
    { field: 'name', headerName: 'Product Name', minWidth: 120 },
    { field: 'mfn_sku', headerName: 'MPN ID', minWidth: 120 },
    { field: 'case_quantity', headerName: 'Case Qty', minWidth: 80 },
    { field: 'marketplace', headerName: 'Marketplace', minWidth: 120 },
    { field: 'country', headerName: 'Country', minWidth: 80 },
    {
      field: 'inventoryWarehouse',
      headerName: 'Inventory Warehouse',
      minWidth: 150,
    },
    {
      field: 'epic_purchase_cost',
      headerName: 'Epic Purchase Cost',
      minWidth: 150,
    },
    {
      field: 'marketplacesStatus',
      headerName: 'Marketplaces Status',
      minWidth: 130,
    },
  ];
  if (showExtraColumn) {
    columns.push({
      field: 'productStatus',
      headerName: 'Product Status',
      minWidth: 130,
    });
  }
  // const data = generateProductData(100);
  const formedData = (separatedArray || []).map((item: any) => {
    return {
      skuId: (
        <div
          className="cursor-pointer"
          onClick={() => {
            localStorage.setItem('product-details', JSON.stringify(item));
            router.push('/product-details-page');
          }}
        >
          {item.sku_id}
        </div>
      ),
      name: item.name,
      mfn_sku: item.mfn_sku,
      case_quantity: item.case_quantity,
      marketplace: item.marketplace,
      country: item.country,
      inventoryWarehouse: item.warehouse,
      epic_purchase_cost: `${item?.epic_purchase_cost?.unit} ${item?.epic_purchase_cost?.value}`,
      marketplacesStatus: getMarketplaceStatus(item?.status),
      productStatus: getProductStatus(),
    };
  });
  const handlePageChange = (newPage: number, newItemsPerPage: number) => {
    setCurrentPage(newPage);
    setItemsPerPage(newItemsPerPage);
  };

  // Loading state during page changes
  const isTableLoading = isLoading || isFetching;

  const filteredData = formedData.filter((item: any) => {
    // Customize the filter condition as per your requirements
    return (
      item.skuId.props.children.includes(value) || // Filter by SKU ID
      item.name.toLowerCase().includes(value.toLowerCase()) || // Filter by Product Name
      item.marketplace.toLowerCase().includes(value.toLowerCase()) || // Filter by Marketplace
      item.country.toLowerCase().includes(value.toLowerCase()) // Filter by Country
    );
  });
  return (
    <ProductTableWithPagination
      columns={columns}
      data={isTableLoading ? [] : filteredData}
      loading={isTableLoading}
      rowHeight="36px"
      headerHeight="38px"
      tableHeight="500px"
      borderRounded={true}
      pagination={{
        itemsPerPage: 10,
        totalItems: filteredData?.length,
      }}
    />
  );
};

export default SkuListingTable;
