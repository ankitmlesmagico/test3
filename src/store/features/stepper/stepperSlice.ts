import { ProductResponse } from '@/types/product-details';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Image {
  id: number;
  url: string;
  isCover: boolean;
}
interface StepperState {
  activeMainStep: number;
  activeSubStep: number;
  fileName: string | null;
  error: string | null;
  previewData: any[];
  urlCountData: {
    validUrlCount: number | null;
    totalUrlCount: number | null;
  };
  showSuccessOnbordingModal: boolean;
  product_details: ProductResponse;
}

const initialData = {
  listing_status: 'ACTIVE',
  epic_status: 'live',
  content: {
    product_name: 'Young Living',
    category_path: 'abcd/ndkd',
    price: {
      value: '10',
      unit: '$',
    },
    bullet_points: 'HTML',
    description: 'HTML',
    product_details: 'HTML',
  },
  media: [
    {
      type: 'cover' as const,
      url: 'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75',
    },
    {
      type: 'banner' as const,
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    },
    {
      type: 'banner' as const,
      url: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    },
  ],
  shipping_information: {
    weight: {
      value: 2.5,
      unit: 'lbs',
    },
    dimensions: {
      height: 5,
      width: 8,
      length: 12,
      unit: 'in',
    },
    shipping_location: '',
  },
  more_information: {
    return_policy: 'HTML',
    product_id: '234',
  },
  warehouse_information: [
    {
      country: 'India',
      state: 'abcd',
      inventory: 3,
    },
    {
      country: 'USA',
      state: 'abcd',
      inventory: 6,
    },
  ],
};

const initialState: StepperState = {
  activeMainStep: 0,
  activeSubStep: 0,
  fileName: null,
  error: null,
  previewData: [],
  urlCountData: {
    validUrlCount: null,
    totalUrlCount: null,
  },
  showSuccessOnbordingModal: false,
  product_details: initialData,
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setActiveMainStep: (state, action: PayloadAction<number>) => {
      state.activeMainStep = action.payload;
    },
    setActiveSubStep: (state, action: PayloadAction<number>) => {
      state.activeSubStep = action.payload;
    },
    setFileName: (state, action: PayloadAction<string | null>) => {
      state.fileName = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPreviewData: (state, action: PayloadAction<any[]>) => {
      state.previewData = action.payload;
    },
    setUrlCountData: (
      state,
      action: PayloadAction<{
        validUrlCount: number | null;
        totalUrlCount: number | null;
      }>
    ) => {
      state.urlCountData = action.payload;
    },
    setShowSuccessOnbordingModal: (state, action: PayloadAction<boolean>) => {
      state.showSuccessOnbordingModal = action.payload;
    },
    addImagesToPreviewData: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        images: Image[];
      }>
    ) => {
      const { rowIndex, images } = action.payload;
      if (state.previewData[rowIndex]) {
        const currentImages = state.previewData[rowIndex].uploaded_images || [];
        const newImages = images.map((img, index) => ({
          ...img,
          isCover: currentImages.length === 0 && index === 0,
        }));
        state.previewData[rowIndex].uploaded_images = [
          ...currentImages,
          ...newImages,
        ];
      }
    },
    removeImageFromPreviewData: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        imageIndex: number;
      }>
    ) => {
      const { rowIndex, imageIndex } = action.payload;
      if (state.previewData[rowIndex]) {
        const updatedImages = state.previewData[
          rowIndex
        ].uploaded_images.filter((_: any, i: number) => i !== imageIndex);

        // If we removed the cover image, make the first remaining image the cover
        if (updatedImages.length > 0) {
          updatedImages[0].isCover = true;
        }

        state.previewData[rowIndex].uploaded_images = updatedImages;
      }
    },
    setCoverImageInPreviewData: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        imageIndex: number;
      }>
    ) => {
      const { rowIndex, imageIndex } = action.payload;
      if (state.previewData[rowIndex]) {
        // First map through to update isCover flags
        const updatedImages = state.previewData[rowIndex].uploaded_images.map(
          (img: any, i: number) => ({
            ...img,
            isCover: i === imageIndex,
          })
        );

        // Then create new array with cover image first, followed by non-cover images
        state.previewData[rowIndex].uploaded_images = [
          ...updatedImages.filter((img: any) => img.isCover),
          ...updatedImages.filter((img: any) => !img.isCover),
        ];
      }
    },
    replaceImageInPreviewData: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        imageIndex: number;
        newImage: Image;
      }>
    ) => {
      const { rowIndex, imageIndex, newImage } = action.payload;
      if (state.previewData[rowIndex]?.uploaded_images[imageIndex]) {
        const wasCover =
          state.previewData[rowIndex].uploaded_images[imageIndex].isCover;
        state.previewData[rowIndex].uploaded_images[imageIndex] = {
          ...newImage,
          isCover: wasCover,
        };
      }
    },
    updateProductMedia: (
      state,
      action: PayloadAction<
        Array<{ id: number; url: string; type: 'cover' | 'banner' }>
      >
    ) => {
      if (state.product_details) {
        state.product_details.media = action.payload;
      }
    },
    resetStepper: () => {
      return initialState;
    },
    updateProductDetails: (state, action: PayloadAction<any>) => {
      state.product_details = action.payload;
    },
  },
});

export const {
  setActiveMainStep,
  setActiveSubStep,
  setFileName,
  setError,
  setPreviewData,
  setUrlCountData,
  setShowSuccessOnbordingModal,
  resetStepper,
  replaceImageInPreviewData,
  setCoverImageInPreviewData,
  removeImageFromPreviewData,
  addImagesToPreviewData,
  updateProductMedia,
  updateProductDetails,
} = stepperSlice.actions;

export default stepperSlice.reducer;
