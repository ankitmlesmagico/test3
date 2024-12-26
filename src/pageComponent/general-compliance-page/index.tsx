import FileUploader from '@/components/File-upload';
import React from 'react';

const GeneralCompliance = () => {
  return (
    <div
      className="bg-white p-3 mt-5 rounded-lg flex gap-4 flex-wrap"
      style={{ border: '1px solid #E4E4F0' }}
    >
      {[
        "SDS's",
        'NSF Documentation',
        'COA’a',
        'Patents',
        'GMP Certificate',
      ].map((item, index) => {
        return (
          <div key={index} className="" style={{ width: '49%' }}>
            <p className="text-[14px] font-medium text-[#0B1B32] leading-5">
              {index + 1} {item}
            </p>
            <FileUploader handleUploadExcelFile={() => {}} />
          </div>
        );
      })}
    </div>
  );
};

export default GeneralCompliance;
