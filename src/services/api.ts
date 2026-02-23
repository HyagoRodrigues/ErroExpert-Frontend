import { supabase } from '@/lib/supabase';

const API_BASE_URL = 'https://erroexpert-backend.onrender.com';

const getHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  return headers;
};

export const api = {
  
  analisar: async (payload: any) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE_URL}/analisar`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Erro na análise');
    return res.json();
  },

  
  salvar: async (payload: any) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE_URL}/salvar`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Erro ao salvar no banco.');
    return res.json();
  },

 
  getMenu: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE_URL}/caderno/menu`, { headers });
    return res.ok ? res.json() : [];
  },

  
  getDashboard: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE_URL}/caderno/estatisticas`, { headers });
    if (!res.ok) throw new Error('Erro ao carregar dashboard');
    return res.json();
  },

  
getQuestoes: async (disciplina?: string, assunto?: string, subtopico?: string) => {
  const headers = await getHeaders();
  const params = new URLSearchParams();
  if (disciplina) params.append('disciplina', disciplina);
  if (assunto) params.append('assunto', assunto);
  if (subtopico) params.append('subtopico', subtopico); // Novo filtro

  const res = await fetch(`${API_BASE_URL}/caderno/questoes?${params}`, { headers });
  if (!res.ok) throw new Error('Erro ao buscar questões');
  return res.json();
},

getSintese: async (disciplina?: string) => {
  const headers = await getHeaders();
  const params = new URLSearchParams();
  if (disciplina) params.append('disciplina', disciplina); // Filtro para o Mentor

  const res = await fetch(`${API_BASE_URL}/caderno/sintese?${params}`, { headers });
  if (!res.ok) throw new Error('Erro ao carregar síntese');
  return res.json();
}
};