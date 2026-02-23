'use client';

import { useState, useEffect, useMemo } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { api } from '@/services/api';
import { Loader2, BookOpen, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { SinteseRelatorio } from '@/components/SinteseRelatorio';
import { QuestaoCard } from '@/components/QuestaoCard';

export default function CadernoPage() {
  const [selecao, setSelecao] = useState<{ disciplina: string; assunto: string; subtopico: string } | null>(null);
  const [todasQuestoes, setTodasQuestoes] = useState<any[]>([]); // Base para o Dashboard
  const [questoesPasta, setQuestoesPasta] = useState<any[]>([]); // Questões para o Modo Estudo
  const [loading, setLoading] = useState(true);
  const [loadingPasta, setLoadingPasta] = useState(false);

  // 1. CARREGAMENTO INICIAL: Busca a base inteira para o Dashboard
  useEffect(() => {
    setLoading(true);
    api.getQuestoes()
      .then(setTodasQuestoes)
      .catch(err => console.error("Erro ao carregar base:", err))
      .finally(() => setLoading(false));
  }, []);

  // 2. MODO ESTUDO: Busca questões da pasta selecionada
  useEffect(() => {
    if (selecao) {
      setLoadingPasta(true);
      api.getQuestoes(selecao.disciplina, selecao.assunto, selecao.subtopico)
        .then(setQuestoesPasta)
        .catch(console.error)
        .finally(() => setLoadingPasta(false));
    }
  }, [selecao]);

  // 3. MOTOR DE DADOS LOCAL (Dashboard Gerado via Frontend)
  const dashboardData = useMemo(() => {
    if (todasQuestoes.length === 0) return null;

    const contagemAssuntos: Record<string, number> = {};
    const contagemDisciplinas: Record<string, number> = {};

    todasQuestoes.forEach((q: any) => {
      contagemAssuntos[q.assunto] = (contagemAssuntos[q.assunto] || 0) + 1;
      contagemDisciplinas[q.disciplina] = (contagemDisciplinas[q.disciplina] || 0) + 1;
    });

    const topLacunas = Object.entries(contagemAssuntos)
      .map(([assunto, erros]) => ({ assunto, erros }))
      .sort((a, b) => b.erros - a.erros)
      .slice(0, 3);

    return {
      sintese: `Você tem ${todasQuestoes.length} erros mapeados. Foco total em ${topLacunas[0]?.assunto || 'novas revisões'}.`,
      top_lacunas: topLacunas,
      sugestao_imediata: `Revisar teoria de ${topLacunas[0]?.assunto || 'temas pendentes'}.`,
      grafico_disciplinas: Object.entries(contagemDisciplinas).map(([name, erros]) => ({ name, erros })),
      grafico_causas: [] // Pode ser implementado mapeando q.causa_erro se disponível
    };
  }, [todasQuestoes]);

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar onSelect={(d, a, s) => setSelecao({ disciplina: d, assunto: a, subtopico: s })} />

      <main className="flex-1 overflow-y-auto bg-white/50">
        <div className="max-w-5xl mx-auto p-12">
          
          {/* VISÃO 1: DASHBOARD ESTRATÉGICO (Aparece quando selecao é null) */}
          {!selecao ? (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <div className="h-2 w-8 bg-blue-600 rounded-full" />
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <LayoutDashboard size={24} className="text-slate-400" />
                  Painel Geral de Desempenho
                </h1>
              </div>

              {loading ? (
                <div className="h-96 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <Loader2 className="animate-spin text-blue-500 mb-2" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Calculando métricas...</span>
                </div>
              ) : (
                <SinteseRelatorio data={dashboardData} questoesTotais={todasQuestoes} />
              )}
            </div>
          ) : (
            
            /* VISÃO 2: MODO ESTUDO FOCADO (Aparece quando uma pasta é selecionada) */
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div className="space-y-1">
                  <button 
                    onClick={() => setSelecao(null)}
                    className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:gap-3 transition-all mb-4"
                  >
                    <ArrowLeft size={12} /> Voltar ao Dashboard
                  </button>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {selecao.disciplina} / {selecao.assunto}
                  </p>
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <BookOpen size={24} className="text-blue-600" />
                    {selecao.subtopico}
                  </h2>
                </div>
                
                <div className="text-right">
                  <span className="text-xs font-black text-slate-400 uppercase">Volume</span>
                  <p className="text-2xl font-black text-slate-900">{questoesPasta.length}</p>
                </div>
              </div>

              {loadingPasta ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin text-blue-200" />
                </div>
              ) : (
                <div className="grid gap-6 pb-32">
                  {questoesPasta.length > 0 ? (
                    questoesPasta.map(q => <QuestaoCard key={q.id} q={q} />)
                  ) : (
                    <div className="p-20 border-2 border-dashed border-slate-100 rounded-[2.5rem] text-center">
                      <p className="text-sm text-slate-400 italic">Nenhum erro registrado neste subtópico.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}