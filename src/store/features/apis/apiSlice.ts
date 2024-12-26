import { getEpicMainUrl } from '@/api/urls';
import { SKUItem } from '@/types/sku';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CSVParserResponse {
  data: {
    sku: SKUItem[];
    error?: string;
  };
}

interface FileUploadResponse {
  data: Array<{
    id: number;
    url: string;
  }>;
  error?: string;
}

interface URLValidationResponse {
  [key: string]: {
    error: boolean;
    product_url?: string;
  };
}

interface SKUListingResponse {
  data: {
    sku: SKUItem[];
    page: number;
    limit: number;
    total_page_count: number;
    total_record_count: number;
  };
  error?: string;
}

interface SKUListingParams {
  brand_id?: number;
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kong.epic.dev.esmagico.in',
  }),
  tagTypes: ['SKU'],
  endpoints: (builder) => ({
    // Parse CSV file
    parseCSV: builder.mutation<
      CSVParserResponse,
      { file: File; csvType: string }
    >({
      query: ({ file, csvType }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: '/api/product-registry/sku/csv-parser',
          method: 'POST',
          body: formData,
          params: {
            csv_type: csvType,
          },
        };
      },
      invalidatesTags: ['SKU'],
    }),
    // Upload SKU data
    uploadSKU: builder.mutation<any, any>({
      query: (data) => ({
        url: '/api/product-registry/sku',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SKU'],
    }),
    // Update SKU data (for images and URLs)
    updateSKU: builder.mutation<any, any>({
      query: (data) => ({
        url: '/api/product-registry/sku',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['SKU'],
    }),
    // Upload files (images)
    uploadFiles: builder.mutation<FileUploadResponse, FormData>({
      query: (formData) => ({
        url: '/api/product-registry/sku/file',
        method: 'POST',
        body: formData,
      }),
    }),
    //get sku listing
    getSkuListing: builder.query<SKUListingResponse, SKUListingParams>({
      query: (params) => ({
        url: '/api/product-registry/sku',
        method: 'GET',
        params: {
          brand_id: params.brand_id,
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search,
          status: params.status,
          sort_by: params.sort_by,
          sort_order: params.sort_order,
        },
      }),
      providesTags: ['SKU'],
    }),
  }),
});

export const {
  useParseCSVMutation,
  useUploadSKUMutation,
  useUpdateSKUMutation,
  useUploadFilesMutation,
  useGetSkuListingQuery,
} = apiSlice;
