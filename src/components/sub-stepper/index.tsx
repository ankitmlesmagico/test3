'use client';
import { RootState } from '@/store';
import { setActiveSubStep } from '@/store/features/stepper/stepperSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface SubStepperProps {
  stepArray: string[];
  children?: React.ReactNode;
  height?: string;
  backgroundColor?: string;
}

const SubStepper: React.FC<SubStepperProps> = ({
  stepArray,
  height = '100%',
  backgroundColor = '',
  children,
}) => {
  const dispatch = useDispatch();
  const { activeSubStep } = useSelector((state: RootState) => state.stepper);
  return (
    <div className=" rounded-lg mx-1" style={{ height: height }}>
      <div
        className="w-full flex gap-4 border-b"
        style={{ backgroundColor: backgroundColor }}
      >
        {stepArray.map((step, index) => (
          <button
            key={index}
            className={`h-11 px-4 py-2 font-lato text-sm font-semibold ${activeSubStep === index ? 'text-[#0168B4] border-b-2 border-[#0168B4]' : 'text-[#858D98] border-b-2 border-transparent'}`}
            onClick={() => dispatch(setActiveSubStep(index))}
          >
            {step}
          </button>
        ))}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default SubStepper;
