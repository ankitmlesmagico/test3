'use client';
import { RootState } from '@/store';
import {
  setActiveMainStep,
  setActiveSubStep,
} from '@/store/features/stepper/stepperSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Headings {
  id: number;
  title: string;
}
interface StepperProps {
  steps: Headings[];
  handleUploadSkuData: () => void;
  handleUpdateImagesSkuData: () => void;
  children?: React.ReactNode;
  handleUploadUrlData: any;
}
const ProgressStepper: React.FC<StepperProps> = ({
  steps,
  children,
  handleUploadSkuData,
  handleUpdateImagesSkuData,
  handleUploadUrlData,
}) => {
  const { urlCountData, activeMainStep, activeSubStep } = useSelector(
    (state: RootState) => state.stepper
  );
  const dispatch = useDispatch();
  const disableThirdStep =
    urlCountData.validUrlCount !== null &&
    activeMainStep == 2 &&
    urlCountData.validUrlCount !== urlCountData.totalUrlCount;
  const handleNext = () => {
    if (activeMainStep === 1 && activeSubStep < 2) {
      // If we're on step 1 and there are sub-steps, increment sub-step
      if (activeSubStep == 1) {
        handleUploadSkuData();
      } else {
        dispatch(setActiveSubStep(activeSubStep + 1));
      }
    } else if (activeSubStep == 2 && activeMainStep == 1) {
      handleUpdateImagesSkuData();
    } else if (activeMainStep == 2) {
      handleUploadUrlData();
    } else {
      // Otherwise, move to the next main step if possible
      if (activeMainStep < steps.length - 1) {
        dispatch(setActiveMainStep(activeMainStep + 1));
        // Reset sub-step when moving to a new main step
        dispatch(setActiveSubStep(0));
      }
    }
  };

  const handlePrevious = () => {
    if (activeMainStep === 1 && activeSubStep > 0) {
      // If we're on step 1 and there are sub-steps, decrement sub-step
      dispatch(setActiveSubStep(activeSubStep - 1));
    } else {
      // Otherwise, move to the previous main step if possible
      if (activeMainStep > 0) {
        dispatch(setActiveMainStep(activeMainStep - 1));

        // When moving back, set sub-step to the last sub-step of the previous step
        // In this case, it seems to be 2 for step 1
        dispatch(setActiveSubStep(activeMainStep === 2 ? 2 : 0));
      }
    }
  };
  return (
    <div className="w-full relative" style={{ height: 'calc(100vh - 48px)' }}>
      {' '}
      {/* Stepper */}
      <div className="flex items-center bg-white px-5 py-4">
        {steps.map((step, index) => (
          // <div key={step.id} className="flex items-center ">
          <React.Fragment key={index}>
            {/* Icon and Title Group */}
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center 
                  ${
                    index < activeMainStep
                      ? 'bg-[#35BB5F] text-white'
                      : index === activeMainStep
                        ? 'bg-[#0168B4] text-white'
                        : 'bg-white border-2 border-[#858D98] text-[#858D98]'
                  }`}
              >
                {index < activeMainStep ? (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-[14px] font-bold mb-1">
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={`ml-2  ${
                  index < activeMainStep
                    ? 'text-[#35BB5F]'
                    : index === activeMainStep
                      ? 'text-primary'
                      : 'text-gray-500'
                } font-semibold text-[13px]`}
              >
                {step.title}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-px">
                {/* <div className="mx-4 h-px w-40 sm:w-32 md:w-44 lg:w-40"> */}
                <div
                  className={`h-full ${
                    index < activeMainStep
                      ? 'bg-[#35BB5F]'
                      : index === activeMainStep
                        ? 'bg-[#0168B4]'
                        : 'bg-gray-300'
                  }`}
                />
              </div>
            )}
            {/* </div> */}
          </React.Fragment>
        ))}
      </div>
      {/* childer */}
      <div
        className="mx-0 overflow-y-auto"
        style={{ height: 'calc(100vh - 160px)', backgroundColor: '' }}
      >
        {children}
      </div>
      {/* Navigation Buttons */}
      <div className="absolute bottom-0 left-0 w-full flex justify-end items-center bg-white px-10 py-2.5 gap-4">
        {activeMainStep == 2 && urlCountData.totalUrlCount && (
          <p
            className={`text-[16px] mr-auto font-semibold text-[${disableThirdStep ? '#B4B6B8' : '#003D86'}]`}
          >
            {urlCountData.validUrlCount || 0}/{urlCountData.totalUrlCount}
            Product URLs Added
          </p>
        )}
        {activeMainStep !== 0 && (
          <button
            style={{
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              height: '30px',
              width: '136px',
              color: activeMainStep === 0 ? '#003D8680' : '#003D86',
              backgroundColor: activeMainStep === 0 ? '#0283CA1A' : '#0283CA1F',
              borderRadius: '6px',
              cursor: activeMainStep === 0 ? 'not-allowed' : 'pointer',
              opacity: activeMainStep === 0 ? 0.5 : 1,
            }}
            onClick={handlePrevious}
            disabled={activeMainStep === 0}
          >
            Previous
          </button>
        )}
        <button
          style={{
            fontSize: '13px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            height: '30px',
            width: '136px',
            color: activeMainStep === steps.length - 1 ? '#FFFFFF80' : '#fff',
            backgroundColor: disableThirdStep ? '#ccc' : '#0168B4',
            borderRadius: '6px',
            cursor:
              activeMainStep === steps.length - 1 ? 'not-allowed' : 'pointer',
            opacity: activeMainStep === steps.length - 1 ? 0.5 : 1,
          }}
          onClick={handleNext}
          disabled={disableThirdStep}
        >
          {activeMainStep == 0 ? 'Accept & Proceed' : 'Save & Next'}
        </button>
      </div>
    </div>
  );
};

export default ProgressStepper;
