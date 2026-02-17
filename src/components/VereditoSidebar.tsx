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
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Veredito da Questão</h2>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Banca Examinadora</label>
          <select 
            value={formData.banca}
            onChange={(e) => handleFieldChange('banca', e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {bancas.map((banca) => (
              <option key={banca} value={banca === 'Selecione a banca' ? '' : banca}>
                {banca}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tipo de Questão</label>
          <div className="grid grid-cols-2 gap-2">
            {['Múltipla Escolha', 'Certo ou Errado'].map((tipo) => (
              <button
                key={tipo}
                type="button"
                onClick={() => handleFieldChange('tipo_questao', tipo)}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  formData.tipo_questao === tipo 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-slate-800 text-slate-400 border-slate-700 border hover:bg-slate-700'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sua Resposta</label>
            {formData.tipo_questao === 'Múltipla Escolha' ? (
              <select 
                value={formData.opcao_marcada}
                onChange={(e) => handleFieldChange('opcao_marcada', e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
              >
                <option value="">-</option>
                {['A', 'B', 'C', 'D', 'E'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <select 
                value={formData.opcao_marcada}
                onChange={(e) => handleFieldChange('opcao_marcada', e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
              >
                <option value="">-</option>
                <option value="Certo">Certo</option>
                <option value="Errado">Errado</option>
              </select>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Gabarito Oficial</label>
            {formData.tipo_questao === 'Múltipla Escolha' ? (
              <select 
                value={formData.opcao_correta}
                onChange={(e) => handleFieldChange('opcao_correta', e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
              >
                <option value="">-</option>
                {['A', 'B', 'C', 'D', 'E'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <select 
                value={formData.opcao_correta}
                onChange={(e) => handleFieldChange('opcao_correta', e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
              >
                <option value="">-</option>
                <option value="Certo">Certo</option>
                <option value="Errado">Errado</option>
              </select>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">O que você pensou? (Opcional)</label>
          <textarea 
            value={formData.comentario}
            onChange={(e) => handleFieldChange('comentario', e.target.value)}
            placeholder="Descreva por que você marcou essa opção..."
            rows={4}
            className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

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
            {saving ? 'Salvando...' : 'Salvar no Caderno'}
          </button>
        )}
      </div>
    </div>
  );
}