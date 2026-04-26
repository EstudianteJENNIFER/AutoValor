import { X } from 'lucide-react';
import type { Cliente } from './datosClientes';
import type { FormEvent } from 'react';

interface PanelAgregarClienteProps {
  abierto: boolean;
  cerrar: () => void;
  alGuardar: (cliente: Omit<Cliente, 'id' | 'iniciales' | 'etiqueta' | 'colorEtiqueta'>) => void;
}

export function PanelAgregarCliente({ abierto, cerrar, alGuardar }: PanelAgregarClienteProps) {
  if (!abierto) return null;

  const manejarEnvio = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formulario = event.currentTarget;
    const datos = new FormData(formulario);
    const nombre = datos.get('nombre') as string;

    alGuardar({
      nombre,
      dni: datos.get('dni') as string,
      telefono: datos.get('telefono') as string,
      correo: datos.get('correo') as string,
      observaciones: datos.get('observaciones') as string,
    });

    formulario.reset();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={cerrar} />
      <div className="fixed right-0 top-0 h-full w-96 bg-zinc-900 border-l border-zinc-800 z-50 shadow-2xl">
        <form onSubmit={manejarEnvio} className="h-full flex flex-col">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Añadir Nuevo Cliente</h3>
            <button type="button" onClick={cerrar} className="text-zinc-500 hover:text-white transition-colors duration-200" aria-label="Cerrar panel">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1">NOMBRE COMPLETO *</label>
              <input name="nombre" required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">DNI *</label>
                <input name="dni" required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1">TELÉFONO *</label>
                <input name="telefono" required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1">CORREO ELECTRÓNICO *</label>
              <input name="correo" type="email" required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1">OBSERVACIONES</label>
              <textarea name="observaciones" rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
            </div>
          </div>
          <div className="p-6 border-t border-zinc-800 flex gap-4">
            <button type="button" onClick={cerrar} className="flex-1 px-4 py-2 border border-zinc-700 rounded-md text-zinc-400">
              Cancelar
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-md text-white font-semibold">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
