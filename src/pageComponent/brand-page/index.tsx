import { Button } from '@/components/button';
import Drawer from '@/components/drawer';
import FilterRadioComponent from '@/components/filter-radio-select';
import React, { useEffect, useState } from 'react';

const BrandPageDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) => {
  const [marketplaceFilter, setMarketplaceFilter] = useState<string | null>(
    null
  );
  const [productStatusFilter, setProductStatusFilter] = useState<string | null>(
    null
  );
  const [marketplaceStatusFilter, setMarketplaceStatusFilter] = useState<
    string | null
  >(null);
  // Debug state changes
  useEffect(() => {
    console.log('Marketplace Filter:', marketplaceFilter);
  }, [marketplaceFilter]);

  useEffect(() => {
    console.log('Product Status Filter:', productStatusFilter);
  }, [productStatusFilter]);

  useEffect(() => {
    console.log('Marketplace Status Filter:', marketplaceStatusFilter);
  }, [marketplaceStatusFilter]);
  return (
    <Drawer open={open} setOpen={() => setOpen()} className="w-[350px]">
      <div className="mx-4 mt-6 text-[14px] flex flex-col gap-6">
        <p className="text-[20px] font-semibold mb-3">Filters</p>
        <FilterRadioComponent
          key={'marketplace'}
          title="Marketplace"
          width="100%"
          items={[
            { id: '1', label: 'Amazon' },
            { id: '2', label: 'Lazada' },
            { id: '3', label: 'Walmart' },
            { id: '4', label: 'Rakuten' },
            { id: '5', label: 'Shopee' },
          ]}
          value={marketplaceFilter}
          onChange={setMarketplaceFilter}
          onClear={() => setMarketplaceFilter(null)}
        />
        <FilterRadioComponent
          key={'productStatus'}
          title="Product Status"
          width="100%"
          items={[
            { id: '11', label: 'Amazon' },
            { id: '22', label: 'Lazada' },
            { id: '33', label: 'Walmart' },
            { id: '44', label: 'Rakuten' },
            { id: '55', label: 'Shopee' },
          ]}
          value={productStatusFilter}
          onChange={setProductStatusFilter}
          onClear={() => setProductStatusFilter(null)}
        />
        <FilterRadioComponent
          key={'marketPlacestatus'}
          title="Marketplace Status"
          width="100%"
          items={[
            { id: '111', label: 'Amazon' },
            { id: '222', label: 'Lazada' },
            { id: '333', label: 'Walmart' },
            { id: '444', label: 'Rakuten' },
            { id: '555', label: 'Shopee' },
          ]}
          value={marketplaceStatusFilter}
          onChange={setMarketplaceStatusFilter}
          onClear={() => setMarketplaceStatusFilter(null)}
        />
      </div>
      <div className="flex w-full px-4 justify-between mt-6">
        <div
          onClick={() => {
            setMarketplaceFilter(null);
            setProductStatusFilter(null);
            setMarketplaceStatusFilter(null);
          }}
          className="min-w-[136px] px-3 h-[30px] rounded bg-[#003D861F] text-[14px] font-medium flex items-center justify-center"
        >
          Clear All Filters
        </div>
        <Button
          variant="solid"
          onClick={() => setOpen()}
          customColor="#0168B4"
          customStyle={{ height: '30px', minWidth: '136px' }}
        >
          Applly Filters
        </Button>
      </div>
    </Drawer>
  );
};

export default BrandPageDrawer;
