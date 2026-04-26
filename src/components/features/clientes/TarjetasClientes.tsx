import { Clock, RefreshCcw, Star, TrendingUp } from 'lucide-react';

interface TarjetasClientesProps {
  totalClientes: number;
}

const estadisticas = [
  { titulo: 'TOTAL CLIENTES', clave: 'total', icono: TrendingUp, valorFijo: null, descripcion: '+12% este mes' },
  { titulo: 'VENTAS ACTIVAS', clave: 'ventas', icono: RefreshCcw, valorFijo: '42', descripcion: 'En proceso' },
  { titulo: 'LEADS NUEVOS', clave: 'leads', icono: Clock, valorFijo: '156', descripcion: 'Últimos 7 días' },
  { titulo: 'SATISFACCIÓN', clave: 'satisfaccion', icono: Star, valorFijo: '98.4%', descripcion: 'Puntaje NPS' },
];

export function TarjetasClientes({ totalClientes }: TarjetasClientesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {estadisticas.map((item) => {
        const Icon = item.icono;
        const valor = item.valorFijo ?? totalClientes;
        return (
          <div key={item.titulo} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
            <p className="text-xs font-bold text-zinc-500">{item.titulo}</p>
            <p className="text-2xl font-bold text-white">{valor}</p>
            <div className="flex items-center gap-2 mt-2 text-teal-500 text-xs">
              <Icon className="h-4 w-4" />
              {item.descripcion}
            </div>
          </div>
        );
      })}
    </div>
  );
}
