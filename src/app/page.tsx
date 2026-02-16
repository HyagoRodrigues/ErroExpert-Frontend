'use client';

import { useState, useEffect } from 'react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { api } from '@/services/api';
import { VereditoSidebar } from '@/components/VereditoSidebar';
import { CardResultado } from '@/components/CardResultado';

export default function ErroExpert() {
  const { analyze, loading, result, setResult } = useAnalysis();
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    enunciado: '', 
    banca: 'Selecione a banca', 
    tipo_questao: 'Múltipla Escolha', 
    opcao_marcada: '', 
    opcao_correta: '', 
    comentario: ''
  });

  useEffect(() => { setMounted(true); }, []);

  const handleAnalisar = async (e: any) => {
    if (e) e.preventDefault();
    if (!formData.enunciado || formData.banca === 'Selecione a banca') {
      alert("⚠️ Preencha o enunciado e selecione a banca!");
      return;
    }
    await analyze(formData);
  };

  const handleSalvar = async () => {
    if (!result) return;
    setSaving(true);
    try {
      const data = await api.salvar({ 
        dados_originais: formData, 
        analise: result 
      });
      alert("✅ " + data.mensagem);
      setResult(null);
      setFormData(prev => ({ 
        ...prev, 
        enunciado: '', 
        opcao_marcada: '', 
        opcao_correta: '', 
        comentario: '' 
      }));
    } catch (error) {
      alert("🚀 Erro ao salvar!");
    } finally {
      setSaving(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="mx-auto max-w-screen-2xl px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-600">
              Enunciado da questão
            </label>
            <textarea
              value={formData.enunciado}
              onChange={(e) => setFormData({...formData, enunciado: e.target.value})}
              placeholder="Cole aqui o texto completo da questão..."
              rows={12}
              className="w-full resize-none rounded-xl border-0 bg-white shadow-sm ring-1 ring-slate-200 px-6 py-4 text-sm leading-relaxed text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <CardResultado 
            result={result} 
            onSave={handleSalvar} 
            saving={saving}
            onCancel={() => setResult(null)} 
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
    </main>
  );
}