import FinaHistorial from "./FinaHistorial";

export default function FinaDetalleContrato() {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-[#111]">

      <h2 className="mb-4 text-gray-600 dark:text-gray-300">
        Detalles del Contrato
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-gray-100 dark:bg-[#0f0f0f]">
          <p className="text-xs text-gray-500">Tasa interés</p>
          <p className="text-cyan-400 font-semibold">14.25%</p>
        </div>

        <div className="p-3 rounded-lg bg-gray-100 dark:bg-[#0f0f0f]">
          <p className="text-xs text-gray-500">Plazo</p>
          <p className="font-semibold">52 meses</p>
        </div>
      </div>

      {/* PROGRESO */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-cyan-400 h-2 rounded-full w-[22%]" />
        </div>
        <p className="text-xs mt-1">22% pagado</p>
      </div>

      {/* HISTORIAL */}
      <div className="space-y-2 mb-4">
        <FinaHistorial text="Pago Cuota 07" monto="$2,416" />
        <FinaHistorial text="Pago Cuota 06" monto="$2,416" />
        <FinaHistorial text="Cuota fallida" monto="$2,416" fail />
      </div>

      <button className="w-full p-3 rounded-lg bg-gray-200 dark:bg-[#1a1a1a]">
        Generar estado de cuenta
      </button>
    </div>
  );
}