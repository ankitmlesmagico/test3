import React, { useState } from 'react';
import { RiFileExcel2Line } from 'react-icons/ri';
import FileUploader from '../File-upload';

function TitleDescription({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h2 className="text-[#1D1F2C] font-lato text-sm font-semibold leading-4 capitalize">
        {title}
      </h2>

      <p className="text-[#7E8794] font-lato text-xs font-medium leading-5 mt-1">
        {description}
      </p>
    </>
  );
}

type UploadLogisticsDataProps = {
  handleUploadExcelFile: (file: File) => void;
};

const UploadLogisticsData: React.FC<UploadLogisticsDataProps> = ({
  handleUploadExcelFile,
}) => {
  return (
    <div className="flex justify-between gap-4 mt-4 w-full">
      <div
        className=" p-3 bg-white rounded-md border"
        style={{ width: '100%' }}
      >
        <TitleDescription
          title={'Step 1: Download Logistics Form Template'}
          description="Download the sample template from below and modify it according to
          your product data."
        />

        <div className="mt-4 flex items-center p-4 bg-blue-50 rounded-md h-[62px]">
          <div className="h-10 w-10 bg-white flex items-center justify-center rounded-md">
            <RiFileExcel2Line
              style={{ color: '#0168B4', height: '24px', width: '24px' }}
            />
          </div>
          <div className="ml-3 mt-[-5px]">
            <a
              href="/logistic-preview.xlsx"
              download
              className="text-[#0168B4] font-lato text-xs font-semibold underline"
            >
              Logistics Form Template
            </a>

            <p className="text-[#7E8794] font-lato text-[10px] font-normal">
              Logistics Template.xlsx
            </p>
          </div>
        </div>
      </div>
      <div
        className=" p-3 bg-white rounded-md border"
        style={{ width: '100%' }}
      >
        <TitleDescription
          title={'Step 2: Upload logistics form'}
          description="Make sure you are uploading the data as per our given sample template."
        />
        <FileUploader handleUploadExcelFile={handleUploadExcelFile} />
      </div>
    </div>
  );
};

export default UploadLogisticsData;
