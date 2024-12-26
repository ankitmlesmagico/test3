'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginImage from '@/assets/images/loginImage.jpeg';
import epicLogo from '@/assets/images/epicLogo.png';
import { InputBox } from '@/components/inputBox';
import { Button } from '@/components/button';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/store';
import { login } from '@/store/features/auth/authslice';
import { isEmailValid } from '@/utils/emailValidater';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [loginDetail, setLoginDetails] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading, isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      if (user?.email == 'brand@esmagico.in') {
        router.push('/onboarding');
      } else {
        router.push('/brands');
      }
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    if (!isEmailValid(loginDetail.email)) {
      setEmailError('Email is invalid.');
      return;
    }
    setEmailError(null);
    try {
      await dispatch(login(loginDetail)).unwrap();
    } catch (err) {
      toast.error('credential is invalid');
    }
  };
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Section - Login Form */}
      <div className="flex-1 s md:w-[50%] items-start mt-8 ml-8 mb-2">
        <Image
          src={epicLogo}
          alt="EPIC Global Logo"
          width={32}
          height={52}
          className="mb-20"
        />
        <div className="flex flex-col justify-center w-full pl-12">
          <h1 className="text-[32px] text-gray-900 mb-8 font-bold">
            Welcome to EPIC GLOBAL
          </h1>
          <div className="w-[340px] flex flex-col gap-6 ">
            <InputBox
              label="Email"
              type="email"
              value={loginDetail.email}
              onChange={(e) =>
                setLoginDetails({ ...loginDetail, email: e.target.value })
              }
              errorMessage={emailError || ''}
              placeholder="Enter email ID"
              required={true}
            />
            <InputBox
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={loginDetail.password}
              onChange={(e) =>
                setLoginDetails({ ...loginDetail, password: e.target.value })
              }
              placeholder="Enter Password"
              required={true}
              onClickOfEndIcon={() => setShowPassword(!showPassword)}
              endIcon={
                showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )
              }
            />

            <Button
              variant="solid"
              customStyle={{
                width: '140px',
                color: '#fff',
                backgroundColor: '#043A87',
              }}
              isLoading={isLoading}
              disabled={
                loginDetail.email.trim() == '' ||
                loginDetail.password.trim() == ''
              }
              onClick={handleLogin}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-[780px] max-w-full lg:block flex-shrink-0 md:w-[50%] hidden pr-7 py-7">
        <Image
          src={LoginImage}
          alt="login-image"
          className="h-full rounded-2xl "
        />
      </div>
    </div>
  );
};

export default LoginPage;
