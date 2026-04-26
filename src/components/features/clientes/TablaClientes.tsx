import { ArrowLeft, ArrowRight, Edit3, Trash2 } from 'lucide-react';
import type { Cliente } from './datosClientes';
import { coloresEtiqueta } from './datosClientes';

interface TablaClientesProps {
  clientes: Cliente[];
  clientesPaginados: Cliente[];
  totalFiltrados: number;
  paginaActual: number;
  totalPaginas: number;
  alEditar: (id: string) => void;
  alEliminar: (id: string) => void;
  alCambiarPagina: (pagina: number) => void;
}

export function TablaClientes({
  clientesPaginados,
  totalFiltrados,
  paginaActual,
  totalPaginas,
  alEditar,
  alEliminar,
  alCambiarPagina,
}: TablaClientesProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-zinc-800 bg-zinc-900">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400">CLIENTE</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400">DNI</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400">CONTACTO</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400">OBSERVACIONES</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 text-right">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {clientesPaginados.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-zinc-800/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-md flex items-center justify-center font-bold border ${coloresEtiqueta[cliente.colorEtiqueta]}`}>
                      {cliente.iniciales}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{cliente.nombre}</p>
                      <p className="text-xs text-zinc-500">{cliente.etiqueta}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-300">{cliente.dni}</td>
                <td className="px-6 py-4">
                  <p className="text-sm text-white">{cliente.telefono}</p>
                  <p className="text-xs text-zinc-500">{cliente.correo}</p>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400 max-w-xs truncate">{cliente.observaciones}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => alEditar(cliente.id)}
                    className="p-2 text-zinc-400 hover:text-cyan-400 rounded-md bg-white/5 transition-colors duration-200"
                    aria-label={`Editar ${cliente.nombre}`}
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => alEliminar(cliente.id)}
                    className="p-2 text-zinc-400 hover:text-red-500 rounded-md bg-white/5 transition-colors duration-200"
                    aria-label={`Eliminar ${cliente.nombre}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalFiltrados > 0 && (
        <div className="px-6 py-4 border-t border-zinc-800 flex justify-between items-center">
          <p className="text-xs text-zinc-500">Mostrando {clientesPaginados.length} de {totalFiltrados} clientes</p>
          <div className="flex gap-2">
            <button
              onClick={() => alCambiarPagina(Math.max(1, paginaActual - 1))}
              disabled={paginaActual === 1}
              className="p-2 text-zinc-500 disabled:opacity-30 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
              aria-label="Página anterior"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-zinc-400">Página {paginaActual} de {totalPaginas || 1}</span>
            <button
              onClick={() => alCambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
              disabled={paginaActual === totalPaginas || totalPaginas === 0}
              className="p-2 text-zinc-500 disabled:opacity-30 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
              aria-label="Página siguiente"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
