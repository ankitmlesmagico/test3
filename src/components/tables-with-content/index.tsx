import ProductTable, { OfferData } from '../product-table';

const baseProducts: OfferData[] = [
  {
    sku: 'MED-G145',
    productName:
      "Thieves Household Cleaner | 14.4 Oz | Plant-Based Natural Cleaning Product For Home Solutions For A Happy, Healthy Home | Young Living's Signature Thieves Essential Oil Cleaner Blend...",
    marketplaces: (
      <div className="flex flex-wrap gap-1">
        <span className="inline-flex items-center px-1 text-[#4D4D4D] rounded-  font-lato text-[10px] font-medium leading-[130%] capitalize bg-[#e0e0e0] ">
          Amazon | India, Canada &nbsp;
          <span className="text-[#0168b4]">{` +3`}</span>
        </span>
        <span className="inline-flex items-center px-1 text-[#4D4D4D] rounded-  font-lato text-[10px] font-medium leading-[130%] capitalize bg-[#e0e0e0] ">
          Amazon | India, Canada &nbsp;
          <span className="text-[#0168b4]">{` +3`}</span>
        </span>
        <span className="inline-flex items-center px-1 text-[#4D4D4D] rounded-  font-lato text-[10px] font-medium leading-[130%] capitalize bg-[#e0e0e0] ">
          Amazon | India, Canada &nbsp;
          <span className="text-[#0168b4]">{` +3`}</span>
        </span>
        <span className="inline-flex items-center px-1 text-[#4D4D4D] rounded-  font-lato text-[10px] font-medium leading-[130%] capitalize bg-[#e0e0e0] ">
          Amazon | India, Canada &nbsp;
          <span className="text-[#0168b4]">{` +3`}</span>
        </span>
      </div>
    ),
  },
];

const generateMoreProducts = (count: number): OfferData[] => {
  const products: OfferData[] = [...baseProducts];

  for (let i = 0; i < count; i++) {
    products.push({
      sku: `MED-G${i}`,
      productName: `Test Product ${i} | Essential Oil Blend | Natural Products For Home And Health...`,
      marketplaces: (
        <div className="flex flex-wrap gap-1">
          <span className="inline-flex items-center px-1 text-[#4D4D4D] rounded-  font-lato text-[10px] font-medium leading-[130%] capitalize bg-[#e0e0e0] ">
            Amazon | India, Canada &nbsp;
            <span className="text-[#0168b4]">{` +3`}</span>
          </span>
          <span className="inline-flex items-center px-1 text-[#4D4D4D] rounded-  font-lato text-[10px] font-medium leading-[130%] capitalize bg-[#e0e0e0] ">
            Amazon | India, Canada &nbsp;
            <span className="text-[#0168b4]">{` +3`}</span>
          </span>
          <span className="inline-flex items-center px-1 text-[#4D4D4D] rounded-  font-lato text-[10px] font-medium leading-[130%] capitalize bg-[#e0e0e0] ">
            Amazon | India, Canada &nbsp;
            <span className="text-[#0168b4]">{` +3`}</span>
          </span>
          <span className="inline-flex items-center px-1 text-[#4D4D4D] rounded-  font-lato text-[10px] font-medium leading-[130%] capitalize bg-[#e0e0e0] ">
            Amazon | India, Canada &nbsp;
            <span className="text-[#0168b4]">{` +3`}</span>
          </span>
        </div>
      ),
    });
  }

  return products;
};

export const GenerateTableData = () => {
  return (
    <ProductTable
      columns={[
        { field: 'sku', headerName: 'SKU', minWidth: 100 },
        { field: 'productName', headerName: 'Product Name', minWidth: 400 },
        {
          field: 'marketplaces',
          headerName: 'Marketplace & Countries',
          minWidth: 300,
        },
      ]}
      rowHeight="10px"
      data={[...generateMoreProducts(10)]}
    />
  );
};
