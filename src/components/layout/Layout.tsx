
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  // Check if current path is login, register, or forgot-password
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className={`flex-grow ${isAuthPage ? 'bg-gradient-to-b from-background to-muted/30' : ''}`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
