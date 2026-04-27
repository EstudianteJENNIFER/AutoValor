export default function FinaCard({ title, value, extra }: any) {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-[#111]">
      <div className="flex justify-between mb-2">
        <span className="text-gray-500 text-sm">{title}</span>
        <span className="text-cyan-400 text-xs">{extra}</span>
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}