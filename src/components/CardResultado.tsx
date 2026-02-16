'use client';

import { AlertTriangle, Book, Brain, CheckCircle2 } from 'lucide-react';

interface CardResultadoProps {
  result: any;
  onSave: () => void;
  onCancel: () => void;
  saving?: boolean;
}

export function CardResultado({ result, onSave, onCancel, saving }: CardResultadoProps) {
  if (!result) return null;

  // Lógica para tratar o flashcard vindo do backend
  const flashcardParts = result.flashcard_anki?.split('|') || ['', ''];
  const frente = flashcardParts[0]?.trim();
  const verso = flashcardParts[1]?.trim();

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Cabeçalho de Sucesso da Análise */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
           <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Análise Concluída</span>
        </div>
        <button 
          onClick={onCancel}
          className="text-xs text-slate-400 hover:text-red-500 transition-colors"
        >
          Descartar
        </button>
      </div>

      {/* Diagnóstico de Erro */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Diagnóstico de Erro</h3>
        </div>
        <div className="rounded-lg bg-amber-50 p-4 border border-amber-100/50">
          <p className="text-sm leading-relaxed text-slate-700 font-medium">
            {result.causa_erro}
          </p>
        </div>
      </div>

      {/* Fundamentação Técnica */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <Book className="h-4 w-4 text-blue-700" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Fundamentação Técnica</h3>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm leading-relaxed text-slate-700">
            {result.fundamentacao_tecnica}
          </p>
        </div>
      </div>

      {/* Anki Flashcard Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Flashcard para Fixação</h3>
        </div>
        <div className="overflow-hidden rounded-lg bg-slate-900 border border-slate-800 shadow-inner">
          <div className="border-b border-slate-800 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Frente</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-100">{frente}</p>
          </div>
          <div className="p-4 bg-slate-800/30">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Verso</p>
            <p className="mt-2 text-sm leading-relaxed text-blue-300 font-medium">{verso}</p>
          </div>
        </div>
      </div>
    </div>
  );
}