export const Columns = [
    {
      field: 'sku_id',
      headerName: 'SKU',
      minWidth: 85,
    },
    {
      field: 'product_name',
      headerName: 'Product Name',
      minWidth: 225,
    },
    {
      field: 'mfn_sku',
      headerName: 'MFN SKU',
      minWidth: 120,
    },
    {
      field: 'case_quantity',
      headerName: 'Case Qty',
      minWidth: 70,
    },
    {
      field: 'upc_gtin',
      headerName: 'UPC/GTIN',
      minWidth: 90,
    },
    {
      field: 'epic_purchase_cost',
      headerName: 'Purchase Cost',
      minWidth: 70,
    },
    {
      field: 'retail_price',
      headerName: 'Retail Price',
      minWidth: 70,
    },
    {
      field: 'contracted_sell_price',
      headerName: 'Contracted Sell Price',
      minWidth: 70,
    },
    {
      field: 'asin',
      headerName: 'ASIN (If Applicable)',
      minWidth: 70,
    },
    {
      field: 'marketplace',
      headerName: 'Marketplace & Countries',
      minWidth: 300,
    },
    {
      field: 'lead_time_value',
      headerName: 'Lead Time',
      minWidth: 70,
    },
    {
      field: 'weight_value',
      headerName: 'Weight (Lbs)',
      minWidth: 70,
    },
    {
      field: 'dimensions_height',
      headerName: 'Height (In)',
      minWidth: 70,
    },
    {
      field: 'dimensions_width',
      headerName: 'Width (In)',
      minWidth: 70,
    },
    {
      field: 'dimensions_length',
      headerName: 'Length (In)',
      minWidth: 70,
    },
  ];
  
  export const api_response = {
    sku: [
      {
        sku_id: 'AM270-BLK-10',
        product_name: 'Air Max 270',
        mfn_sku: 'AM270-BLK-10',
        case_quantity: 12,
        upc_gtin: '885176983624',
        epic_purchase_cost: {
          value: 89.99,
          currency: 'USD',
        },
        retail_price: {
          value: 89.99,
          currency: 'USD',
        },
        contracted_sell_price: {
          value: 89.99,
          currency: 'USD',
        },
        asin: 'B07D9FXZ8T',
        lead_time: {
          value: 14,
          unit: 'days',
        },
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
        marketplace: {
          amazon: {
            india: {
              status: 'draft',
            },
            kenya: {
              status: 'draft',
            },
            kena: {
              status: 'draft',
            },
          },
          wallmart: {
            india: {
              status: 'draft',
            },
            kenya: {
              status: 'draft',
            },
          },
          flipkart: {
            india: {
              status: 'draft',
            },
            kenya: {
              status: 'draft',
            },
          },
        },
      },
      {
        sku_id: 'AM270-BLK-11',
        product_name: 'Air Max 270',
        mfn_sku: 'AM270-BLK-10',
        case_quantity: 12,
        upc_gtin: '885176983624',
        epic_purchase_cost: {
          value: 89.99,
          currency: 'USD',
        },
        retail_price: {
          value: 89.99,
          currency: 'USD',
        },
        contracted_sell_price: {
          value: 89.99,
          currency: 'USD',
        },
        asin: 'B07D9FXZ8T',
        lead_time: {
          value: 14,
          unit: 'days',
        },
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
        marketplace: {
          amazon: {
            india: {
              status: 'draft',
            },
            kenya: {
              status: 'draft',
            },
          },
          wallmart: {
            india: {
              status: 'draft',
            },
            kenya: {
              status: 'draft',
            },
          },
          swiggy: {
            india: {
              status: 'draft',
            },
            kenya: {
              status: 'draft',
            },
            kena: {
              status: 'draft',
            },
          },
        },
      },
    ],
  };