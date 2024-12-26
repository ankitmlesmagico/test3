export interface EpicPrice {
  value: number;
  unit: string;
}
export interface Price {
  value: number;
  unit: string;
}

export interface LeadTime {
  value: number;
  unit: string;
}

export interface Weight {
  value: number;
  unit: string;
}

export interface Dimensions {
  height: number;
  width: number;
  length: number;
  unit: string;
}

export interface Marketplace {
  [platform: string]: {
    [country: string]: {
      status: string;
    };
  };
}

export interface SKUItem {
  name: string;
  sku_id: string;
  product_name: string;
  mfn_sku: string;
  case_quantity: number;
  upc_gtin: string;
  epic_purchase_cost: EpicPrice;
  retail_price: EpicPrice;
  contracted_sell_price: EpicPrice;
  asin: string;
  lead_time: LeadTime;
  weight: Weight;
  dimensions: Dimensions;
  marketplace: Marketplace;
  status: string;
}

export interface TransformedSKUItem {
  sku_id: string;
  product_name: string;
  mfn_sku: string;
  case_quantity: string;
  upc_gtin: string;
  epic_purchase_cost: string;
  retail_price: string;
  contracted_sell_price: string;
  asin: string;
  lead_time_value: string;
  lead_time_unit: string;
  weight_value: string;
  weight_unit: string;
  dimensions_height: string;
  dimensions_width: string;
  dimensions_length: string;
  dimensions_unit: string;
  marketplace_platform: string;
  marketplace_countries: string;
  marketplace: React.ReactNode;
  error?: boolean;
  product_url?: string;
}
