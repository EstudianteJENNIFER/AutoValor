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
          <div key={item.titulo} className="
bg-white border border-gray-200
dark:bg-zinc-900/50 dark:border-zinc-800
p-4 rounded-xl transition-colors">
            <p className="text-xs font-bold text-gray-500 dark:text-zinc-500">{item.titulo}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{valor}</p>
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
