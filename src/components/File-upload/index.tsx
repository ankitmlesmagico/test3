import { RootState } from '@/store';
import { setError, setFileName } from '@/store/features/stepper/stepperSlice';
import React from 'react';
import { BsUpload } from 'react-icons/bs';
import { IoTrashOutline } from 'react-icons/io5';
import { RiFileExcel2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

type FileUploaderProps = {
  handleUploadExcelFile: (file: File) => void;
};

const FileUploader: React.FC<FileUploaderProps> = ({
  handleUploadExcelFile,
}) => {
  const { fileName, error } = useSelector((state: RootState) => state.stepper);
  const dispatch = useDispatch();
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setError(null)); // Reset error on every new upload attempt
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an Excel file
      // if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      //   setError('Please upload a valid Excel file (.xlsx or .xls).');
      //   return;
      // }
      // Check if file size is within the allowed limit (5 MB)
      // if (file.size > 5 * 1024 * 1024) {
      //   setError('File size exceeds 5 MB.');
      //   return;
      // }

      handleUploadExcelFile(file);
    }
  };

  const handleSelectImageClick = () => {
    document.getElementById('file-upload')?.click();
  };

  const handleDeleteFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    dispatch(setFileName(null));
  };

  return (
    <div
      className={`mt-4 flex items-center bg-blue-50 rounded-md cursor-pointer ${
        fileName ? 'bg-white' : 'bg-blue-50'
      }`}
      style={{ height: '62px' }} // Setting the height to 62px
      onClick={handleSelectImageClick}
    >
      <div className="flex-1">
        {fileName ? (
          <div className="flex items-center p-4 bg-blue-50 rounded-md h-[62px] mx-0">
            <div className="h-10 w-10 bg-white flex items-center justify-center rounded-md">
              <RiFileExcel2Line style={{ height: '24px', width: '24px' }} />
            </div>
            <div className="ml-3">
              <p className="text-[] font-lato text-xs font-semibold underline">
                Replace File
              </p>

              <p className="text-[#7E8794] font-lato text-[10px] font-normal mt-1">
                {fileName}
              </p>
            </div>
            <div className="ml-auto">
              <button
                onClick={(e) => handleDeleteFile(e)}
                className="ml-2 text-red-600"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <IoTrashOutline size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex gap-2 items-center">
              <BsUpload className="w-3 h-3" style={{ color: '#0168B4' }} />
              <p className="text-[#0168B4] font-lato text-xs font-semibold leading-none underline">
                Upload
              </p>
            </div>
            <p className="text-[#7E8794] font-lato text-[10px] font-normal mt-1">
              Maximum 5 MB. Upload .xlsx files.
            </p>
          </div>
        )}
        {error && (
          <p className="mt-1 text-red-600 font-lato text-xs font-normal leading-none">
            {error}
          </p>
        )}
      </div>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx, .xls, .csv"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FileUploader;
