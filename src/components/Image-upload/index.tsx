'use client';
import React, { useRef } from 'react';
import { BsUpload, BsTrash } from 'react-icons/bs';

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  value: File | string | null;
  disable?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  disable = false,
}) => {
  const ImageInputRef = useRef<HTMLInputElement>(null);

  const handleSelectImageClick = () => {
    ImageInputRef?.current?.click();
  };

  const handleDeleteImage = () => {
    if (ImageInputRef.current) {
      ImageInputRef.current.value = '';
    }
    onChange(null);
  };

  return (
    <div className="w-full mt-2 border rounded-lg relative">
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={ImageInputRef}
        onChange={(event) => {
          if (event?.target.files?.[0]) {
            onChange(event.target.files[0]);
          }
        }}
        disabled={disable}
        className="hidden"
      />

      {value ? (
        <div className="flex items-center p-2 gap-4 bg-gray-100 rounded-lg">
          <img
            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
            alt="Uploaded"
            className="h-12 w-12 rounded-lg"
          />
          <div className="flex flex-1 justify-between items-center">
            <div>
              <button
                onClick={handleSelectImageClick}
                className="text-green-500 underline font-semibold text-sm"
              >
                Change
              </button>
              <p className="text-sm text-gray-500">image uploaded</p>
            </div>
            <button
              onClick={handleDeleteImage}
              className="text-red-500"
              title="Delete image"
            >
              <BsTrash className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="gap-4 p-4 bg-gray-100 rounded-lg cursor-pointer"
          onClick={handleSelectImageClick}
        >
          <div className="flex gap-2 items-center">
            <BsUpload className="w-3 h-3" style={{ color: '#0168B4' }} />
            <p className="text-[#0168B4] font-lato text-[12px] font-semibold leading-none underline">
              Upload
            </p>
          </div>
          <p className="mt-2 text-[#7E8794] font-lato text-[10px] font-normal leading-none">
            Maximum 5 MB. Upload .xlsx files.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
