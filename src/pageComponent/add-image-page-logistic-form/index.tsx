import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProductTable from '@/components/product-table';
import { MdCloudUpload, MdMoreVert } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TransformedSKUItem } from '@/types/sku';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  addImagesToPreviewData,
  removeImageFromPreviewData,
  replaceImageInPreviewData,
  setCoverImageInPreviewData,
} from '@/store/features/stepper/stepperSlice';
import { useUploadFilesMutation } from '@/store/features/apis/apiSlice';
import { getEpicMainUrl } from '@/api/urls';

interface Image {
  id: number;
  url: string;
  isCover: boolean;
}

const AddProductImages: React.FC = () => {
  const AddImageData = useSelector(
    (state: RootState) => state.stepper.previewData
  );
  const dispatch = useDispatch();
  const [uploadFiles] = useUploadFilesMutation();

  const [selectedImage, setSelectedImage] = useState<{
    rowIndex: number;
    imageIndex: number;
    triggerRect?: DOMRect;
  } | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const popoverRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const triggerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const BaseUrl = 'https://kong.epic.dev.esmagico.in';
  const url = `${BaseUrl}/api/product-registry/sku/file`;

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!selectedImage) return;

      const popoverKey = `${selectedImage.rowIndex}-${selectedImage.imageIndex}`;
      const popoverRef = popoverRefs.current[popoverKey];
      const triggerRef = triggerRefs.current[popoverKey];

      const isClickOutside =
        popoverRef &&
        !popoverRef.contains(event.target as Node) &&
        triggerRef &&
        !triggerRef.contains(event.target as Node);

      if (isClickOutside) {
        setSelectedImage(null);
      }
    },
    [selectedImage]
  );

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [selectedImage, handleClickOutside]);

  const makeAsCoverImage = () => {
    if (!selectedImage) return;

    const { rowIndex, imageIndex } = selectedImage;

    dispatch(
      setCoverImageInPreviewData({
        rowIndex: selectedImage.rowIndex,
        imageIndex: selectedImage.imageIndex,
      })
    );

    setSelectedImage(null);
  };

  const replaceImage = async () => {
    if (!selectedImage) return;

    const { rowIndex, imageIndex } = selectedImage;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append('files', file);

          const response = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const uploadedImage = response.data.data[0];

          dispatch(
            replaceImageInPreviewData({
              rowIndex: selectedImage.rowIndex,
              imageIndex: selectedImage.imageIndex,
              newImage: {
                id: uploadedImage.id,
                url: uploadedImage.url,
                isCover: false,
              },
            })
          );
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
    fileInput.click();

    setSelectedImage(null);
  };

  const removeImage = () => {
    if (!selectedImage) return;

    const { rowIndex, imageIndex } = selectedImage;

    dispatch(
      removeImageFromPreviewData({ rowIndex: rowIndex, imageIndex: imageIndex })
    );
    setSelectedImage(null);
  };

  const handleFileUpload = async (
    rowIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);

      const formData = new FormData();
      fileArray.forEach((file) => {
        formData.append('files', file);
      });
      try {
        const response = await uploadFiles(formData).unwrap();

        if (response.error) {
          toast.error(response.error);
          return;
        }
        dispatch(
          addImagesToPreviewData({
            rowIndex,
            images: response.data.map((img: any) => ({
              id: img.id,
              url: img.url,
              isCover: false,
            })),
          })
        );
      } catch (error) {
        toast.error('Error uploading images');
      }
    }
  };

  const AddImageColumns = [
    {
      field: 'sku_id',
      headerName: 'SKU',
      minWidth: 80,
    },
    {
      field: 'product_name',
      headerName: 'Product Name',
      minWidth: 500,
    },
    {
      field: 'upload_product_images',
      headerName: 'Upload Product Images',
      minWidth: 170,
    },
    {
      field: 'uploaded_images',
      headerName: '',
      minWidth: 400,
      maxWidth: 400,
    },
  ];

  const getUpdatedData = () =>
    AddImageData.map((row: any, rowIndex) => ({
      ...row,
      upload_product_images: (
        <label
          htmlFor={`file-input-${rowIndex}`}
          className="flex items-center justify-center h-[68px] w-[68px] rounded-lg bg-[#E8F0F9] shadow-sm cursor-pointer transition-all px-[10px] py-[7px]"
        >
          <div className="text-center">
            <MdCloudUpload className="mx-auto block w-4 h-4 text-primary" />
            <span className="mt-[6px] text-[#0168B4] text-center text-[10px] font-medium">
              Browse
            </span>
            <span className="mt-[-3px] block text-[#0168B4] text-center text-[10px] font-medium">
              Files
            </span>
          </div>
          <input
            id={`file-input-${rowIndex}`}
            type="file"
            accept="image/*"
            className="hidden"
            multiple
            onChange={(e) => handleFileUpload(rowIndex, e)}
          />
        </label>
      ),
      uploaded_images: (
        <div
          className={`flex h-full items-center gap-2 ${
            hoveredRow === rowIndex ? 'overflow-x-auto' : 'overflow-hidden'
          }`}
          style={{
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={() => setHoveredRow(rowIndex)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          {row.uploaded_images.map((img: Image, imageIndex: number) => {
            const popoverKey = `${rowIndex}-${imageIndex}`;
            if (
              imageIndex >= 4 &&
              row.uploaded_images.length > 5 &&
              hoveredRow !== rowIndex
            ) {
              if (imageIndex === 4) {
                return (
                  <div
                    key={img.id}
                    className="relative group animate-slideIn flex-shrink-0"
                  >
                    <img
                      src={img.url}
                      alt={`Uploaded ${imageIndex + 1}`}
                      className="h-[68px] w-[68px] object-contain rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                      <span className="text-white font-semibold text-sm">
                        +{row.uploaded_images.length - 5}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }
            return (
              <div
                key={img.id}
                className="relative group animate-slideIn flex-shrink-0"
              >
                <img
                  src={img.url}
                  alt={`Uploaded ${imageIndex + 1}`}
                  className="h-16 w-16 object-contain rounded flex-shrink-0 transform transition-transform duration-300 ease-in-out"
                />
                {img.isCover && (
                  <span className="mx-[2px] my-[2px] absolute top-0 left-0 bg-[#00000066] text-white text-[10px] font-normal font-semibold leading-none h-[15px] w-[41px] rounded flex justify-center items-center">
                    Cover
                  </span>
                )}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center cursor-pointer rounded"
                  // onClick={() => setSelectedImage({ rowIndex, imageIndex })}
                ></div>
                <div
                  ref={(el) => {
                    triggerRefs.current[popoverKey] = el;
                  }}
                  className="absolute top-0 right-0 w-4 h-4 border border-white hidden group-hover:flex items-center justify-center cursor-pointer rounded-[4px] bg-black bg-opacity-50 m-[3px]"
                  onClick={(e) => {
                    if (
                      selectedImage?.rowIndex === rowIndex &&
                      selectedImage?.imageIndex === imageIndex
                    ) {
                      setSelectedImage(null);
                      return;
                    }

                    const triggerRect = e.currentTarget.getBoundingClientRect();
                    setSelectedImage({
                      rowIndex,
                      imageIndex,
                      triggerRect,
                    });
                    e.stopPropagation();
                  }}
                >
                  <MdMoreVert className="text-white w-3 h-3 rotate-90" />
                  {selectedImage?.rowIndex === rowIndex &&
                    selectedImage?.imageIndex === imageIndex && (
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setSelectedImage(null)}
                      >
                        <div
                          ref={(el) => {
                            popoverRefs.current[popoverKey] = el;
                          }}
                          className="absolute w-32 bg-white border rounded-lg shadow-lg z-50"
                          style={{
                            top: selectedImage.triggerRect
                              ? `${selectedImage.triggerRect.bottom + 5}px`
                              : '0px',
                            left: selectedImage.triggerRect
                              ? `${selectedImage.triggerRect.left - 100}px`
                              : '0px',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ul className="p-1">
                            <li
                              onClick={replaceImage}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#0F1828] hover:text-blue-500 transition-colors duration-200 border-b text-sm font-normal leading-[130%]"
                            >
                              Replace
                            </li>
                            <li
                              onClick={removeImage}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#0F1828] hover:text-blue-500 transition-colors duration-200 border-b border-gray-200 text-sm font-normal leading-[130%]"
                            >
                              Remove
                            </li>
                            <li
                              onClick={makeAsCoverImage}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#0F1828] hover:text-blue-500 transition-colors duration-200 text-sm font-normal leading-[130%] selection"
                              style={{
                                textTransform: 'none',
                              }}
                            >
                              Set as cover
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      ),
    }));

  return (
    <>
      <ProductTable
        columns={AddImageColumns}
        data={getUpdatedData()}
        tableHeight="calc(100vh - 265px)"
        rowHeight="80px"
      />
    </>
  );
};

export default AddProductImages;
