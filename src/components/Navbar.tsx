'use client';

import { BookOpen, FileText, Brain, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Não mostra a Navbar na tela de login
  if (pathname === '/login') return null;

  const isAnalisar = pathname === '/';
  const isCaderno = pathname.startsWith('/caderno');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-screen-2xl px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">ErrorExpert</h1>
          </div>
          
          {/* Menu Central e Botão Sair */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => router.push('/')}
                className={`flex items-center gap-2 rounded-md px-4 py-2 transition-all ${
                  isAnalisar
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Analisar Questão</span>
              </button>
              <button
                onClick={() => router.push('/caderno')}
                className={`flex items-center gap-2 rounded-md px-4 py-2 transition-all ${
                  isCaderno
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Meu Caderno</span>
              </button>
            </div>

            {/* Divisor Visual */}
            <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

            {/* Botão Sair */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-red-500 hover:bg-red-50 transition-all active:scale-95"
              title="Sair do sistema"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}