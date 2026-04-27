export default function FinaHistorial({ text, monto, fail }: any) {
  return (
    <div
      className={`p-3 rounded-lg flex justify-between text-sm ${
        fail
          ? "bg-red-500/10 text-red-500"
          : "bg-gray-100 dark:bg-[#0f0f0f]"
      }`}
    >
      <span>{text}</span>
      <span>{monto}</span>
    </div>
  );
}