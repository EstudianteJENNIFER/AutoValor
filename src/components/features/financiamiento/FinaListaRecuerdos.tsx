export default function FinaListaAcuerdos({ acuerdos, selected, setSelected }: any) {
  return (
    <div className="col-span-2 p-4 rounded-xl bg-white dark:bg-[#111]">
      <h2 className="mb-4 text-gray-600 dark:text-gray-300">
        Acuerdos Activos
      </h2>

      <div className="space-y-3">
        {acuerdos.map((a: any, i: number) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={`p-4 rounded-lg cursor-pointer ${
              selected === i
                ? "bg-cyan-400/10 border border-cyan-400"
                : "bg-gray-100 dark:bg-[#0f0f0f]"
            }`}
          >
            <p className="font-medium">{a.nombre}</p>
            <p className="text-sm text-gray-500">{a.vehiculo}</p>
            <p className="text-sm text-cyan-400">{a.monto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}