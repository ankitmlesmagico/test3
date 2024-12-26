import { RiFileExcel2Line } from 'react-icons/ri';
import React, { useMemo, useState } from 'react';
import SearchBox from '@/components/search-box';
import ProductTable from '@/components/product-table';
import { FaInfoCircle } from 'react-icons/fa';
import { generateMoreProducts } from './table-data';
import generateProductUrls from './generate-excel-file';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { TransformedSKUItem } from '@/types/sku';
import {
  setPreviewData,
  setUrlCountData,
} from '@/store/features/stepper/stepperSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CustomErrorToast } from '@/components/custom-toaster';
import { getEpicMainUrl } from '@/api/urls';

const ProductUrl = () => {
  const dispatch = useDispatch();
  const previewData = useSelector(
    (state: RootState) => state.stepper.previewData
  );
  const [value, setValue] = useState('');
  const filteredData = useMemo(() => {
    if (!value.trim()) return previewData;

    const searchTerm = value.toLowerCase();
    return previewData.filter(
      (item: TransformedSKUItem) =>
        item.sku_id?.toLowerCase().includes(searchTerm) ||
        item.product_name?.toLowerCase().includes(searchTerm)
    );
  }, [value, previewData]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(
      console.log('transformaded before repsones is here', previewData)
    );
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append('file', files[0]);

    const url = `https://kong.epic.dev.esmagico.in/api/product-registry/sku/csv-parser`;

    const config = {
      params: {
        csv_type: 'sku_url',
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      const data = response?.data?.data;

      const error = response?.data?.data?.data?.error;

      if (error) {
        toast.error(error);
      } else {
        console.log(
          'File uploaded successfully:',
          response?.data?.data,
          previewData
        );
        let count = 0;
        const formattedData = previewData.map((item: TransformedSKUItem) => {
          if (data[item?.sku_id]?.error === false) {
            count = count + 1;
          }
          console.log(
            'item is here',
            item,
            data,
            item.sku_id,
            data[item.sku_id]
          );
          return { ...item, ...data[item?.sku_id] };
        });
        dispatch(
          setUrlCountData({
            totalUrlCount: previewData?.length,
            validUrlCount: count,
          })
        );
        dispatch(setPreviewData(formattedData));
        console.log('count is here', previewData.length, count);
        if (previewData?.length == count) {
          toast.success(`Product URLs successfully uploaded.`, {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            className: 'w-[400px] ml-[500px]',
            transition: Bounce,
          });
        } else {
          toast.error(
            `${previewData?.length - count} of the entered URLs are in incorrect format. Please ensure that the URLs entered are from an existing live listing.`,
            {
              position: 'bottom-left',
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
              className: 'w-[900px] absolute ml-[350px]',

              transition: Bounce,
            }
          );
        }
      }
    } catch (error: any) {
      console.error(
        'Error uploading file:',
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data ||
          error.message ||
          'An error occurred while uploading the file.'
      );
    }
  };

  return (
    <>
      <div
        className="flex justify-between items-center bg-white p-3 rounded"
        style={{ borderBottom: '2px solid #0168b4', margin: '10px 0 10px 0' }}
      >
        <p className="text-[14px]">
          To upload product URLs in bulk, please download our template, fill in
          the necessary details, and upload the filled sheet.
        </p>
        <div className="flex items-center gap-6">
          <div className="flex gap-1">
            <RiFileExcel2Line
              style={{ color: '#0168B4', height: '24px', width: '24px' }}
            />
            <a
              // className="font-[12px] text-semibold underline  text-[#0168b4]"
              // href="/logistic-preview.xlsx"
              // download
              onClick={() => generateProductUrls(previewData)}
              style={{ cursor: 'pointer' }}
            >
              Product URL Template
            </a>
          </div>
          <input
            type="file"
            accept=".xlsx"
            style={{ display: 'none' }}
            id="upload-button"
            onChange={(e) => handleFileUpload(e)}
          />
          <label
            htmlFor="upload-button"
            className="flex justify-center items-center w-[136px] h-[30px] bg-[#E0E8F0] text-[#0168b4] text-[14px] font-medium rounded cursor-pointer"
          >
            Upload
          </label>
        </div>
      </div>
      <SearchBox
        value={value}
        setValue={setValue}
        placeholder="Search by product name or SKU ID"
        defaultStyle={{
          input: { height: '28px' },
          container: { width: '400px', marginBottom: '12px', height: '30px' },
          onFocusColor: '#0168b4',
        }}
      />
      <GenerateProductData previewData={filteredData} />
      <div className="p-4"></div>
    </>
  );
};

export const GenerateProductData = ({ previewData }: any) => {
  // const previewData = useSelector(
  //   (state: RootState) => state.stepper.previewData
  // );
  const generateData = generateMoreProducts(previewData);

  return (
    <div className="w-full">
      <ProductTable
        columns={[
          { field: 'sku_id', headerName: 'SKU', minWidth: 100 },
          { field: 'productName', headerName: 'Product Name', minWidth: 150 },
          {
            field: 'marketplaces',
            headerName: 'Marketplace & Countries',
            minWidth: 200,
          },
          {
            field: 'productURl',
            headerName: <ProductURLHeader />,
            minWidth: 450,
          },
        ]}
        rowHeight="16px"
        data={generateData}
      />
    </div>
  );
};

const ProductURLHeader = () => {
  return (
    <div className="flex items-center gap-2 relative">
      <p>Product URL</p>
      <div className="relative group">
        <FaInfoCircle
          className="cursor-pointer transition-colors hover:text-gray-600"
          color="#777"
        />
        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute z-50 w-96 h-16 p-2 bg-[#343649] text-white text-[12px] rounded-md shadow-lg transition-all duration-200 -left-1/2 transform -translate-x-1/2 mt-2 top-full">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900"></div>
          <p className="mb-4 ">
            Product URLs should be from an existing live listing.
          </p>
          <p className="italic">
            Eg: https://www.amazon.com/dp/B00474CP30?th=1
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductUrl;
