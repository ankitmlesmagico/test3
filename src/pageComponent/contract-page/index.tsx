import ContractDropdown from '@/components/contract-accordian';
import ProductTable from '@/components/product-table';
import { GenerateTableData } from '@/components/tables-with-content';
import React, { useState } from 'react';
import contract from '@/pageComponent/contract-page/contract.json';
import contacts from '@/pageComponent/contract-page/contact.json';
const ContractPage = () => {
  const [openContract, setOpenContract] = useState(false);
  const [openContact, setOpenContact] = useState(true);
  const tableColumns = [
    { field: 'sku', headerName: '', minWidth: 100 },
    { field: 'full_name', headerName: 'Full Name', minWidth: 100 },
    { field: 'phone_number', headerName: 'Phone Number', minWidth: 100 },
    { field: 'email', headerName: 'Email Address', minWidth: 100 },
    { field: 'title', headerName: 'Title', minWidth: 100 },
  ];
  return (
    <div
      style={{
        marginTop: '16px',
        display: 'flex',
        gap: '16px',
        flexDirection: 'column',
      }}
    >
      <ContractDropdown
        title="Contract Document"
        isOpen={openContact}
        onOpenChange={() => {
          setOpenContact(!openContact);
          setOpenContract(openContact);
        }}
        linkText="Contract.pdf"
        pdfPath="/pdfs/dd12-13_0.pdf"
      >
        <div className="text-[#0B1B32] bg-white text-[14px] leading-5">
          <p className="mb-7 text-[20px] font-semibold">Summary</p>
          <p className="text-[14px] font-bold mb-1">US Market</p>
          <p>{contract.summary.usMarket}</p>
          <p className="text-[14px] font-bold mt-4 mb-2">Global Markets</p>
          <p>{contract.summary.globalMarkets}</p>
          <div className="mt-5"></div>
          <GenerateTableData />
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <React.Fragment key={index}>
                <p className="text-[14px] font-bold mt-4 mb-2">Wholesale:</p>
                <p className="mb-5">{contract.summary.wholesale}</p>
              </React.Fragment>
            ))}
        </div>
      </ContractDropdown>
      <ContractDropdown
        title="Contact Document"
        isOpen={openContract}
        onOpenChange={() => setOpenContract(!openContract)}
        linkText="Contact.pdf"
        pdfPath="/pdfs/dd12-13_0.pdf"
      >
        <div className="bg-white">
          <ProductTable
            columns={tableColumns}
            rowHeight="10px"
            data={contacts.contacts}
          />
        </div>
      </ContractDropdown>
    </div>
  );
};

export default ContractPage;
