
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  // Check if current path is login or register, these pages have a simplified layout
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
