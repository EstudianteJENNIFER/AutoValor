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
    <div className="
      rounded-xl p-3 mb-6 transition-colors
      bg-white border border-zinc-200
      dark:bg-zinc-900 dark:border-zinc-800
    ">
      <div className="flex flex-wrap items-center gap-3">

        {/* LABEL */}
        <div className="
          flex items-center gap-2 px-2 py-1 rounded-lg
          bg-zinc-100 border border-zinc-200
          dark:bg-zinc-800 dark:border-zinc-700
        ">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            Filtros:
          </span>
        </div>

        {/* SELECT */}
        <select
          className="
            text-sm rounded-lg px-3 py-1 outline-none
            bg-white border border-zinc-300 text-zinc-900
            focus:ring-2 focus:ring-teal-500
            dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200
          "
          value={marcaSeleccionada}
          onChange={(e) => alCambiarMarca(e.target.value)}
        >
          {marcas.map((marca) => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>

        <select
          className="
            text-sm rounded-lg px-3 py-1 outline-none
            bg-white border border-zinc-300 text-zinc-900
            focus:ring-2 focus:ring-teal-500
            dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200
          "
          value={tipoSeleccionado}
          onChange={(e) => alCambiarTipo(e.target.value)}
        >
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>

        {/* INPUT */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Buscar por nombre, marca o VIN..."
            className="
              w-full rounded-lg px-3 py-1 text-sm outline-none
              bg-white border border-zinc-300 text-zinc-900
              focus:ring-2 focus:ring-teal-500
              dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200
            "
            value={terminoBusqueda}
            onChange={(e) => alCambiarBusqueda(e.target.value)}
          />
        </div>

        {/* LIMPIAR */}
        {hayFiltrosActivos && (
          <button
            type="button"
            onClick={alLimpiarFiltros}
            className="
              flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors
              text-zinc-500 hover:text-zinc-800
              dark:text-zinc-400 dark:hover:text-zinc-200
            "
          >
            <X size={14} />
            Limpiar filtros
          </button>
        )}

        <div className="flex-1"></div>

        {/* VISTA */}
        <div className="
          flex p-0.5 rounded-lg
          bg-zinc-100 border border-zinc-200
          dark:bg-zinc-800 dark:border-zinc-700
        ">
          <button
            type="button"
            onClick={() => alCambiarVista('grid')}
            className={`px-2 py-0.5 rounded flex items-center transition-colors ${
              modoVista === 'grid'
                ? "bg-zinc-200 text-teal-600 dark:bg-zinc-700 dark:text-teal-400"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Grid3x3 size={16} />
          </button>

          <button
            type="button"
            onClick={() => alCambiarVista('list')}
            className={`px-2 py-0.5 rounded flex items-center transition-colors ${
              modoVista === 'list'
                ? "bg-zinc-200 text-teal-600 dark:bg-zinc-700 dark:text-teal-400"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Mostrando {cantidadResultados} vehículos.
        {hayFiltrosActivos && (
          <span className="text-teal-500 ml-2">(filtrado activo)</span>
        )}
      </div>
    </div>
  );
}