import Popup from '@/components/modal';
import Image from 'next/image';
import React from 'react';
import CheckMark from '@/assets/gifs/check-mark.gif';
import { Button } from '@/components/button';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveMainStep,
  setShowSuccessOnbordingModal,
} from '@/store/features/stepper/stepperSlice';
import { RootState } from '@/store';

const OnboardingSuccessModal: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const showSuccessOnbordingModal = useSelector(
    (state: RootState) => state.stepper.showSuccessOnbordingModal
  );
  const handleClose = () => {
    dispatch(setShowSuccessOnbordingModal(false));
    router.push('/products');
    dispatch(setActiveMainStep(0));
    dispatch(setActiveMainStep(0));
  };
  return (
    <Popup
      status={showSuccessOnbordingModal}
      onClose={() => dispatch(setShowSuccessOnbordingModal(false))}
    >
      <div className="flex flex-col items-center space-y-4 px-6">
        {/* Success Icon */}
        <Image alt="check-mark" src={CheckMark} height={64} width={64} />
        <p className="text-2xl font-semibold">Onboarded Successfully!</p>
        <p className="text-center text-gray-600 text-base leading-6 my-3">
          The Epic team will now take care of it from here and make sure your
          products are listed in online marketplaces.
        </p>
        {/* Button */}
        <Button
          variant="solid"
          customColor="#2877EE"
          customStyle={{ width: '250px' }}
          onClick={handleClose}
        >
          Thats Great!
        </Button>
      </div>
    </Popup>
  );
};

export default OnboardingSuccessModal;
