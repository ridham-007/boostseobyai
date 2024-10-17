import React from 'react';
import Navbar from '@/components/navbar';

export default function Header() {
  return (
    <header key={Math.random()} className={`flex h-[60px] w-full `}>
      <Navbar />
    </header>
  );
}
