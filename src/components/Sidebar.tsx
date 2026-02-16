'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { ChevronRight, ChevronDown, Folder, FileText, Database, Loader2 } from 'lucide-react';

export function Sidebar({ onSelect }: { onSelect: (d: string, a: string) => void }) {
  const [menu, setMenu] = useState<Record<string, string[]>>({});
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMenu()
      .then(setMenu)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <aside className="w-72 border-r border-slate-200 bg-slate-50 h-screen overflow-y-auto flex flex-col shrink-0">
      {/* Header da Sidebar - Corrigindo o "Base de Erros" */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <Database size={18} />
          </div>
          <span className="text-sm font-black text-slate-900 uppercase tracking-tighter">
            Base de Erros
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="animate-spin text-slate-300" size={20} />
          </div>
        ) : (
          Object.entries(menu).map(([disciplina, assuntos]) => (
            <div key={disciplina} className="space-y-1">
              <button
                onClick={() => toggleFolder(disciplina)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors group"
              >
                <div className="text-slate-400 group-hover:text-slate-600">
                  {openFolders[disciplina] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
                <Folder size={16} className="text-blue-500/60" />
                <span className="truncate">{disciplina}</span>
              </button>

              {openFolders[disciplina] && (
                <div className="ml-4 pl-4 border-l border-slate-200 space-y-1 mt-1">
                  {assuntos.map(assunto => (
                    <button
                      key={assunto}
                      onClick={() => onSelect(disciplina, assunto)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all text-left"
                    >
                      <FileText size={14} className="opacity-40" />
                      <span className="truncate">{assunto}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </nav>
    </aside>
  );
}