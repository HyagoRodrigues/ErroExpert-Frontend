import { Sparkles, Target, BarChart2 } from 'lucide-react';

interface SinteseProps {
  data: {
    sintese: string;
    top_lacunas: Array<{ assunto: string; erros: number }>;
    sugestao_imediata: string;
  };
}

export function SinteseRelatorio({ data }: SinteseProps) {
  const maxErros = Math.max(...(data.top_lacunas?.map(l => l.erros) || [1]), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
      {/* Bloco de Texto da IA */}
      <div className="lg:col-span-7 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Sparkles size={18} />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Parecer do Mentor</h3>
          </div>
          <p className="text-base text-slate-700 leading-relaxed font-medium italic">
            "{data.sintese}"
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
          <Target className="text-blue-600" size={18} />
          <div>
            <p className="text-[9px] font-black text-blue-800 uppercase tracking-widest">Foco do Dia</p>
            <p className="text-xs text-slate-600 font-bold">{data.sugestao_imediata}</p>
          </div>
        </div>
      </div>

      {/* Bloco de Ranking - Nomes curtos, sem poluição */}
      <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-8 text-slate-400">
          <BarChart2 size={16} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Top Lacunas</h3>
        </div>
        
        <div className="space-y-6">
          {data.top_lacunas?.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-slate-700 uppercase tracking-tight truncate max-w-[150px]">
                  {item.assunto}
                </span>
                <span className="text-[10px] font-bold text-slate-400">{item.erros} falhas</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-900 rounded-full transition-all duration-1000"
                  style={{ width: `${(item.erros / maxErros) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}