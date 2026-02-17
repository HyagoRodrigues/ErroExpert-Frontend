'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErrorMsg(error.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : error.message);
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setErrorMsg('Erro inesperado no sistema.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight italic">ErrorExpert</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Faça login para continuar seus estudos</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm text-center border border-red-100 font-semibold animate-in fade-in zoom-in duration-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">E-mail</label>
            <input
              type="email"
              required
              className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">Senha</label>
            <input
              type="password"
              required
              className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all active:scale-95 shadow-lg"
          >
            {loading ? 'Validando crachá...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
}