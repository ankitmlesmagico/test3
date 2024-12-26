export interface ProductResponse {
  listing_status: string;
  epic_status: string;
  content: {
    product_name: string;
    category_path: string;
    price: {
      value: string;
      unit: string;
    };
    bullet_points: string;
    description: string;
    product_details: string;
  };
  media: Array<{
    type: string;
    url: string;
  }>;
  shipping_information: {
    weight: {
      value: number;
      unit: string;
    };
    dimensions: {
      height: number;
      width: number;
      length: number;
      unit: string;
    };
    shipping_location: string;
  };
  more_information: {
    return_policy: string;
    product_id: string;
  };
  warehouse_information: Array<{
    country: string;
    state: string;
    inventory: number;
  }>;
}
