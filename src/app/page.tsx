'use client';
import { RootState } from '@/store';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Page() {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user?.email == 'brand@esmagico.in') {
    redirect('/onboarding');
  } else {
    redirect('/brands');
  }
}
