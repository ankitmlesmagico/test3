import React from 'react';
import { InputField } from './ProductInformation';
import { useSelector } from 'react-redux';

export default function ShippingInformation() {
  const productDetails = useSelector(
    (store: any) => store?.stepper?.product_details
  );
  const shipping_information = productDetails?.shipping_information;
  const shipping_location = productDetails?.shipping_information
    ?.shipping_location
    ? productDetails?.shipping_information?.shipping_location
    : 'Nil';
  const warehouse_information = productDetails?.warehouse_information;

  return (
    <div>
      <div className="bg-white pb-5">
        <div className="flex gap-[10px] items-center px-5 h-[41px] border border-[#F1F1F1]">
          <p className="text-[#1D1F2C] text-[14px] font-semibold leading-normal">
            Shipping Information
          </p>
        </div>
        <div className="w-full rounded-lg px-5">
          <div className="flex justify-between items-center mt-5 text-sm">
            <div>
              <span className="block text-[#4D4D4D] text-[12px] font-semibold leading-[16px]">
                Weight
              </span>

              <span className="text-[#1D1F2C] text-[13px] font-normal leading-[16px]">
                {shipping_information?.weight?.value}{' '}
                {shipping_information?.weight?.unit}
              </span>
            </div>
            <div>
              <span className="block text-[#4D4D4D] text-[12px] font-semibold leading-[16px]">
                Height
              </span>

              <span className="text-[#1D1F2C] text-[13px] font-normal leading-[16px]">
                {shipping_information?.dimensions?.height}{' '}
                {shipping_information?.dimensions?.unit}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-5 text-sm">
            <div>
              <span className="block text-[#4D4D4D] text-[12px] font-semibold leading-[16px]">
                Width
              </span>

              <span className="text-[#1D1F2C] text-[13px] font-normal leading-[16px]">
                {shipping_information?.dimensions?.width}{' '}
                {shipping_information?.dimensions?.unit}
              </span>
            </div>
            <div>
              <span className="block text-[#4D4D4D] text-[12px] font-semibold leading-[16px]">
                Length
              </span>

              <span className="text-[#1D1F2C] text-[13px] font-normal leading-[16px]">
                {shipping_information?.dimensions?.length}{' '}
                {shipping_information?.dimensions?.unit}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-5 text-sm">
            <div>
              <span className="block text-[#4D4D4D] text-[12px] font-semibold leading-[16px]">
                Shipping Location
              </span>

              <span className="text-[#1D1F2C] text-[13px] font-normal leading-[16px]">
                {shipping_location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* More Information */}

      <div className="bg-white pb-1 mt-3">
        <div className="flex gap-[10px] items-center px-5 h-[41px] border border-[#F1F1F1]">
          <p className="text-[#1D1F2C] text-[14px] font-semibold leading-normal">
            More Information
          </p>
        </div>

        <div className="w-full rounded-lg px-5 mt-3">
          <label className="block mb-2 text-[#1D1F2C] text-[12px] font-bold leading-[16px]">
            Return Policy
          </label>
          <p className="text-[#4D4D4D] font-lato text-xs font-normal leading-[133.333%] mb-1">
            {productDetails?.more_information?.return_policy}
          </p>
          {/* <textarea
            rows={8}
            className="w-full border border-gray-300 rounded-md text-[#4D4D4D] text-[12px] font-normal leading-[16px]"
          /> */}
        </div>

        <div className="w-full rounded-lg px-5 mt-4">
          {/* <InputField
            value=""
            label="Product ID ( ASIN, GCID etc )"
            onChange={() => {}}
          /> */}
          <label className="block mb-2 text-[#1D1F2C] text-[12px] font-bold leading-[16px]">
            Product ID ( ASIN, GCID etc )
          </label>
          <p className="text-[#4D4D4D] font-lato text-xs font-normal leading-[133.333%] mb-1">
            {productDetails?.more_information?.product_id}
          </p>
        </div>
      </div>

      {/* Warehouse Information */}

      <div className="bg-white pb-5 mt-3">
        <div className="flex gap-[10px] items-center px-5 h-[41px] border border-[#F1F1F1]">
          <p className="text-[#1D1F2C] text-[14px] font-semibold leading-normal">
            Warehouse Information
          </p>
        </div>
        {warehouse_information?.map(
          (
            item: { country: string; state: string; inventory: number },
            index: number
          ) => {
            return (
              <div className="w-full rounded-lg px-5" key={index}>
                <div className="flex justify-between items-center mt-5 text-sm">
                  <div>
                    <span className="block text-[#4D4D4D] text-[12px] font-semibold leading-[16px]">
                      Country
                    </span>

                    <span className="text-[#1D1F2C] text-[13px] font-normal leading-[16px]">
                      {item?.country}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#4D4D4D] text-[12px] font-semibold leading-[16px]">
                      State
                    </span>

                    <span className="text-[#1D1F2C] text-[13px] font-normal leading-[16px]">
                      {item?.state}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5 text-sm">
                  <div>
                    <span className="block text-[#4D4D4D] text-[12px] font-semibold leading-[16px]">
                      Inventory
                    </span>

                    <span className="text-[#1D1F2C] text-[13px] font-normal leading-[16px]">
                      {item?.inventory} units
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
