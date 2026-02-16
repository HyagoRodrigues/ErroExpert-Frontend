'use client';

import { CheckCircle2, Sparkles, BookmarkPlus, Loader2 } from 'lucide-react';

interface VereditoProps {
  loading: boolean;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: any) => void;
  onSave: () => void;
  hasAnalysis: boolean;
  saving?: boolean;
}

const bancas = [
  'Selecione a banca',
  'CESPE/CEBRASPE',
  'FCC',
  'FGV',
  'CESGRANRIO',
  'VUNESP',
  'IADES',
  'IBFC',
  'Outra',
];

export function VereditoSidebar({ 
  loading, 
  formData, 
  setFormData, 
  onSubmit, 
  onSave, 
  hasAnalysis,
  saving 
}: VereditoProps) {
  
  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 rounded-xl bg-slate-900 p-6 shadow-xl lg:sticky lg:top-8">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-slate-400" />
        <h2 className="text-base font-semibold text-white tracking-tight">Veredito do Aluno</h2>
      </div>

      <div className="space-y-5">
        {/* Banca */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Banca Examinadora</label>
          <select
            value={formData.banca}
            onChange={(e) => handleFieldChange('banca', e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            {bancas.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Tipo e Gabaritos */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Gabarito</label>
            <input
              type="text"
              placeholder="Ex: A"
              value={formData.opcao_correta}
              onChange={(e) => handleFieldChange('opcao_correta', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none uppercase"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Sua Opção</label>
            <input
              type="text"
              placeholder="Ex: B"
              value={formData.opcao_marcada}
              onChange={(e) => handleFieldChange('opcao_marcada', e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none uppercase"
            />
          </div>
        </div>

        {/* Comentário (Raciocínio no Figma) */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Meu Raciocínio</label>
          <textarea
            value={formData.comentario}
            onChange={(e) => handleFieldChange('comentario', e.target.value)}
            placeholder="Descreva por que você marcou essa opção..."
            rows={4}
            className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? 'Analisando...' : 'Analisar Erro'}
        </button>

        {hasAnalysis && (
          <button
            onClick={onSave}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookmarkPlus className="h-4 w-4" />}
            {saving ? 'Salvando...' : 'Fixar no Caderno'}
          </button>
        )}
      </div>
    </div>
  );
}