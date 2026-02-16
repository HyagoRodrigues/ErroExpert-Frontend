export function CausasList({ data }: { data: any[] }) {
  const total = data?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Causas Frequentes</h3>
      <div className="space-y-4">
        {data?.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-slate-700">{item.name}</span>
              <span className="text-[10px] font-black text-slate-400">{item.value} erros</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                style={{ width: `${(item.value / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}