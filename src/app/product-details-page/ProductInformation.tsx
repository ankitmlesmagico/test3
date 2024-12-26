import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import informationImage from '@/assets/images/information.svg';
import ProductImageUploader from './ProductImageUploader';
import CustomDropdown from '@/components/searchable-dropdown';
import { ProductResponse } from '@/types/product-details';
import { SKUItem } from '@/types/sku';
import { RootState } from '@/store';
import QuillEditor from '@/components/quill-editor';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  width?: string;
  placeholder?: string;
  prefix?: string;
}
interface CountryData {
  warehouse: string;
  status: string;
}

interface MarketplaceData {
  [key: string]: CountryData | any;
}

interface CountryOption {
  label: string;
  value: string;
}
const extractCountryOptions = (
  skuItem: MarketplaceData | undefined | null
): CountryOption[] => {
  if (!skuItem) return [];

  // Use a Set to track unique country values
  const uniqueCountries = new Set<string>();

  // Get all marketplace entries
  const allCountries = Object.entries(skuItem).reduce<CountryOption[]>(
    (allCountries, [marketplace, marketplaceData]) => {
      // For each marketplace, get its countries
      const marketplaceCountries = Object.entries(marketplaceData).reduce<
        CountryOption[]
      >((countries, [country, countryData]) => {
        if (
          countryData &&
          typeof countryData === 'object' &&
          'warehouse' in countryData &&
          'status' in countryData &&
          !uniqueCountries.has(country) // Check if country is already added
        ) {
          uniqueCountries.add(country); // Add to Set
          countries.push({
            label: country,
            value: country,
          });
        }
        return countries;
      }, []);

      return [...allCountries, ...marketplaceCountries];
    },
    []
  );

  return allCountries;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  width = '100%',
  prefix,
}) => (
  <div className="mb-4">
    <label className="block mb-2 text-[#1D1F2C] text-[12px] font-bold leading-[16px]">
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4D4D4D] text-[12px]">
          {prefix}
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: width }}
        className={`border rounded-md h-[32px] focus:outline-none focus:ring-1 focus:ring-blue-500
                   text-[#4D4D4D] font-[Lato] text-[12px] font-normal leading-[16px]
                   ${prefix ? 'pl-6 pr-4' : 'px-4'}`}
      />
    </div>
  </div>
);

const ProductInformation = ({ productData }: { productData: any }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector(
    (state: RootState) => state.stepper.product_details
  );

  console.log(
    'product data is here in internal component',
    productData,
    productDetails,
    'ankit',
    extractCountryOptions(productData?.skuItem),
    'temp',
    productData?.country
  );

  const [value, setValue] = React.useState<any>();

  useEffect(() => {
    setValue({
      label: productData?.country,
      value: productData?.country,
    });
  }, [productData]);

  const handleInputChange = (field: string, value: string) => {
    dispatch({
      type: 'stepper/updateProductDetails',
      payload: {
        ...productDetails,
        content: {
          ...productDetails.content,
          [field]: field === 'price' ? { value, unit: '$' } : value,
        },
      },
    });
  };

  const handleRichTextChange = useCallback(
    (field: string, content: string) => {
      // dispatch({
      //   type: 'stepper/updateProductDetails',
      //   payload: {
      //     ...productDetails,
      //     content: {
      //       ...productDetails.content,
      //       [field]: content,
      //     },
      //   },
      // });
    },
    [dispatch, productDetails]
  );
  const [content, setContent] = useState('');

  const handleContentChange = (newString: string) => {
    setContent(newString);
    console.log('Editor content:', content);
  };
  return (
    <div className="">
      <div className="w-full">
        <div className="my-3">
          <label className="block mb-2 text-[#1D1F2C] text-[12px] font-bold leading-[16px]">
            Select country
          </label>
          <CustomDropdown
            className="w-full"
            options={extractCountryOptions(productData?.skuItem)}
            value={value}
            onChange={setValue}
            key={value}
          />
        </div>
      </div>

      <div className="w-full bg-white rounded-lg px-5 py-5">
        <div className="flex gap-[10px] items-center px-5 py-2 border">
          <img
            className="w-5 h-5"
            src={informationImage.src}
            alt="information"
          />
          <p className="text-[#1D1F2C] text-[14px] font-semibold leading-normal">
            Product Information
          </p>
        </div>

        <div className="mx-auto mt-5">
          <div className="flex gap-52 items-center mb-6 text-sm">
            <div>
              <span className="block text-[#4D4D4D] text-[11px] font-semibold leading-[16px]">
                SKU ID
              </span>
              <span className="text-[#1D1F2C] text-[12px] font-medium leading-[16px]">
                {productData?.sku_id}
              </span>
            </div>
            <div>
              <span className="block text-[#4D4D4D] text-[11px] font-semibold leading-[16px]">
                Inventory
              </span>
              <span className="text-[#1D1F2C] text-[12px] font-medium leading-[16px]">
                {productDetails?.warehouse_information[0]?.inventory}
              </span>
            </div>
          </div>

          <InputField
            label="Product Name"
            value={productDetails?.content?.product_name}
            onChange={(newValue) => handleInputChange('product_name', newValue)}
          />
          <InputField
            label="Price"
            value={productDetails?.content?.price.value}
            onChange={(newValue) => handleInputChange('price', newValue)}
            width="50%"
            prefix="$"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-[#1D1F2C] text-[12px] font-bold leading-[16px]">
            Media
          </label>
          <ProductImageUploader />
        </div>
        <div className="my-4">
          <p className="text-[14px] mb-2 text-[##1D1F2C] font-bold">
            Bullet points
          </p>
          <QuillEditor
            value={productDetails?.content?.bullet_points || ''}
            onChange={(content) =>
              handleRichTextChange('bullet_points', content)
            }
          />
        </div>
        <div className="my-4">
          <p className="text-[14px] mb-2 text-[##1D1F2C] font-bold">
            Description
          </p>
          <QuillEditor
            value={productDetails?.content?.description || ''}
            onChange={(content) => handleRichTextChange('description', content)}
          />
        </div>
        <div className="my-4">
          <p className="text-[14px] mb-2 text-[##1D1F2C] font-bold">
            Product Details
          </p>
          <QuillEditor
            value={productDetails?.content?.product_details || ''}
            onChange={(content) =>
              handleRichTextChange('product_details', content)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
