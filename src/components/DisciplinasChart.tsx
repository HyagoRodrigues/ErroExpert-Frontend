'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function DisciplinasChart({ data }: { data: any[] }) {
  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[320px]">
      <h3 className="text-[11px] font-bold text-slate-500 uppercase mb-6 tracking-widest">Erros por Disciplina</h3>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} margin={{ left: 20, right: 30 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={150} // Largura aumentada agora que temos mais espaço horizontal
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              className="font-semibold fill-slate-500"
            />
            <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '11px' }} />
            <Bar dataKey="erros" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}