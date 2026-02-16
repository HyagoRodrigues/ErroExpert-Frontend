export function StatCard({ label, value, colorClass }: { label: string, value: any, colorClass: string }) {
  return (
    <div className="bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm min-w-[140px]">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-xl font-black ${colorClass} leading-tight`}>{value || 0}</p>
    </div>
  );
}