'use client';

import { useState } from 'react';

interface LocalizationEntry {
  id: string;
  key: string;
  english: string;
  spanish: string;
  french: string;
  status: 'translated' | 'pending' | 'review';
}

export default function LocalizationTable() {
  const [entries, setEntries] = useState<LocalizationEntry[]>([
    {
      id: '1',
      key: 'welcome.title',
      english: 'Welcome to our app',
      spanish: 'Bienvenido a nuestra aplicación',
      french: 'Bienvenue dans notre application',
      status: 'translated'
    },
    {
      id: '2',
      key: 'button.submit',
      english: 'Submit',
      spanish: 'Enviar',
      french: '',
      status: 'pending'
    },
    {
      id: '3',
      key: 'error.validation',
      english: 'Please check your input',
      spanish: 'Por favor verifica tu entrada',
      french: 'Veuillez vérifier votre saisie',
      status: 'review'
    },
    {
      id: '4',
      key: 'navigation.home',
      english: 'Home',
      spanish: 'Inicio',
      french: 'Accueil',
      status: 'translated'
    },
    {
      id: '5',
      key: 'form.email',
      english: 'Email Address',
      spanish: 'Dirección de correo',
      french: '',
      status: 'pending'
    }
  ]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'translated': 
        return 'bg-emerald-100/60 text-emerald-700 border-emerald-200/50';
      case 'pending': 
        return 'bg-amber-100/60 text-amber-700 border-amber-200/50';
      case 'review': 
        return 'bg-blue-100/60 text-blue-700 border-blue-200/50';
      default: 
        return 'bg-stone-100/60 text-stone-700 border-stone-200/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 p-6">
      <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-light text-stone-800 mb-2">Localization</h2>
              <p className="text-stone-600 text-sm">Manage translations across languages</p>
            </div>
            <button className="px-6 py-3 bg-stone-800/90 text-stone-50 rounded-2xl hover:bg-stone-700 transition-all duration-300 backdrop-blur-sm border border-stone-700/50 shadow-lg hover:shadow-xl flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Entry
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="px-8 py-6 border-b border-white/10">
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
              <div className="text-2xl font-light text-stone-800">5</div>
              <div className="text-xs text-stone-600 mt-1">Total Keys</div>
            </div>
            <div className="bg-emerald-100/40 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200/30">
              <div className="text-2xl font-light text-emerald-700">2</div>
              <div className="text-xs text-emerald-600 mt-1">Translated</div>
            </div>
            <div className="bg-amber-100/40 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/30">
              <div className="text-2xl font-light text-amber-700">2</div>
              <div className="text-xs text-amber-600 mt-1">Pending</div>
            </div>
            <div className="bg-blue-100/40 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/30">
              <div className="text-2xl font-light text-blue-700">1</div>
              <div className="text-xs text-blue-600 mt-1">In Review</div>
            </div>
          </div>
        </div>
        
        {/* Table */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="px-6 py-4 text-left text-xs font-medium text-stone-600 uppercase tracking-wider bg-white/30">
                      Translation Key
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-stone-600 uppercase tracking-wider bg-white/30">
                      English
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-stone-600 uppercase tracking-wider bg-white/30">
                      Spanish
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-stone-600 uppercase tracking-wider bg-white/30">
                      French
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-stone-600 uppercase tracking-wider bg-white/30">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-stone-600 uppercase tracking-wider bg-white/30">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr 
                      key={entry.id} 
                      className={`border-b border-white/10 hover:bg-white/30 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-white/20' : 'bg-white/10'
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-mono text-stone-800">
                        {entry.key}
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-800 max-w-xs">
                        <div className="truncate">{entry.english}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-800 max-w-xs">
                        {entry.spanish ? (
                          <div className="truncate">{entry.spanish}</div>
                        ) : (
                          <span className="text-stone-500 italic text-xs">Not translated</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-800 max-w-xs">
                        {entry.french ? (
                          <div className="truncate">{entry.french}</div>
                        ) : (
                          <span className="text-stone-500 italic text-xs">Not translated</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-xl border backdrop-blur-sm ${getStatusStyle(entry.status)}`}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-stone-600 hover:text-stone-800 hover:bg-white/50 rounded-xl transition-all duration-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 text-stone-600 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all duration-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}