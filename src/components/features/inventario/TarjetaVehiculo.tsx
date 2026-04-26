import { ChevronRight, MoreVertical } from 'lucide-react';
import type { Vehiculo } from './datosInventario';

interface TarjetaVehiculoProps {
  vehiculo: Vehiculo;
}

export function TarjetaVehiculo({ vehiculo }: TarjetaVehiculoProps) {
  const estadoConfig = {
    available: {
      label: 'Disponible',
      estilo: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      punto: 'bg-teal-500',
    },
    reserved: {
      label: 'Separado',
      estilo: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      punto: 'bg-amber-500',
    },
    sold: {
      label: 'Vendido',
      estilo: 'bg-zinc-700/50 text-zinc-300 border-zinc-600/50',
      punto: 'bg-zinc-400',
    },
  }[vehiculo.estado];

  const estaVendido = vehiculo.estado === 'sold';

  return (
    <div className="refined-card rounded-xl overflow-hidden group transition-all hover:border-teal-500/30">
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
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className={`font-h3 text-base ${estaVendido ? 'text-zinc-400' : 'text-zinc-100'}`}>
              {vehiculo.nombre}
            </h3>
            <p className={`text-xs font-body-sm ${estaVendido ? 'text-zinc-600' : 'text-zinc-500'}`}>
              {vehiculo.modelo} • {vehiculo.año} • {vehiculo.version}
            </p>
          </div>
          <button className={`transition-colors ${estaVendido ? 'text-zinc-600' : 'text-zinc-500 hover:text-teal-500'}`}>
            <MoreVertical size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4 py-3 border-y border-zinc-800/50">
          <div>
            <p className="text-[10px] text-zinc-500 font-label-caps mb-0.5">PRECIO USD</p>
            <p className={`font-mono-data text-base ${estaVendido ? 'text-zinc-500' : 'text-zinc-200'}`}>
              $ {vehiculo.precioUSD.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 font-label-caps mb-0.5">PRECIO PEN</p>
            <p className={`font-mono-data text-sm ${estaVendido ? 'text-zinc-600' : 'text-zinc-400'}`}>
              S/ {vehiculo.precioPEN.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`text-xs font-body-sm ${estaVendido ? 'text-zinc-600' : 'text-zinc-500'}`}>
              ID Stock: #V-{vehiculo.id.padStart(4, '0')}
            </span>
            <span className={`text-[10px] font-bold mt-0.5 ${estaVendido ? 'text-zinc-500' : 'text-teal-500/80'}`}>
              Stock: {vehiculo.stock} {vehiculo.stock === 1 ? 'unidad' : 'unidades'}
            </span>
            {vehiculo.estado === 'reserved' && <span className="text-[9px] text-amber-500/80 mt-0.5 italic">Reserva expira en 2h</span>}
            {vehiculo.estado === 'sold' && <span className="text-[9px] text-zinc-500 italic mt-0.5">Entregado el 12/05</span>}
          </div>
          {vehiculo.estado !== 'sold' && (
            <button className="text-teal-500 hover:text-teal-400 text-xs font-semibold flex items-center gap-1">
              Ver Detalles <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
