'use client';

import { useState } from 'react';
import SideNav from './components/SideNav';
import Editor from './components/Editor';
import LocalizationTable from './components/LocalizationTable';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'editor' | 'localization'>('editor');

  return (
    <div className="flex h-screen">
      <SideNav currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="flex-1 ml-80">
        {currentPage === 'editor' && <Editor />}
        {currentPage === 'localization' && <LocalizationTable />}
      </main>
    </div>
  );
}
