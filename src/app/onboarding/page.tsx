'use client';
import ProgressStepper from '@/components/stepper';
import SubStepper from '@/components/sub-stepper';
import ProductTable from '@/components/product-table';
import UploadLogisticsData from '@/components/upload-logistics-data';
import ProductUrl from '@/pageComponent/product-url-page';
import GeneralCompliance from '@/pageComponent/general-compliance-page';
import React, { useEffect, useState } from 'react';
import ContractPage from '@/pageComponent/contract-page';
import AddProductImages from '@/pageComponent/add-image-page-logistic-form';
import { toast } from 'react-toastify';
import { Columns } from './json';
import OnbordingSuccessModal from '@/pageComponent/successfully-onbording';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  setActiveMainStep,
  setActiveSubStep,
  setFileName,
  setPreviewData,
  setShowSuccessOnbordingModal,
} from '@/store/features/stepper/stepperSlice';
import { Price, SKUItem, TransformedSKUItem } from '@/types/sku';
import {
  useParseCSVMutation,
  useUpdateSKUMutation,
  useUploadSKUMutation,
} from '@/store/features/apis/apiSlice';
import { getEpicMainUrl } from '@/api/urls';

const subStepArray = ['Upload Logistics Data', 'Preview Data', 'Add Images'];
const Stepper: React.FC = () => {
  const dispatch = useDispatch();
  const { activeMainStep, activeSubStep, previewData } = useSelector(
    (state: RootState) => state.stepper
  );

  const [parseCSV] = useParseCSVMutation();
  const [uploadSKU] = useUploadSKUMutation();
  const [updateSKU] = useUpdateSKUMutation();

  const [excelData, setExcelData] = useState<any>([]);
  const BaseUrl = 'https://kong.epic.dev.esmagico.in';

  function transformInputToDesiredData(input: SKUItem[]): void {
    const transformedData: TransformedSKUItem[] = Array.isArray(input)
      ? input?.map((item) => {
          // Safe marketplace processing
          const marketplaces = Object.entries(item?.marketplace ?? {}).map(
            ([platform, countries]) => {
              const countryList = Object.keys(countries ?? {});
              return (
                <span
                  key={platform}
                  className="inline-flex items-center px-1 text-[#4D4D4D] rounded- font-lato text-[10px] font-medium leading-[130%] capitalize bg-[#e0e0e0]"
                >
                  {/* {`${platform?.charAt(0)?.toUpperCase() + platform?.slice(1) ?? '--'} | ${countryList.slice(0, 2).join(', ') || '--'}`} */}
                  {`${platform && platform.charAt(0) ? platform.charAt(0).toUpperCase() + platform.slice(1) : '--'} | ${countryList.slice(0, 2).join(', ') || '--'}`}
                  {countryList.length > 2 && (
                    <span className="text-[#0168b4] ml-1">
                      {`+${countryList.length - 2}`}
                    </span>
                  )}
                </span>
              );
            }
          );

          // Safe currency formatting function
          const formatCurrency = (price?: Price): string => {
            if (!price) return '--';
            return `${price.unit ?? '--'} ${price.value ?? ''}`;
          };

          return {
            sku_id: item?.sku_id ?? '--',
            product_name: item?.product_name ?? '--',
            mfn_sku: item?.mfn_sku ?? '--',
            case_quantity: item?.case_quantity?.toString() ?? '--',
            upc_gtin: item?.upc_gtin ?? '--',
            epic_purchase_cost: formatCurrency(item?.epic_purchase_cost),
            retail_price: formatCurrency(item?.retail_price),
            contracted_sell_price: formatCurrency(item?.contracted_sell_price),
            asin: item?.asin ?? '--',
            lead_time_value: item?.lead_time?.value?.toString() ?? '--',
            lead_time_unit: item?.lead_time?.unit ?? '--',
            weight_value: item?.weight?.value?.toString() ?? '--',
            weight_unit: item?.weight?.unit ?? '--',
            dimensions_height: item?.dimensions?.height?.toString() ?? '--',
            dimensions_width: item?.dimensions?.width?.toString() ?? '--',
            dimensions_length: item?.dimensions?.length?.toString() ?? '--',
            dimensions_unit: item?.dimensions?.unit ?? '--',
            marketplace_platform:
              Object.keys(item?.marketplace ?? {}).join(', ') || '--',
            marketplace_countries:
              Object.entries(item?.marketplace ?? {})
                .map(([_, countries]) =>
                  Object.keys(countries ?? {}).join(', ')
                )
                .join(', ') || '--',
            marketplace: (
              <div className="flex flex-wrap gap-1">
                {marketplaces.length > 0 ? marketplaces : '--'}
              </div>
            ),
            upload_product_images: '--',
            uploaded_images: [],
          };
        })
      : [];

    // Safely set the preview data
    dispatch(setPreviewData?.(transformedData));
  }

  const handleUploadExcelFile = async (file: File) => {
    try {
      const response = await parseCSV({
        file,
        csvType: 'logistic_form',
      }).unwrap();
      dispatch(setFileName(file.name));
      setExcelData(response.data.sku);
    } catch (error: any) {
      toast.error(error?.data?.error_message || 'Error uploading file');
    }
  };

  const handleUploadSkuData = async () => {
    try {
      await uploadSKU(excelData).unwrap();
      dispatch(setActiveSubStep(activeSubStep + 1));
      toast.success('SKU uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload SKU data');
    }
  };

  const handleUpdateImagesSkuData = async () => {
    const images = previewData?.map((item: any) => ({
      sku_id: item?.sku_id,
      images: {
        added: item?.uploaded_images?.map((image: any) => ({
          type: image?.isCover ? 'cover' : 'banner',
          id: image.id,
        })),
      },
    }));

    try {
      await updateSKU(images).unwrap();
      dispatch(setActiveMainStep(activeMainStep + 1));
      dispatch(setActiveSubStep(0));
      toast.success('SKU updated successfully');
    } catch (error) {
      toast.error('Failed to update SKU');
    }
  };
  const handleUploadUrlData = async () => {
    const transformedData = previewData.reduce((acc: any, item: any) => {
      if (item.sku_id && item.product_url) {
        acc[item.sku_id] = {
          product_url: item.product_url,
        };
      }
      return acc;
    }, {});

    try {
      await updateSKU(transformedData).unwrap();
      dispatch(setShowSuccessOnbordingModal(true));
      toast.success('Product Urls updated successfully');
    } catch (error) {
      console.error('Error updating SKU:', error);
      toast.error('Failed to update productUrl. Please try again.');
    }
  };

  const steps = [
    { title: 'Contract & Contact Form', id: 0 },
    { title: 'Logistics Form', id: 1 },
    { title: 'Add Product URLs', id: 2 },
    { title: 'Compliance Form', id: 3 },
  ];

  useEffect(() => {
    transformInputToDesiredData(excelData);
  }, [excelData]);
  return (
    <>
      <OnbordingSuccessModal />
      <ProgressStepper
        steps={steps}
        handleUploadSkuData={handleUploadSkuData}
        handleUpdateImagesSkuData={handleUpdateImagesSkuData}
        handleUploadUrlData={handleUploadUrlData}
      >
        {/* <div className="h-[500px] w-[calc(100vw-270px)] rounded-md  mx-4"> */}
        <div className="h-[500px] w-[calc(100vw-230px)] rounded-md  mx-4 overflow-hidden">
          {activeMainStep === 0 && (
            <SubStepper stepArray={['Contract & Contact Form']}>
              {activeSubStep === 0 && <ContractPage />}
            </SubStepper>
          )}
          {activeMainStep === 1 && (
            <SubStepper stepArray={subStepArray}>
              {activeSubStep === 0 && (
                <UploadLogisticsData
                  handleUploadExcelFile={handleUploadExcelFile}
                />
              )}
              {activeSubStep === 1 && (
                <>
                  <div className="h-10 px-5 bg-[#F2EDD2] mt-auto flex items-center rounded mb-4">
                    <p className="text-[#1D1F2C] font-lato text-[14px] font-normal leading-none">
                      Please review your data before proceeding or go back to
                      make changes. (You cannot make changes in preview mode.)
                    </p>
                  </div>

                  <ProductTable
                    columns={Columns}
                    data={previewData}
                    tableHeight="calc(100vh - 265px)"
                  />
                </>
              )}
              {activeSubStep === 2 && <AddProductImages />}
            </SubStepper>
          )}
          {activeMainStep === 2 && (
            <SubStepper stepArray={['Add Product URLs']}>
              {activeSubStep === 0 && <ProductUrl />}
            </SubStepper>
          )}
          {activeMainStep === 3 && (
            <SubStepper stepArray={['General Forms', 'Amazon Forms']}>
              {/* <UploadLogisticsData/> */}
              {activeSubStep === 0 && <GeneralCompliance />}
              {activeSubStep === 1 && <GeneralCompliance />}
            </SubStepper>
          )}
        </div>
      </ProgressStepper>
    </>
  );
};

export default Stepper;
