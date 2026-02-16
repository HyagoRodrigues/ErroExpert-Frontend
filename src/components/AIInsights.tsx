import { Sparkles, Zap } from 'lucide-react';

interface AIInsightsProps {
  data: {
    sintese: string;
    sugestao_imediata: string;
  };
}

export function AIInsights({ data }: AIInsightsProps) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 h-full">
      <div className="flex items-center gap-2 text-blue-600">
        <Sparkles size={18} />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Parecer do Mentor IA</h3>
      </div>
      
      <div className="space-y-6">
        <p className="text-base text-slate-700 leading-relaxed font-medium">
          {data.sintese}
        </p>

        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Zap size={16} />
          </div>
          <div>
            <p className="text-[9px] font-black text-blue-800 uppercase tracking-widest">Próxima Ação</p>
            <p className="text-xs text-slate-600 font-bold">{data.sugestao_imediata}</p>
          </div>
        </div>
      </div>
    </div>
  );
}