'use client';

import { useState } from 'react';

interface LocalizationEntry {
  id: string;
  key: string;
  en: string;
  es: string;
  fr: string;
  de: string;
  ja: string;
  zh: string;
}

export default function LocalizationTable() {
  const [entries, setEntries] = useState<LocalizationEntry[]>([
    {
      id: '1',
      key: 'welcome.title',
      en: 'Welcome to our app',
      es: 'Bienvenido a nuestra aplicación',
      fr: 'Bienvenue dans notre application',
      de: 'Willkommen in unserer App',
      ja: '私たちのアプリへようこそ',
      zh: '欢迎使用我们的应用'
    },
    {
      id: '2',
      key: 'button.submit',
      en: 'Submit',
      es: 'Enviar',
      fr: 'Soumettre',
      de: 'Absenden',
      ja: '送信',
      zh: '提交'
    },
    {
      id: '3',
      key: 'error.validation',
      en: 'Please check your input',
      es: 'Por favor verifica tu entrada',
      fr: 'Veuillez vérifier votre saisie',
      de: 'Bitte überprüfen Sie Ihre Eingabe',
      ja: '入力内容を確認してください',
      zh: '请检查您的输入'
    },
    {
      id: '4',
      key: 'navigation.home',
      en: 'Home',
      es: 'Inicio',
      fr: 'Accueil',
      de: 'Startseite',
      ja: 'ホーム',
      zh: '首页'
    },
    {
      id: '5',
      key: 'form.email',
      en: 'Email Address',
      es: 'Dirección de correo',
      fr: 'Adresse e-mail',
      de: 'E-Mail-Adresse',
      ja: 'メールアドレス',
      zh: '电子邮件地址'
    }
  ]);

  const [editingCell, setEditingCell] = useState<{ entryId: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (entryId: string, field: string, currentValue: string) => {
    setEditingCell({ entryId, field });
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (!editingCell) return;
    
    setEntries(prev => prev.map(entry => 
      entry.id === editingCell.entryId 
        ? { ...entry, [editingCell.field]: editValue }
        : entry
    ));
    
    setEditingCell(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  return (
    <div className="h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Localization</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage translations across languages</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Entry
          </button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{entries.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Keys</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-semibold text-blue-700 dark:text-blue-400">{languages.length}</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Languages</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-semibold text-green-700 dark:text-green-400">{entries.length * languages.length}</div>
            <div className="text-sm text-green-600 dark:text-green-400">Total Translations</div>
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Translation Key
                  </th>
                  {languages.map(lang => (
                    <th key={lang.code} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {entries.map((entry) => (
                  <tr 
                    key={entry.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">
                      {editingCell?.entryId === entry.id && editingCell?.field === 'key' ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onBlur={handleSave}
                          className="w-full px-2 py-1 text-sm font-mono bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      ) : (
                        <div 
                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded px-2 py-1 -mx-2 -my-1"
                          onClick={() => handleEdit(entry.id, 'key', entry.key)}
                        >
                          {entry.key}
                        </div>
                      )}
                    </td>
                    {languages.map(lang => (
                      <td key={lang.code} className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs">
                        {editingCell?.entryId === entry.id && editingCell?.field === lang.code ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleSave}
                            className="w-full px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        ) : (
                          <div 
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded px-2 py-1 -mx-2 -my-1 truncate"
                            onClick={() => handleEdit(entry.id, lang.code, entry[lang.code as keyof LocalizationEntry] as string)}
                          >
                            {entry[lang.code as keyof LocalizationEntry] || (
                              <span className="text-gray-400 dark:text-gray-500 italic text-xs">Click to add translation</span>
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          className="p-1 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                          onClick={() => setEntries(prev => prev.filter(e => e.id !== entry.id))}
                        >
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
  );
}