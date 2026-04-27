import { ChevronRight, MoreVertical } from 'lucide-react';
import type { Vehiculo } from '../../../hook/datosInventario';

interface TarjetaVehiculoProps {
  vehiculo: Vehiculo;
}

export function TarjetaVehiculo({ vehiculo }: TarjetaVehiculoProps) {
  const estadoConfig = {
    available: {
      label: 'Disponible',
      estilo: 'bg-teal-500/20 text-teal-600 border-teal-500/30 dark:text-teal-400',
      punto: 'bg-teal-500',
    },
    reserved: {
      label: 'Separado',
      estilo: 'bg-amber-500/20 text-amber-600 border-amber-500/30 dark:text-amber-400',
      punto: 'bg-amber-500',
    },
    sold: {
      label: 'Vendido',
      estilo: 'bg-gray-200 text-gray-600 border-gray-300 dark:bg-zinc-700/50 dark:text-zinc-300 dark:border-zinc-600/50',
      punto: 'bg-gray-400 dark:bg-zinc-400',
    },
  }[vehiculo.estado];

  const estaVendido = vehiculo.estado === 'sold';

  return (
    <div className="
      rounded-xl overflow-hidden group transition-all
      bg-white border border-gray-200
      dark:bg-zinc-900 dark:border-zinc-800
      hover:border-teal-500/30
    ">

      {/* IMAGEN */}
      <div className={`relative h-40 overflow-hidden ${estaVendido ? 'grayscale opacity-70' : ''}`}>
        <img
          alt={`${vehiculo.nombre} ${vehiculo.año}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={vehiculo.imagen || 'https://via.placeholder.com/400x200?text=Vehículo'}
        />

        <div className="absolute top-3 right-3">
          <span className={`${estadoConfig.estilo} backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1 border uppercase`}>
            <span className={`w-1 h-1 rounded-full ${estadoConfig.punto}`} />
            {estadoConfig.label}
          </span>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="p-4">

        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className={`text-base font-semibold ${
              estaVendido
                ? "text-gray-400 dark:text-zinc-400"
                : "text-gray-900 dark:text-zinc-100"
            }`}>
              {vehiculo.nombre}
            </h3>

            <p className={`text-xs ${
              estaVendido
                ? "text-gray-400 dark:text-zinc-600"
                : "text-gray-500 dark:text-zinc-500"
            }`}>
              {vehiculo.modelo} • {vehiculo.año} • {vehiculo.version}
            </p>
          </div>

          <button className={`transition-colors ${
            estaVendido
              ? "text-gray-400 dark:text-zinc-600"
              : "text-gray-500 hover:text-teal-600 dark:text-zinc-500 dark:hover:text-teal-400"
          }`}>
            <MoreVertical size={16} />
          </button>
        </div>

        {/* PRECIOS */}
        <div className="grid grid-cols-2 gap-3 mt-4 py-3 border-y
          border-gray-200 dark:border-zinc-800/50">

          <div>
            <p className="text-[10px] text-gray-500 dark:text-zinc-500 mb-0.5">
              PRECIO USD
            </p>
            <p className={`text-base font-semibold ${
              estaVendido
                ? "text-gray-400 dark:text-zinc-500"
                : "text-gray-900 dark:text-zinc-200"
            }`}>
              $ {vehiculo.precioUSD.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-gray-500 dark:text-zinc-500 mb-0.5">
              PRECIO PEN
            </p>
            <p className={`text-sm ${
              estaVendido
                ? "text-gray-400 dark:text-zinc-600"
                : "text-gray-600 dark:text-zinc-400"
            }`}>
              S/ {vehiculo.precioPEN.toLocaleString()}
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">

            <span className={`text-xs ${
              estaVendido
                ? "text-gray-400 dark:text-zinc-600"
                : "text-gray-500 dark:text-zinc-500"
            }`}>
              ID Stock: #V-{vehiculo.id.padStart(4, '0')}
            </span>

            <span className={`text-[10px] font-bold mt-0.5 ${
              estaVendido
                ? "text-gray-400 dark:text-zinc-500"
                : "text-teal-600 dark:text-teal-500/80"
            }`}>
              Stock: {vehiculo.stock} {vehiculo.stock === 1 ? 'unidad' : 'unidades'}
            </span>

            {vehiculo.estado === 'reserved' && (
              <span className="text-[9px] text-amber-500 mt-0.5 italic">
                Reserva expira en 2h
              </span>
            )}

            {vehiculo.estado === 'sold' && (
              <span className="text-[9px] text-gray-400 dark:text-zinc-500 italic mt-0.5">
                Entregado el 12/05
              </span>
            )}
          </div>

          {vehiculo.estado !== 'sold' && (
            <button className="
              text-xs font-semibold flex items-center gap-1
              text-teal-600 hover:text-teal-500
              dark:text-teal-500 dark:hover:text-teal-400
            ">
              Ver Detalles <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
