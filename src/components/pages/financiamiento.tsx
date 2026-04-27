import { useState } from "react";
import FinaHeader from "../features/financiamiento/FinaHeader";
import FinaCard from "../features/financiamiento/FinaCard";
import FinaListaAcuerdos from "../features/financiamiento/FinaListaRecuerdos";
import FinaDetalleContrato from "../features/financiamiento/FinaDetalleContrato";

export default function Financiamiento() {
  const [selected, setSelected] = useState(0);

  const acuerdos = [
    { nombre: "Carlos Mendoza", vehiculo: "BMW M3 Competition (2023)", monto: "$85,000" },
    { nombre: "Lucía Ferrera", vehiculo: "Porsche Taycan 4S", monto: "$120,000" },
    { nombre: "Roberto Gómez", vehiculo: "Ford Mustang Mach-E", monto: "$62,000" },
    { nombre: "Elena Smith", vehiculo: "Audi RS6 Avant", monto: "$95,000" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900 dark:bg-[#0a0a0a] dark:text-white">

      <FinaHeader />

      {/* TITULO */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">
            Gestión de Financiamiento
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Monitorea créditos, tasas e historial de pagos
          </p>
        </div>

        <button className="bg-cyan-400 text-black px-4 py-2 rounded-lg">
          Nuevo Acuerdo
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <FinaCard title="Total por cobrar" value="$4,280,000" extra="+4.2%" />
        <FinaCard title="Contratos vigentes" value="1,245" extra="128 activos" />
        <FinaCard title="Cuentas vencidas" value="42" extra="8.5% mora" />
        <FinaCard title="Tasa interés media" value="11.8%" extra="AVG 12.5%" />
      </div>

      {/* CONTENIDO */}
      <div className="grid grid-cols-3 gap-6">
        <FinaListaAcuerdos
          acuerdos={acuerdos}
          selected={selected}
          setSelected={setSelected}
        />

        <FinaDetalleContrato />
      </div>
    </div>
  );
}