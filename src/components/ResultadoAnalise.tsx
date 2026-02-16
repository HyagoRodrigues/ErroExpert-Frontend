import { CheckCircle2 } from 'lucide-react';

export function ResultadoAnalise({ result }: { result: any }) {
  if (!result) return null;

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border-4 border-blue-50 shadow-xl animate-in zoom-in-95 duration-500 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-2 w-8 bg-blue-600 rounded-full"></div>
        <h4 className="text-blue-600 font-black text-sm uppercase tracking-widest">Análise ErroExpert</h4>
      </div>
      <div className="space-y-6">
        <div>
          <h5 className="text-2xl font-black text-slate-900 leading-tight">{result.disciplina}</h5>
          <p className="text-blue-600 font-bold text-lg">{result.assunto}</p>
          <p className="text-slate-600 text-lg mt-3 leading-relaxed">{result.causa_erro}</p>
        </div>
        <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
          <p className="text-xs font-black text-blue-400 mb-2 tracking-widest uppercase">Anki Flashcard</p>
          <p className="text-lg italic text-slate-800 font-medium">"{result.flashcard_anki}"</p>
        </div>
      </div>
    </div>
  );
}