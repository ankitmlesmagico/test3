import { OfferData } from '@/components/product-table';
import { RootState } from '@/store';
import {
  setPreviewData,
  setUrlCountData,
} from '@/store/features/stepper/stepperSlice';
import { TransformedSKUItem } from '@/types/sku';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface ProductUrlBoxProps {
  error: boolean;
  previewData: TransformedSKUItem[];
  sku_id: string;
}
const URL_REGEX = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\/?.*$/;

const ProductUrlBox: React.FC<ProductUrlBoxProps> = ({
  error,
  previewData,
  sku_id,
}) => {
  const dispatch = useDispatch();
  const { urlCountData } = useSelector((state: RootState) => state.stepper);
  const [isFocused, setIsFocused] = useState(false);

  const currentItem = previewData.find((item) => item.sku_id === sku_id);
  const currentUrl = currentItem?.product_url || '';

  const validateUrl = (url: string): boolean => {
    return URL_REGEX.test(url);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    const isValid = validateUrl(newUrl);

    dispatch(
      setPreviewData(
        previewData.map((item) => {
          if (item.sku_id === sku_id) {
            return {
              ...item,
              product_url: newUrl,
              error: !isValid,
            };
          }
          return item;
        })
      )
    );

    const wasValid = !currentItem?.error;

    if (wasValid !== isValid) {
      dispatch(
        setUrlCountData({
          ...urlCountData,
          validUrlCount: Math.max(
            0,
            (urlCountData.validUrlCount || 0) + (isValid ? 1 : -1)
          ),
          totalUrlCount: previewData.length,
        })
      );
    }
  };
  const combinedContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E0E2E7',
    borderRadius: '4px',
    gap: '8px',
    padding: '6px 12px',
    borderColor: error ? '#DC2626' : isFocused ? '#3B82F6' : '#e2e8f0',
    boxShadow:
      isFocused && !error ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
    backgroundColor: error ? 'rgba(220, 38, 38, 0.05)' : 'transparent',
  };
  const combinedInputStyle: React.CSSProperties = {
    border: '0px',
    flex: 1,
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
  };
  return (
    <>
      <div style={combinedContainerStyle}>
        <input
          value={currentUrl}
          onChange={handleUrlChange}
          placeholder="Paste product URL here"
          style={combinedInputStyle}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </>
  );
};

export const generateMoreProducts = (previewData: TransformedSKUItem[]) => {
  const products: OfferData[] = [];

  for (let i = 0; i < previewData.length; i++) {
    products.push({
      sku_id: previewData[i].sku_id,
      productName: previewData[i].product_name,
      marketplaces: previewData[i].marketplace,
      productURl: (
        <ProductUrlBox
          error={previewData[i]?.error || false}
          previewData={previewData}
          sku_id={previewData[i].sku_id}
        />
      ),
    });
  }

  return products;
};
