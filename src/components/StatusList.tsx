import { BarChart2 } from 'lucide-react';

export function StatusList({ data }: { data: any[] }) {
  const total = data?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-8 text-slate-400">
        <BarChart2 size={16} />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Ranking de Lacunas</h3>
      </div>
      
      <div className="space-y-6">
        {data?.length > 0 ? data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-600 truncate max-w-[200px]">
                {item.name}
              </span>
              <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded">
                {item.value} erros
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-700" 
                style={{ width: `${(item.value / total) * 100}%` }}
              />
            </div>
          </div>
        )) : (
          <p className="text-[10px] text-slate-400 uppercase font-bold text-center py-10">Sem dados para exibir</p>
        )}
      </div>
    </div>
  );
}