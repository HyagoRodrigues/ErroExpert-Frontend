'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Brain, Zap, Eye } from 'lucide-react';

export function QuestaoCard({ q }: { q: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Lógica de Extração de Flashcard
  let frente = '', verso = '';
  const flashData = q.flashcard_anki;
  if (flashData && typeof flashData === 'object') {
    frente = flashData.frente || '';
    verso = flashData.verso || '';
  } else if (typeof flashData === 'string') {
    try {
      const parsed = JSON.parse(flashData);
      frente = parsed.frente; verso = parsed.verso;
    } catch {
      const parts = flashData.split('|');
      frente = parts[0]?.trim() || ''; verso = parts[1]?.trim() || '';
    }
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setIsRevealed(false);
  };

  return (
    <div className={`bg-white rounded-3xl border transition-all duration-300 ${
      isOpen ? 'border-blue-400 shadow-md' : 'border-slate-200 hover:border-slate-300 shadow-sm'
    }`}>
      <button onClick={handleToggle} className="w-full p-5 flex items-center justify-between text-left">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Zap size={10} className="text-amber-500" />
            Active Recall
          </div>
          <span className="text-xs font-bold text-slate-500 truncate max-w-[400px]">
            {q.enunciado}
          </span>
        </div>
        <div className="text-slate-400">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 pt-0 space-y-6 animate-in slide-in-from-top-2">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed italic">
            "{q.enunciado}"
          </div>

          {!isRevealed ? (
            <button 
              onClick={() => setIsRevealed(true)}
              className="w-full py-8 border-2 border-dashed border-blue-200 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-blue-400 hover:bg-blue-50/50 transition-all"
            >
              <Eye size={20} className="text-blue-600 mb-1" />
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Revelar Análise e Flashcard</p>
            </button>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-red-50/50 rounded-2xl border border-red-100">
                  <p className="text-[9px] font-black text-red-600 uppercase mb-2 tracking-widest">Causa do Erro</p>
                  <p className="text-sm text-slate-600 font-medium">{q.causa_erro}</p>
                </div>
                <div className="p-5 bg-blue-600 rounded-2xl text-white shadow-lg">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-2">Fundamentação Técnica</p>
                  <p className="text-sm leading-relaxed">{q.fundamentacao_tecnica}</p>
                </div>
              </div>

              {/* FLASHCARD COM LABELS */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <Brain size={14} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Card para Revisão (Anki)</h4>
                </div>
                <div className="overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                  <div className="border-b border-slate-800 p-5">
                    <p className="text-[9px] font-black uppercase text-blue-500 mb-3 tracking-[0.2em]">Frente</p>
                    <p className="text-sm text-slate-100 font-medium leading-relaxed">{frente}</p>
                  </div>
                  <div className="p-5 bg-slate-800/30">
                    <p className="text-[9px] font-black uppercase text-emerald-500 mb-3 tracking-[0.2em]">Verso</p>
                    <p className="text-sm text-blue-200 font-bold leading-relaxed">{verso}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}