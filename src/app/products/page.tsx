'use client';
import ProductTable from '@/components/product-table';
import SearchBox from '@/components/search-box';
import CustomDropdown from '@/components/searchable-dropdown';
import SkuListingTable from '@/pageComponent/sku-listing-page/page';
import React, { useState } from 'react';

const Page = () => {
  const [value, setValue] = useState('');

  return (
    <div className="p-5 bg-[#F9F9FC]">
      <div className="flex gap-4">
        <SearchBox
          value={value}
          setValue={setValue}
          placeholder="Search by product name or SKU ID"
          defaultStyle={{
            container: { width: '273px', marginBottom: '12px', height: '30px' },
            input: { height: '28px' },
            onFocusColor: '#0168b4',
          }}
        />
        {/* <CustomDropdown options={options} /> */}
      </div>
      <SkuListingTable value={value} key={value} />
    </div>
  );
};

// Data generator utility

export default Page;
