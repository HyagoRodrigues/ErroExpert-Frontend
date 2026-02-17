'use client';

import { useState, useEffect } from 'react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { api } from '@/services/api';
import { VereditoSidebar } from '@/components/VereditoSidebar';
import { CardResultado } from '@/components/CardResultado';

const INITIAL_FORM_STATE = {
  enunciado: '', 
  banca: '', 
  tipo_questao: 'Múltipla Escolha', 
  opcao_marcada: '', 
  opcao_correta: '', 
  comentario: ''
};

export default function ErroExpert() {
  const { analyze, loading, result, setResult } = useAnalysis();
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => { setMounted(true); }, []);

  const handleAnalisar = async (e: any) => {
    if (e) e.preventDefault();
    if (!formData.enunciado || !formData.banca) {
      alert("⚠️ Preencha o enunciado e selecione a banca!");
      return;
    }
    await analyze(formData);
  };

  const handleSalvar = async () => {
    if (!result) return;
    setSaving(true);
    try {
      await api.salvar({ 
        dados_originais: formData, 
        analise: result 
      });
      alert("✅ Questão salva no seu caderno!");
      setResult(null);
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      console.error(error);
      alert("❌ Erro ao salvar questão.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData(INITIAL_FORM_STATE);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="max-w-[1400px] mx-auto px-6 pt-12">
        <header className="mb-12 space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-black text-xl italic">E</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Análise de Erro <span className="text-blue-600">Reversa</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium max-w-2xl">
            Transforme cada erro numa base de conhecimento técnica para nunca mais falhar no mesmo assunto.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">1</span>
                Enunciado da questão
              </label>
              <textarea
                value={formData.enunciado}
                onChange={(e) => setFormData({...formData, enunciado: e.target.value})}
                placeholder="Cole aqui o texto completo da questão para a IA analisar..."
                rows={12}
                className="w-full resize-none rounded-3xl border-0 bg-white shadow-sm ring-1 ring-slate-200 px-6 py-4 text-sm leading-relaxed text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <CardResultado 
              result={result} 
              onSave={handleSalvar} 
              saving={saving}
              onCancel={handleReset} 
            />
          </div>

          <div className="lg:col-span-4">
            <VereditoSidebar 
              loading={loading}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleAnalisar}
              onSave={handleSalvar}
              hasAnalysis={!!result}
              saving={saving}
            />
          </div>
        </div>
      </div>
    </main>
  );
}