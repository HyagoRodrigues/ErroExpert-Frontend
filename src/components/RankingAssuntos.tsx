interface RankingProps {
  lacunas: Array<{ assunto: string; erros: number }>;
}

export function RankingAssuntos({ lacunas }: RankingProps) {
  const maxErros = Math.max(...lacunas.map(l => l.erros), 1);

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-full">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
        Top Lacunas Técnicas
      </h3>
      
      <div className="space-y-6">
        {lacunas.map((item, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-tight truncate max-w-[180px]">
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
  );
}