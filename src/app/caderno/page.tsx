'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { api } from '@/services/api';
import { Loader2, LayoutDashboard, BookOpen, Sparkles } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { SinteseRelatorio } from '@/components/SinteseRelatorio';
import { QuestaoCard } from '@/components/QuestaoCard';

export default function CadernoPage() {
  const [selecao, setSelecao] = useState<{ disciplina: string; assunto: string } | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [sintese, setSintese] = useState<any>(null);
  const [questoes, setQuestoes] = useState<any[]>([]);
  
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingSintese, setLoadingSintese] = useState(false);
  const [loadingQuestoes, setLoadingQuestoes] = useState(false);

  // 1. Carregamento Rápido (Estatísticas)
  useEffect(() => {
    api.getDashboard()
      .then(setStats)
      .finally(() => setLoadingStats(false));
  }, []);

  // 2. Carregamento em Segundo Plano (IA)
  // Só dispara se não houver uma seleção de assunto ativa, para priorizar a performance
  useEffect(() => {
    if (!selecao) {
      setLoadingSintese(true);
      api.getSintese()
        .then(setSintese)
        .catch(console.error)
        .finally(() => setLoadingSintese(false));
    }
  }, [selecao]);

  // 3. Carregamento de Questões (Quando seleciona na Sidebar)
  useEffect(() => {
    if (selecao) {
      setLoadingQuestoes(true);
      setQuestoes([]); 
      api.getQuestoes(selecao.disciplina, selecao.assunto)
        .then(setQuestoes)
        .catch(console.error)
        .finally(() => setLoadingQuestoes(false));
    }
  }, [selecao]);

  if (loadingStats) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50/30">
      <Sidebar onSelect={(d, a) => setSelecao({ disciplina: d, assunto: a })} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8 lg:p-12 space-y-10">
          
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Performance</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Relatório Estratégico</p>
            </div>
            <StatCard label="Erros Totais" value={stats?.total_erros} colorClass="text-blue-600" />
          </div>

          {/* Área da IA com seu próprio Loader */}
          {!selecao && (
            <div className="min-h-[200px]">
              {loadingSintese ? (
                <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 border-dashed flex flex-col items-center gap-4">
                  <Sparkles className="animate-pulse text-blue-400" size={24} />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">O Mentor está analisando seu padrão de erros...</p>
                </div>
              ) : (
                sintese && <SinteseRelatorio data={sintese} />
              )}
            </div>
          )}

          {/* Listagem de questões */}
          {selecao && (
            <div className="space-y-6 pt-10 border-t border-slate-200">
               <div className="flex justify-between items-center">
                 <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                   <BookOpen size={14} className="text-blue-500" />
                   {selecao.assunto}
                 </h2>
                 <button onClick={() => setSelecao(null)} className="text-[10px] font-bold text-slate-400 uppercase hover:text-blue-600">Voltar</button>
               </div>
               
               {loadingQuestoes ? (
                 <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-200" /></div>
               ) : (
                 <div className="grid gap-6 pb-32">
                   {questoes.map(q => <QuestaoCard key={q.id} q={q} />)}
                 </div>
               )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}