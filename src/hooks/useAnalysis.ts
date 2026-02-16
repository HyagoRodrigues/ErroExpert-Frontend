import { useState } from 'react';
import { api } from '@/services/api';

export function useAnalysis() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyze = async (payload: any) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await api.analisar(payload);
      // O FastAPI retorna { "status": "sucesso", "data": {...} }
      setResult(data.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor Python.");
    } finally {
      setLoading(false);
    }
  };

  return { analyze, loading, result, setResult };
}