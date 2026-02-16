'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a', '#dc2626'];

export function CausasChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-[1.2] min-w-0">
      <h3 className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-widest">Distribuição de Erros</h3>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="h-[180px] w-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda Lateral Estática - Nunca sobrepõe */}
        <div className="flex-1 space-y-3 w-full">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{entry.name}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}