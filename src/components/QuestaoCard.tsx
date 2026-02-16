'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Brain, AlertCircle, ExternalLink, Bookmark } from 'lucide-react';

export function QuestaoCard({ q }: { q: any }) {
  const [isOpen, setIsOpen] = useState(false);

  // Lógica para tratar o flashcard vindo do banco (Frente | Verso)
  const flashcardParts = q.flashcard_anki?.split('|') || ['', ''];
  const frente = flashcardParts[0]?.trim();
  const verso = flashcardParts[1]?.trim();

  return (
    <div className={`bg-white rounded-3xl border transition-all duration-300 ${
      isOpen ? 'border-blue-400 shadow-md' : 'border-slate-200 hover:border-slate-300 shadow-sm'
    }`}>
      {/* Cabeçalho Resumido */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600">
            {q.banca}
          </div>
          <span className="text-xs font-bold text-slate-500 truncate max-w-[300px]">
            {q.assunto}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-400">
            {new Date(q.created_at).toLocaleDateString('pt-BR')}
          </span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Conteúdo Expandido */}
      {isOpen && (
        <div className="px-8 pb-8 space-y-8 animate-in slide-in-from-top-2 duration-300">
          
          {/* Área do Enunciado */}
          <div className="space-y-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Enunciado da Questão</p>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {q.enunciado}
              </p>
            </div>
          </div>

          {/* Diagnóstico de Contraste */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-red-50/50 rounded-2xl border border-red-100">
              <div className="flex items-center gap-2 mb-3 text-red-700">
                <AlertCircle size={14} />
                <p className="text-[10px] font-black uppercase tracking-widest">Onde você escorregou</p>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {q.causa_erro}
              </p>
            </div>

            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-2 mb-3 text-emerald-700">
                <Brain size={14} />
                <p className="text-[10px] font-black uppercase tracking-widest">Conceito Chave</p>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {q.fundamentacao_tecnica}
              </p>
            </div>
          </div>

          {/* Seção Anki Flashcard - Design Escuro Identidade */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 shadow-sm">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter">Flashcard de Fixação</h3>
            </div>
            
            <div className="overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="border-b border-slate-800 p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Frente</p>
                <p className="text-sm leading-relaxed text-slate-100 font-medium">{frente}</p>
              </div>
              <div className="p-5 bg-slate-800/40">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Verso</p>
                <p className="text-sm leading-relaxed text-blue-300 font-bold">{verso}</p>
              </div>
            </div>
          </div>

          {/* Rodapé de Ações */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
              <Bookmark size={12} />
              Identificador: #{q.id.toString().slice(0, 5)}
            </div>
            <button className="flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest group">
              Revisar Tópico <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}