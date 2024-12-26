import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const generateProductUrls = (productData: any[]) => {
  const headers = [
    'SKU',
    'Product Name',
    'Market Place & Country',
    'Product URL',
  ];
  const rows: string[][] = [];

  productData.forEach((product) => {
    rows.push([
      product.sku_id,
      product.product_name,
      `${product.marketplace_platform}: ${product.marketplace_countries}`,
      '',
    ]);
  });

  // Generate and download Excel file
  const generateExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'products.xlsx');
  };

  generateExcel();
};

export default generateProductUrls;
