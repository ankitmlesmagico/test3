'use client';
import React, { useEffect, useState } from 'react';
import ProductDetailsSidebar from './ProductDetailsSidebar';
import ProductInformation from './ProductInformation';
import ShippingInformation from './ShippingInformation';
import { CiImageOn } from 'react-icons/ci';
import CustomDropdown, { Option } from '@/components/searchable-dropdown';
import SubStepper from '@/components/sub-stepper';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Header from '@/components/header';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { SKUItem } from '@/types/sku';
import { ProductResponse } from '@/types/product-details';
import { updateProductDetails } from '@/store/features/stepper/stepperSlice';
import { Button } from '@/components/button';
import { toast } from 'react-toastify';
import { getEpicMainUrl } from '@/api/urls';

export default function ProductDetailsPage() {
  const router = useRouter();
  const [productDetailsFromLS, setProductDetailsFromLS] =
    useState<SKUItem | null>(null);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const [categoryOptions, setCategoryOptions] = React.useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = React.useState([]);
  const [categoryValue, setCategoryValue] = useState<Option>();
  const [subCategoryValue, setSubCategoryValue] = useState<Option>();
  const data = useSelector(
    (store: RootState) => store?.stepper?.product_details
  );
  const coverImage = data?.media[0]?.url;
  const totalNumberOfImages = data?.media?.length;
  const step = ['Amazon'];
  const BaseUrl = 'https://kong.epic.dev.esmagico.in';
  const id = 1;
  console.log(
    subCategoryOptions,
    'categoryOptions',
    'data is here ankit',
    data
  );

  const getCategoryOptions = async () => {
    const url = `${BaseUrl}/api/product-listing/category?category_id=${id}`;
    try {
      const response = await axios.get(url);
      console.log(response.data.data, 'response');
      setCategoryOptions(
        response.data?.data?.category?.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
      setSubCategoryOptions(
        response.data?.data?.sub_category?.map((item: any) => ({
          label: item.name,
          value: item.id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch data from localStorage
    const storedProduct = localStorage.getItem('product-details');
    if (storedProduct) {
      setProductDetailsFromLS(JSON.parse(storedProduct));
    }
    handleFetchProduct();
    getCategoryOptions();
  }, []);

  const handleFetchProduct = async () => {
    try {
      const response = await axios.get<any>(
        `${BaseUrl}/api/product-listing/1`,
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
      dispatch(updateProductDetails(response.data.data));
      console.log('api response', response.data.data); // Debugging
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const updateProductStatus = async (productListingId: any, status: any) => {
    try {
      // const response = await axios.patch(
      //   `${getEpicMainUrl()}/api/product-listing/marketplace-status/${productListingId}`,
      //   {
      //     status, // Status sent in the request body
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       // Authorization: `Bearer ${apiKey}`, // Add token if required
      //     },
      //   }
      // );
      toast.success('Product is live successfully');
      // return response.data; // Return the response data
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const updateProductListing = async (productId: any, productData: any) => {
    console.log(' update product listing api is here', productData);
    try {
      const response = await axios.patch(
        `https://kong.epic.dev.esmagico.in/api/product-listing/${productId}`,
        {
          content: productData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      toast.success('product is update successfully');
    } catch (error) {
      toast.error('something went wrong');
      console.error('Error updating product listing:', error);
    }
  };
  console.log('prpoduct details are here ankit', productDetailsFromLS);
  return (
    <div>
      <Header brandName="Epic Orgnisation" />
      {/* details page header */}
      <div className="pl-[30px] pt-3 pb-2 pr-8 bg-[#F9F9FC]">
        <button
          className=" text-black"
          onClick={() => {
            router.back();
          }}
        >
          <IoIosArrowRoundBack className="h-6 w-6" />
        </button>
        <div className="h-[96px] bg-white flex justify-between p-2 mb-2 mt-2">
          <div className="flex gap-4">
            <div className="border rounded-sm">
              <div>
                <img className="w-[52px] h-[60px]" src={coverImage} alt="" />
              </div>
              <div className="flex gap-2 justify-center items-center text-[12px] font-bold leading-normal">
                <CiImageOn className="h-4 w-4" /> {totalNumberOfImages}
              </div>
            </div>

            <div className="w-[345px]">
              <p className="text-[#1D1F2C] text-base font-bold leading-normal">
                {productDetailsFromLS?.name || 'Dummy Product'}
              </p>
              <div className="flex gap-2.5 mt-1">
                <p className="text-[12px] font-medium text-primary px-2  PY-0.5 bg-[#DAEFFF] rounded-md">
                  Young Living
                </p>
                <p className="text-[10px] font-bold text-[#35BB5F] px-2  bg-[#F7FBF8] border border-[#35BB5F] rounded-md">
                  Reviewed
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F3F7FA] flex items-center gap-5 py-[14px] px-4 rounded-sm">
            <p className="text-[#1D1F2C] text-sm font-bold leading-[16px] mr-3">
              Categorize your product
            </p>
            <div className="">
              <label className="block mb-2 text-[#1D1F2C] text-[12px] font-bold leading-[16px]">
                Assign Category
              </label>
              <CustomDropdown
                options={categoryOptions}
                value={categoryOptions[0]}
                onChange={(val) => setCategoryValue(val)}
              />
            </div>
            <div className="">
              <label className="block mb-2 text-[#1D1F2C] text-[12px] font-bold leading-[16px]">
                Assign Subcategory
              </label>
              <CustomDropdown
                options={subCategoryOptions}
                value={subCategoryOptions[0]}
                onChange={(val) => setSubCategoryValue(val)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* middle body */}
      <div className="flex gap-3">
        {/* middle body sidebar */}
        <div className="w-[20%] ml-7">
          <ProductDetailsSidebar
            value={value}
            setValue={setValue}
            productData={productDetailsFromLS}
          />
        </div>
        {/* middle body right sidebar */}
        <div className="w-[80%] mr-7 ">
          <SubStepper
            height="50px"
            stepArray={step}
            backgroundColor="#F3FAFF"
          />
          <div className="flex gap-3 pb-5">
            <div className="w-[72%]">
              <ProductInformation productData={productDetailsFromLS} />
            </div>
            <div className="w-[27%]">
              <ShippingInformation />
            </div>
          </div>
        </div>
      </div>
      {/* bottom bar */}
      <div className="h-20 bg-white flex justify-end items-center">
        <div className="flex gap-3 mr-4 items-end">
          <div>
            <p className="text-[12px] font-bold text-[#1D1F2C] mb-1 ml-1">
              Product Status
            </p>
            <CustomDropdown
              options={[{ label: 'Reviewed', value: 'Reviewed' }]}
              value={{ label: 'Reviewed', value: 'Reviewed' }}
              onChange={(val) => {}}
              className="w-[200px]"
              customStyles={{
                mainContainerStyle: {
                  backgroundColor: '#E7FCF3',
                  border: '1px solid #E0E2E7',
                },
              }}
            />
          </div>
          <Button
            onClick={() =>
              updateProductListing('', {
                price: {
                  value: data?.content?.price?.value,
                  unit: '$',
                },
                media: {
                  added: data.media.map((item: any) => ({
                    id: item.id,
                    type: item.isCover ? 'cover' : 'bannner',
                  })),
                  removed: [],
                  update: [],
                  bullet_points: data?.content?.bullet_points,
                  description: data?.content?.description,
                  product_details: data?.content?.product_details,
                },
              })
            }
            variant="solid"
            customColor="#0168B4"
            customStyle={{ height: '30px', minWidth: '136px' }}
          >
            Confirm Changes
          </Button>
          <Button
            onClick={() => updateProductStatus('', '')}
            variant="solid"
            customColor="#35BB5F"
            customStyle={{ height: '30px', minWidth: '136px' }}
          >
            Go Live
          </Button>
        </div>
      </div>
    </div>
  );
}
