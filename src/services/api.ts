const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://erroexpert-backend.onrender.com';

export const api = {
  analisar: async (payload: any) => {
    const res = await fetch(`${API_BASE_URL}/analisar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Erro na análise');
    return res.json();
  },

  salvar: async (payload: any) => {
    const res = await fetch(`${API_BASE_URL}/salvar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Erro ao salvar');
    return res.json();
  },

  getMenu: async () => {
    const res = await fetch(`${API_BASE_URL}/caderno/menu`);
    if (!res.ok) throw new Error('Erro ao carregar menu');
    return res.json();
  },

  getQuestoes: async (disciplina: string, assunto: string) => {
    const res = await fetch(`${API_BASE_URL}/caderno/questoes?disciplina=${encodeURIComponent(disciplina)}&assunto=${encodeURIComponent(assunto)}`);
    if (!res.ok) throw new Error('Erro ao carregar questões');
    return res.json();
  },

  getDashboard: async () => {
    const res = await fetch(`${API_BASE_URL}/caderno/estatisticas`);
    if (!res.ok) throw new Error('Erro ao carregar estatísticas');
    return res.json();
  },

  getSintese: async () => {
  const res = await fetch(`${API_BASE_URL}/caderno/sintese`);
  if (!res.ok) throw new Error('Erro ao carregar síntese estratégica');
  return res.json();
},
};