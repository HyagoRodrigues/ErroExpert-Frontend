'use client';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { ChevronRight, ChevronDown, Folder, FileText, Loader2, BookOpen, AlertCircle } from 'lucide-react';

export function Sidebar({ onSelect }: { onSelect: (d: string, a: string, s: string) => void }) {
  const [menu, setMenu] = useState<Record<string, Record<string, string[]>>>({});
  const [openDisciplinas, setOpenDisciplinas] = useState<Record<string, boolean>>({});
  const [openAssuntos, setOpenAssuntos] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMenu().then(setMenu).finally(() => setLoading(false));
  }, []);

  return (
    <aside className="w-72 border-r border-slate-200 bg-slate-50 h-screen overflow-y-auto flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="bg-blue-600 p-1.5 rounded-lg text-white"><BookOpen size={16} /></div>
        <span className="text-sm font-black text-slate-800 uppercase tracking-widest">Base de Erros</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-500" /></div>
      ) : (
        <nav className="p-4 space-y-2">
          {Object.entries(menu).map(([disciplina, assuntos]) => (
            <div key={disciplina} className="space-y-1">
              <button
                onClick={() => setOpenDisciplinas(p => ({...p, [disciplina]: !p[disciplina]}))}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-black uppercase rounded-lg transition-all ${
                  openDisciplinas[disciplina] ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder size={14} className={openDisciplinas[disciplina] ? 'text-blue-600' : 'text-slate-400'} />
                  <span className="truncate">{disciplina}</span>
                </div>
                {/* Heatmap: Simula ponto de calor se houver muitos assuntos */}
                {Object.keys(assuntos).length > 2 && <div className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />}
              </button>

              {openDisciplinas[disciplina] && (
                <div className="ml-4 pl-2 border-l-2 border-slate-200 space-y-2">
                  {Object.entries(assuntos).map(([assunto, subtopicos]) => {
                    const key = `${disciplina}-${assunto}`;
                    return (
                      <div key={assunto}>
                        <button onClick={() => setOpenAssuntos(p => ({...p, [key]: !p[key]}))}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-800"
                        >
                          {openAssuntos[key] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                          <span className="truncate">{assunto}</span>
                        </button>
                        {openAssuntos[key] && (
                          <div className="ml-4 space-y-1">
                            {subtopicos.map(sub => (
                              <button key={sub} onClick={() => onSelect(disciplina, assunto, sub)}
                                className="w-full flex items-center gap-2 px-3 py-1 text-[11px] text-slate-400 hover:text-blue-600 hover:bg-white rounded-md transition-all text-left"
                              >
                                <FileText size={10} className="opacity-40" />
                                <span className="truncate">{sub}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </aside>
  );
}