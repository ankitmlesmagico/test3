'use client';
import { initializeAuth } from '@/store/features/auth/authslice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function AuthInitializer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  return null;
}
