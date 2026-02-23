'use client';
import { AlertTriangle, Book, Brain, Loader2, CheckCircle2 } from 'lucide-react';

export function CardResultado({ result, onSave, onCancel, saving }: any) {
  if (!result) return null;

  const frente = result.flashcard_anki?.frente || '';
  const verso = result.flashcard_anki?.verso || '';

  return (
    <div className="space-y-6 rounded-[2.5rem] border border-slate-200 bg-white p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-2">
        <div className="flex items-center gap-2">
           <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Análise Concluída</span>
        </div>
        <div className="flex gap-3">
           <button onClick={onCancel} className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest px-2">Descartar</button>
           <button 
             onClick={onSave} 
             disabled={saving}
             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-200"
           >
             {saving ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
             {saving ? 'Salvando...' : 'Salvar no Caderno'}
           </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-4 w-4" />
            <h3 className="text-[10px] font-black uppercase tracking-widest">Causa do Erro</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 font-medium">{result.causa_erro}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Book className="h-4 w-4" />
            <h3 className="text-[10px] font-black uppercase tracking-widest">Fundamentação</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 font-medium">{result.fundamentacao_tecnica}</p>
        </div>
      </div>

      {/* FLASHCARD COM LABELS NO RESULTADO */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2 text-slate-800">
          <Brain className="h-4 w-4 text-blue-500" />
          <h3 className="text-[10px] font-black uppercase tracking-widest">Flashcard Gerado</h3>
        </div>
        <div className="rounded-[2rem] bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="border-b border-slate-800 p-6">
            <p className="text-[9px] font-black uppercase text-blue-500 mb-3 tracking-[0.2em]">Frente</p>
            <p className="text-sm text-slate-100 leading-relaxed">{frente}</p>
          </div>
          <div className="p-6 bg-slate-800/40">
            <p className="text-[9px] font-black uppercase text-emerald-500 mb-3 tracking-[0.2em]">Verso</p>
            <p className="text-sm text-blue-200 font-bold leading-relaxed">{verso}</p>
          </div>
        </div>
      </div>
    </div>
  );
}