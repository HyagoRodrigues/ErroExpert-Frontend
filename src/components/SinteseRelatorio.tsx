'use client';
import { Target, BarChart2, Zap, Activity, PieChart, Info } from 'lucide-react';
import { DisciplinasChart } from './DisciplinasChart';
import { CausasList } from './CausasList';

export function SinteseRelatorio({ data }: any) {
  if (!data) return (
    <div className="p-12 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 gap-4">
      <Info size={32} className="opacity-20" />
      <p className="text-xs font-bold uppercase tracking-widest text-center">
        Sua base de erros está vazia.<br/>Cadastre questões para gerar o diagnóstico.
      </p>
    </div>
  );

  const maxErros = Math.max(...(data.top_lacunas?.map((l: any) => l.erros) || [1]), 1);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* 1. RESUMO TÉCNICO E MISSÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between min-h-[280px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Activity size={18} />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Resumo de Desempenho</h3>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              {data.sintese}
            </p>
          </div>

          <div className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white flex items-center gap-5 shadow-xl group">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform">
              <Target size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Missão de Microlearning ⚡ 10 min</p>
              <p className="text-sm font-bold leading-tight">{data.sugestao_imediata}</p>
            </div>
          </div>
        </div>

        {/* INDICADOR DE VOLUME */}
        <div className="lg:col-span-4 bg-blue-600 p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center">
          <PieChart size={40} className="mb-4 opacity-40" />
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60">Total de Falhas</h4>
          <p className="text-5xl font-black mt-2">{data.grafico_disciplinas?.reduce((a:any,b:any)=>a+b.erros,0) || 0}</p>
          <p className="text-[10px] mt-4 opacity-70 font-bold uppercase tracking-widest">Mapeadas no Caderno</p>
        </div>
      </div>

      {/* 2. GRÁFICOS (DETERMINÍSTICOS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[350px]">
        <div className="h-full min-h-[320px]">
          <DisciplinasChart data={data.grafico_disciplinas || []} />
        </div>
        <div className="h-full min-h-[320px]">
          <CausasList data={data.grafico_causas || []} />
        </div>
      </div>

      {/* 3. LISTAGEM DE GARGALOS */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-8 text-slate-400">
          <BarChart2 size={16} />
          <h3 className="text-[10px] font-black uppercase tracking-widest">Ranking de Subtópicos Críticos</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.top_lacunas.map((item: any, index: number) => (
            <div key={index} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2 truncate">{item.assunto}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-slate-700">{item.erros} <span className="text-xs font-normal text-slate-400 uppercase">erros</span></span>
                <div 
                  className="h-1.5 w-8 rounded-full bg-blue-500" 
                  style={{ opacity: (item.erros / maxErros) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}