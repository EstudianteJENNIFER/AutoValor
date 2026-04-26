import { ChevronLeft, ChevronRight, Edit, Eye } from 'lucide-react';
import type { Vehiculo } from './datosInventario';
import { TarjetaVehiculo } from './TarjetaVehiculo';

interface TablaInventarioProps {
  modoVista: 'grid' | 'list';
  vehiculosPaginados: Vehiculo[];
  vehiculosFiltrados: Vehiculo[];
  paginaActual: number;
  totalPaginas: number;
  alCambiarPagina: (pagina: number) => void;
  alLimpiarFiltros: () => void;
}

export function TablaInventario({
  modoVista,
  vehiculosPaginados,
  vehiculosFiltrados,
  paginaActual,
  totalPaginas,
  alCambiarPagina,
  alLimpiarFiltros,
}: TablaInventarioProps) {
  return (
    <>
      {modoVista === 'grid' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {vehiculosPaginados.map((vehiculo) => (
              <TarjetaVehiculo key={vehiculo.id} vehiculo={vehiculo} />
            ))}
          </div>

          {vehiculosFiltrados.length === 0 && (
            <div className="text-center py-12 refined-card rounded-xl">
              <p className="text-zinc-400">No se encontraron vehículos con los filtros seleccionados.</p>
              <button onClick={alLimpiarFiltros} className="mt-3 text-teal-500 hover:text-teal-400 text-sm font-semibold">
                Limpiar filtros
              </button>
            </div>
          )}

          {totalPaginas > 1 && vehiculosFiltrados.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => alCambiarPagina(Math.max(1, paginaActual - 1))}
                disabled={paginaActual === 1}
                className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                let numeroPagina;
                if (totalPaginas <= 5) {
                  numeroPagina = i + 1;
                } else if (paginaActual <= 3) {
                  numeroPagina = i + 1;
                } else if (paginaActual >= totalPaginas - 2) {
                  numeroPagina = totalPaginas - 4 + i;
                } else {
                  numeroPagina = paginaActual - 2 + i;
                }
                return (
                  <button
                    key={numeroPagina}
                    onClick={() => alCambiarPagina(numeroPagina)}
                    className={`w-7 h-7 rounded text-xs font-bold transition-colors ${
                      paginaActual === numeroPagina ? 'bg-teal-500 text-on-primary-fixed' : 'text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {numeroPagina}
                  </button>
                );
              })}
              <button
                onClick={() => alCambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
                disabled={paginaActual === totalPaginas}
                className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      {modoVista === 'list' && (
        <div className="mt-0">
          <div className="refined-card rounded-xl overflow-hidden border-zinc-800 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse zebra-table">
                <thead>
                  <tr className="bg-zinc-900/50 border-b border-zinc-800">
                    <th className="px-4 py-3 font-label-caps text-zinc-500 text-xs">VEHÍCULO / VIN</th>
                    <th className="px-4 py-3 font-label-caps text-zinc-500 text-xs">MARCA</th>
                    <th className="px-4 py-3 font-label-caps text-zinc-500 text-xs">TIPO</th>
                    <th className="px-4 py-3 font-label-caps text-zinc-500 text-xs text-right">PRECIO (USD)</th>
                    <th className="px-4 py-3 font-label-caps text-zinc-500 text-xs">COLOR</th>
                    <th className="px-4 py-3 font-label-caps text-zinc-500 text-xs">STOCK</th>
                    <th className="px-4 py-3 font-label-caps text-zinc-500 text-xs">ESTADO</th>
                    <th className="px-4 py-3 font-label-caps text-zinc-500 text-xs">ACCIONES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {vehiculosPaginados.map((vehiculo) => {
                    const etiquetaEstado = vehiculo.estado === 'available'
                      ? 'DISPONIBLE'
                      : vehiculo.estado === 'reserved'
                        ? 'SEPARADO'
                        : 'VENDIDO';

                    return (
                      <tr key={vehiculo.id}>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="text-zinc-100 font-semibold text-sm">{vehiculo.nombre}</span>
                            <span className="text-zinc-500 text-[10px] font-mono-data tracking-tight">VIN: {vehiculo.vin}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-zinc-400 text-xs">{vehiculo.marca}</td>
                        <td className="px-4 py-3 text-zinc-400 text-xs">{vehiculo.tipo}</td>
                        <td className="px-4 py-3 text-right font-mono-data text-zinc-200 text-sm">$ {vehiculo.precioUSD.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full border border-zinc-600" style={{ backgroundColor: vehiculo.codigoColor }} />
                            <span className="text-zinc-400 text-xs">{vehiculo.color}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-zinc-400 text-xs font-semibold">{vehiculo.stock} {vehiculo.stock === 1 ? 'unidad' : 'unidades'}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded bg-zinc-500/10 text-zinc-400 text-[10px] font-bold border border-zinc-500/20">{etiquetaEstado}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="text-zinc-500 hover:text-teal-500 transition-colors"><Edit size={16} /></button>
                            <button className="text-zinc-500 hover:text-primary transition-colors"><Eye size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {vehiculosFiltrados.length === 0 && (
              <div className="text-center py-8">
                <p className="text-zinc-400">No se encontraron vehículos con los filtros seleccionados.</p>
                <button onClick={alLimpiarFiltros} className="mt-2 text-teal-500 hover:text-teal-400 text-sm font-semibold">
                  Limpiar filtros
                </button>
              </div>
            )}

            {totalPaginas > 1 && vehiculosFiltrados.length > 0 && (
              <div className="p-3 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
                <p className="text-xs text-zinc-500">
                  Mostrando {((paginaActual - 1) * 6) + 1} - {Math.min(paginaActual * 6, vehiculosFiltrados.length)} de {vehiculosFiltrados.length} vehículos
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => alCambiarPagina(Math.max(1, paginaActual - 1))}
                    disabled={paginaActual === 1}
                    className="p-0.5 text-zinc-500 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                    let numeroPagina;
                    if (totalPaginas <= 5) {
                      numeroPagina = i + 1;
                    } else if (paginaActual <= 3) {
                      numeroPagina = i + 1;
                    } else if (paginaActual >= totalPaginas - 2) {
                      numeroPagina = totalPaginas - 4 + i;
                    } else {
                      numeroPagina = paginaActual - 2 + i;
                    }
                    return (
                      <button
                        key={numeroPagina}
                        onClick={() => alCambiarPagina(numeroPagina)}
                        className={`w-6 h-6 rounded text-xs font-bold transition-colors ${paginaActual === numeroPagina ? 'bg-teal-500 text-on-primary-fixed' : 'text-zinc-400 hover:bg-zinc-800'}`}
                      >
                        {numeroPagina}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => alCambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
                    disabled={paginaActual === totalPaginas}
                    className="p-0.5 text-zinc-500 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
