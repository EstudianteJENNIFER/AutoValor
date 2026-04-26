import { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  Plus,
  AlertTriangle,
  TrendingUp,
  FileText,
} from "lucide-react";

export default function Financiamiento() {
  const [selected, setSelected] = useState(0);

  const acuerdos = [
    {
      nombre: "Carlos Mendoza",
      vehiculo: "BMW M3 Competition (2023)",
      monto: "$85,000",
    },
    {
      nombre: "Lucía Ferrera",
      vehiculo: "Porsche Taycan 4S",
      monto: "$120,000",
    },
    {
      nombre: "Roberto Gómez",
      vehiculo: "Ford Mustang Mach-E",
      monto: "$62,000",
    },
    {
      nombre: "Elena Smith",
      vehiculo: "Audi RS6 Avant",
      monto: "$95,000",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 bg-[#111] px-4 py-2 rounded-xl w-[400px]">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Buscar acuerdos, VINs o clientes..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <Bell className="text-gray-400" />
          <Settings className="text-gray-400" />
        </div>
      </div>

      {/* TITULO */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">
            Gestión de Financiamiento
          </h1>
          <p className="text-gray-400 text-sm">
            Monitorea créditos, tasas e historial de pagos
          </p>
        </div>

        <button className="bg-[#00E5FF] text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-80 transition">
          <Plus size={16} />
          Nuevo Acuerdo
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card
          title="Total por cobrar"
          value="$4,280,000"
          extra="+4.2%"
          icon={<FileText />}
        />
        <Card
          title="Contratos vigentes"
          value="1,245"
          extra="128 activos"
          icon={<FileText />}
        />
        <Card
          title="Cuentas vencidas"
          value="42"
          extra="8.5% mora"
          icon={<AlertTriangle />}
        />
        <Card
          title="Tasa interés media"
          value="11.8%"
          extra="AVG 12.5%"
          icon={<TrendingUp />}
        />
      </div>

      {/* CONTENIDO */}
      <div className="grid grid-cols-3 gap-6">
        {/* LISTA */}
        <div className="col-span-2 bg-[#111] rounded-xl p-4">
          <h2 className="mb-4 text-gray-300">Acuerdos Activos</h2>

          <div className="space-y-3">
            {acuerdos.map((a, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`p-4 rounded-lg cursor-pointer transition ${
                  selected === i
                    ? "bg-[#00E5FF]/10 border border-[#00E5FF]"
                    : "bg-[#0f0f0f] hover:bg-[#1a1a1a]"
                }`}
              >
                <p className="font-medium">{a.nombre}</p>
                <p className="text-sm text-gray-400">{a.vehiculo}</p>
                <p className="text-sm text-[#00E5FF] mt-1">{a.monto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DETALLE */}
        <div className="bg-[#111] rounded-xl p-4">
          <h2 className="mb-4 text-gray-300">Detalles del Contrato</h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#0f0f0f] p-3 rounded-lg">
              <p className="text-xs text-gray-400">Tasa interés</p>
              <p className="text-[#00E5FF] font-semibold">
                14.25% anual
              </p>
            </div>

            <div className="bg-[#0f0f0f] p-3 rounded-lg">
              <p className="text-xs text-gray-400">Plazo restante</p>
              <p className="font-semibold">52 meses</p>
            </div>
          </div>

          {/* PROGRESO */}
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-1">
              Progreso del pago
            </p>
            <div className="w-full bg-[#222] rounded-full h-2">
              <div
                className="bg-[#00E5FF] h-2 rounded-full"
                style={{ width: "22%" }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              22.4% pagado
            </p>
          </div>

          {/* HISTORIAL */}
          <div className="space-y-2 mb-4">
            <Historial text="Pago Cuota 07" monto="$2,416.00" ok />
            <Historial text="Pago Cuota 06" monto="$2,416.00" ok />
            <Historial text="Cuota 08 - FALLIDA" monto="$2,416.00" fail />
          </div>

          <button className="w-full bg-[#1a1a1a] hover:bg-[#222] transition p-3 rounded-lg text-sm">
            Generar estado de cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 COMPONENTES */

function Card({ title, value, extra, icon }: any) {
  return (
    <div className="bg-[#111] p-4 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className="text-[#00E5FF] text-xs">{extra}</span>
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

function Historial({ text, monto, ok, fail }: any) {
  return (
    <div
      className={`p-3 rounded-lg flex justify-between text-sm ${
        fail
          ? "bg-red-500/10 text-red-400"
          : "bg-[#0f0f0f] text-gray-300"
      }`}
    >
      <span>{text}</span>
      <span>{monto}</span>
    </div>
  );
}