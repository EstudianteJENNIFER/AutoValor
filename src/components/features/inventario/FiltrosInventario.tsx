import { Grid3x3, List, X } from 'lucide-react';

interface FiltrosInventarioProps {
  marcas: string[];
  tipos: string[];
  marcaSeleccionada: string;
  tipoSeleccionado: string;
  terminoBusqueda: string;
  modoVista: 'grid' | 'list';
  cantidadResultados: number;
  alCambiarMarca: (valor: string) => void;
  alCambiarTipo: (valor: string) => void;
  alCambiarBusqueda: (valor: string) => void;
  alLimpiarFiltros: () => void;
  alCambiarVista: (modo: 'grid' | 'list') => void;
  hayFiltrosActivos: boolean;
}

export function FiltrosInventario({
  marcas,
  tipos,
  marcaSeleccionada,
  tipoSeleccionado,
  terminoBusqueda,
  modoVista,
  cantidadResultados,
  alCambiarMarca,
  alCambiarTipo,
  alCambiarBusqueda,
  alLimpiarFiltros,
  alCambiarVista,
  hayFiltrosActivos,
}: FiltrosInventarioProps) {
  return (
    <div className="refined-card rounded-xl p-3 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-background border border-zinc-700 rounded-lg px-2 py-1">
          <span className="text-xs font-medium text-zinc-300">Filtros:</span>
        </div>

        <select
          className="bg-background border border-zinc-700 text-sm text-zinc-300 rounded-lg px-3 py-1 focus:ring-teal-500 focus:border-teal-500"
          value={marcaSeleccionada}
          onChange={(e) => alCambiarMarca(e.target.value)}
        >
          {marcas.map((marca) => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>

        <select
          className="bg-background border border-zinc-700 text-sm text-zinc-300 rounded-lg px-3 py-1 focus:ring-teal-500 focus:border-teal-500"
          value={tipoSeleccionado}
          onChange={(e) => alCambiarTipo(e.target.value)}
        >
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>

        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Buscar por nombre, marca o VIN..."
            className="w-full bg-background border border-zinc-700 text-sm text-zinc-300 rounded-lg px-3 py-1 focus:ring-teal-500 focus:border-teal-500"
            value={terminoBusqueda}
            onChange={(e) => alCambiarBusqueda(e.target.value)}
          />
        </div>

        {hayFiltrosActivos && (
          <button
            type="button"
            onClick={alLimpiarFiltros}
            className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 text-xs px-2 py-1 rounded-lg transition-colors"
          >
            <X size={14} />
            Limpiar filtros
          </button>
        )}

        <div className="flex-1"></div>

        <div className="flex bg-background border border-zinc-700 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => alCambiarVista('grid')}
            className={`px-2 py-0.5 rounded flex items-center transition-colors ${modoVista === 'grid' ? 'bg-zinc-800 text-teal-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Grid3x3 size={16} />
          </button>
          <button
            type="button"
            onClick={() => alCambiarVista('list')}
            className={`px-2 py-0.5 rounded flex items-center transition-colors ${modoVista === 'list' ? 'bg-zinc-800 text-teal-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <div className="mt-2 text-xs text-zinc-500">
        Mostrando {cantidadResultados} vehículos.
        {hayFiltrosActivos && <span className="text-teal-500 ml-2">(filtrado activo)</span>}
      </div>
    </div>
  );
}
