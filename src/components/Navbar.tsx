'use client';

import { BookOpen, FileText, Brain } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isAnalisar = pathname === '/';
  const isCaderno = pathname.startsWith('/caderno');

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-screen-2xl px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">ErrorExpert</h1>
          </div>
          
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
        </div>
      </div>
    </nav>
  );
}