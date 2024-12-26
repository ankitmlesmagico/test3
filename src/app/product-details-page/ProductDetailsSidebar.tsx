import SearchBox from '@/components/search-box';
import { SKUItem } from '@/types/sku';
import React from 'react';

interface ProductDetailsSidebarProps {
  value: string;
  setValue: (value: string) => void;
  productData: SKUItem | null;
}

export default function ProductDetailsSidebar({
  value,
  setValue,
  productData,
}: ProductDetailsSidebarProps) {
  return (
    <div className="w-full h-full bg-white">
      <div className="py-2 px-[10px]">
        <SearchBox
          value={value}
          setValue={setValue}
          placeholder="Search variant"
          defaultStyle={{
            container: { width: '100%', marginBottom: '12px', height: '30px' },
            input: { height: '28px' },
            onFocusColor: '#0168b4',
          }}
        />
      </div>
      <div className="flex  items-center px-3 py-2 border-l-[2px] border-[#003D86]">
        <p className="text-[12px] font-semibold text-primary capitalize">
          {productData?.name || 'DUMMY NAME'}
        </p>
      </div>
    </div>
  );
}
