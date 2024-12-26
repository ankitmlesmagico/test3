import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MdMoreVert } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import frame from '@/assets/images/Frame.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getEpicMainUrl } from '@/api/urls';

interface Image {
  id: number;
  url: string;
  type: string;
}

const ProductImageUploader: React.FC = () => {
  const dispatch = useDispatch();
  const productImages = useSelector((store: any) => {
    const media = store?.stepper?.product_details?.media || [];
    return media.map((item: Image) => ({
      id: item.id || Math.random(), // Fallback for items without id
      url: item.url,
      isCover: item.type === 'cover',
    }));
  });

  const [selectedImage, setSelectedImage] = useState<{
    imageIndex: number;
    position: { x: number; y: number };
  } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const BaseUrl = 'https://kong.epic.dev.esmagico.in';
  const url = `${BaseUrl}/api/product-registry/sku/file`;

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        !selectedImage ||
        !popoverRef.current ||
        popoverRef.current.contains(event.target as Node) ||
        (event.target as Element).closest('.more-options-trigger')
      ) {
        return;
      }
      setSelectedImage(null);
    },
    [selectedImage]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const calculatePopoverPosition = (clickEvent: React.MouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = clickEvent.clientX - containerRect.left;
    const y = clickEvent.clientY - containerRect.top;

    return { x, y };
  };

  const togglePopover = (e: React.MouseEvent, imageIndex: number) => {
    e.stopPropagation();

    if (selectedImage?.imageIndex === imageIndex) {
      setSelectedImage(null);
      return;
    }

    const position = calculatePopoverPosition(e);
    setSelectedImage({ imageIndex, position });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);

      try {
        const formData = new FormData();
        fileArray.forEach((file) => {
          formData.append('files', file);
        });

        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedImages = response.data.data ?? [];

        const newImages = uploadedImages.map((img: Image, index: number) => ({
          id: img.id,
          url: img.url,
          type: productImages.length === 0 && index === 0 ? 'cover' : 'banner',
        }));

        dispatch({
          type: 'stepper/updateProductMedia',
          payload: [...productImages, ...newImages],
        });
      } catch (error) {
        console.error('Error uploading images:', error);
        toast.error('Failed to upload images');
      }
    }
  };

  const makeAsCoverImage = () => {
    if (selectedImage === null) return;

    const updatedImages = productImages.map((img: Image, index: number) => ({
      ...img,
      type: index === selectedImage.imageIndex ? 'cover' : 'banner',
    }));

    const sortedImages = [
      ...updatedImages.filter((img: Image) => img.type === 'cover'),
      ...updatedImages.filter((img: Image) => img.type === 'banner'),
    ];

    dispatch({
      type: 'stepper/updateProductMedia',
      payload: sortedImages,
    });
    setSelectedImage(null);
  };

  const replaceImage = async () => {
    if (selectedImage === null) return;

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
          const updatedImages = productImages.map(
            (img: Image, index: number) =>
              index === selectedImage.imageIndex
                ? {
                    id: uploadedImage.id,
                    url: uploadedImage.url,
                    type: img.type,
                  }
                : img
          );

          dispatch({
            type: 'stepper/updateProductMedia',
            payload: updatedImages,
          });
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error('Failed to replace image');
        }
      }
    };
    fileInput.click();
    setSelectedImage(null);
  };

  const removeImage = () => {
    if (selectedImage === null) return;

    const updatedImages = productImages.filter(
      (_: Image, index: number) => index !== selectedImage.imageIndex
    );

    const finalImages = updatedImages.map((img: Image, index: number) => ({
      ...img,
      type: index === 0 && updatedImages.length > 0 ? 'cover' : 'banner',
    }));

    dispatch({
      type: 'stepper/updateProductMedia',
      payload: finalImages,
    });
    setSelectedImage(null);
  };

  const isSelectedImageCover =
    selectedImage !== null &&
    productImages[selectedImage.imageIndex]?.type === 'cover';

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap gap-2 items-start relative"
    >
      {productImages.length > 0 && (
        <div
          className="relative w-[200px] h-[200px] rounded-lg overflow-hidden flex-shrink-0"
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={(e) => {
            if (
              !e.relatedTarget ||
              !popoverRef.current?.contains(e.relatedTarget as Node)
            ) {
              setHoveredIndex(null);
            }
          }}
        >
          <img
            src={productImages[0].url}
            alt="Cover"
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs font-semibold px-2 py-1 rounded">
            Cover
          </span>
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity ${hoveredIndex === 0 || selectedImage?.imageIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
          ></div>
          <div
            className={`more-options-trigger absolute top-2 right-2 bg-black bg-opacity-50 p-1 rounded cursor-pointer transition-opacity ${hoveredIndex === 0 || selectedImage?.imageIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
            onClick={(e) => togglePopover(e, 0)}
          >
            <MdMoreVert className="text-white w-4 h-4" />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 flex-col h-[200px]">
        {productImages.slice(1).map((img: Image, index: number) => {
          const imageIndex = index + 1;
          return (
            <div
              key={img.id}
              className="relative w-[95px] h-[95px] rounded-lg overflow-hidden"
              onMouseEnter={() => setHoveredIndex(imageIndex)}
              onMouseLeave={(e) => {
                if (
                  !e.relatedTarget ||
                  !popoverRef.current?.contains(e.relatedTarget as Node)
                ) {
                  setHoveredIndex(null);
                }
              }}
            >
              <img
                src={img.url}
                alt={`Uploaded ${imageIndex}`}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity ${hoveredIndex === imageIndex || selectedImage?.imageIndex === imageIndex ? 'opacity-100' : 'opacity-0'}`}
              ></div>
              <div
                className={`more-options-trigger absolute top-1 right-1 bg-black bg-opacity-50 p-1 rounded cursor-pointer transition-opacity ${hoveredIndex === imageIndex || selectedImage?.imageIndex === imageIndex ? 'opacity-100' : 'opacity-0'}`}
                onClick={(e) => togglePopover(e, imageIndex)}
              >
                <MdMoreVert className="text-white w-3 h-3" />
              </div>
            </div>
          );
        })}

        <label
          style={{
            border: '1px dashed #0168B4',
          }}
          className="w-[95px] h-[95px] flex items-center justify-center bg-[#E8F0F9] rounded-lg cursor-pointer hover:bg-blue-50"
        >
          <div className="text-center text-blue-500">
            <img className="mx-auto block w-6 h-6" src={frame.src} alt="" />
            <span className="text-[12px] text-[#0168B4] font-medium normal-case leading-normal">
              Add more
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            multiple
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {selectedImage && (
        <div
          ref={popoverRef}
          className="absolute z-50 bg-white border rounded-lg shadow-lg p-1"
          style={{
            top: `${selectedImage.position.y + 24}px`,
            left: `${selectedImage.position.x - 50}px`,
          }}
          onMouseEnter={() => setHoveredIndex(selectedImage.imageIndex)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className="absolute w-3 h-3 bg-white border-t border-l rotate-45 -translate-y-1/2"
            style={{
              top: -5,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              borderColor: 'inherit',
              marginTop: -1,
            }}
          />

          <ul className="text-sm relative">
            <li
              onClick={replaceImage}
              className="p-2 cursor-pointer hover:bg-gray-100 border-b"
            >
              Replace
            </li>
            <li
              onClick={removeImage}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${!isSelectedImageCover ? 'border-b' : ''}`}
            >
              Remove
            </li>
            {!isSelectedImageCover && (
              <li
                onClick={makeAsCoverImage}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                Set as cover
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductImageUploader;
