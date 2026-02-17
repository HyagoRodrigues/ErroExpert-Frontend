import { supabase } from '@/lib/supabase';

// URL do Backend no Render
const API_BASE_URL = 'https://erroexpert-backend.onrender.com';

/**
 * Função auxiliar para obter os cabeçalhos de autenticação atualizados.
 * Recupera o token JWT da sessão ativa do Supabase.
 */
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
    if (!res.ok) throw new Error('Erro ao salvar');
    return res.json();
  },

  getMenu: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE_URL}/caderno/menu`, {
      headers
    });
    if (!res.ok) throw new Error('Erro ao carregar menu');
    return res.json();
  },

  getQuestoes: async (disciplina: string, assunto: string) => {
    const headers = await getHeaders();
    const url = `${API_BASE_URL}/caderno/questoes?disciplina=${encodeURIComponent(disciplina)}&assunto=${encodeURIComponent(assunto)}`;
    const res = await fetch(url, {
      headers
    });
    if (!res.ok) throw new Error('Erro ao carregar questões');
    return res.json();
  },

  getDashboard: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE_URL}/caderno/estatisticas`, {
      headers
    });
    if (!res.ok) throw new Error('Erro ao carregar dashboard');
    return res.json();
  },

  getSintese: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE_URL}/caderno/sintese`, {
      headers
    });
    if (!res.ok) throw new Error('Erro ao carregar síntese');
    return res.json();
  },
};