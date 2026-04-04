'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LandingPage from '@/components/landing/LandingPage';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Home');

  if (activeTab === 'Home') {
    return <LandingPage onEnter={() => setActiveTab('Overview')} onTabSelect={setActiveTab} />;
  }

  return <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} onGoHome={() => setActiveTab('Home')} />;
}
