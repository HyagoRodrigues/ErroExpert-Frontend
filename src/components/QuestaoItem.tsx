import { Tag, Calendar, AlertCircle, BookOpen } from 'lucide-react';

export function QuestaoItem({ q }: { q: any }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 transition-colors">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md"><Tag size={10} className="text-blue-500" /> {q.banca}</span>
          <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md"><Calendar size={10} /> {new Date(q.created_at).toLocaleDateString('pt-BR')}</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-medium">{q.enunciado}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-50">
          <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100">
            <p className="text-[9px] font-black text-amber-700 uppercase mb-1 flex items-center gap-1"><AlertCircle size={10}/> Causa</p>
            <p className="text-xs text-slate-700 italic">"{q.causa_erro}"</p>
          </div>
          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            <p className="text-[9px] font-black text-blue-700 uppercase mb-1 flex items-center gap-1"><BookOpen size={10}/> Anki</p>
            <p className="text-xs text-slate-700 truncate">{q.flashcard_anki}</p>
          </div>
        </div>
      </div>
    </div>
  );
}