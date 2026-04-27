import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PanelAgregarCliente } from './PanelAgregarCliente';
import { TarjetasClientes } from './TarjetasClientes';
import { TablaClientes } from './TablaClientes';
import { clientesMock } from '../../../hook/datosClientes';
import type { Cliente } from '../../../hook/datosClientes';

export function ClientesFeature() {
  const [clientes, setClientes] = useState<Cliente[]>(clientesMock);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 4;

  const clientesFiltrados = useMemo(() => {
    const term = terminoBusqueda.toLowerCase().trim();
    return clientes.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(term) ||
      cliente.dni.includes(term) ||
      cliente.correo.toLowerCase().includes(term)
    );
  }, [clientes, terminoBusqueda]);

  const totalPaginas = Math.max(1, Math.ceil(clientesFiltrados.length / itemsPorPagina));

  const clientesPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * itemsPorPagina;
    return clientesFiltrados.slice(inicio, inicio + itemsPorPagina);
  }, [clientesFiltrados, paginaActual]);

  const handleEliminar = (id: string) => {
    if (window.confirm('¿Eliminar este cliente?')) {
      setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
    }
  };

  const handleEditar = (id: string) => {
    const cliente = clientes.find((item) => item.id === id);
    if (!cliente) return;
    console.log('Editar cliente:', cliente.nombre);
  };

  const handleGuardarCliente = (nuevoCliente: Omit<Cliente, 'id' | 'iniciales' | 'etiqueta' | 'colorEtiqueta'>) => {
    const nombre = nuevoCliente.nombre.trim();
    const iniciales = nombre
      .split(' ')
      .map((parte) => parte[0] ?? '')
      .join('')
      .slice(0, 2)
      .toUpperCase();

    setClientes((prev) => [
      {
        id: Date.now().toString(),
        iniciales,
        etiqueta: 'Nuevo Cliente',
        colorEtiqueta: 'teal',
        ...nuevoCliente,
      },
      ...prev,
    ]);

    setPanelAbierto(false);
    setPaginaActual(1);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto
  bg-gray-50 text-gray-900
  dark:bg-transparent dark:text-white
  transition-colors duration-300">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Clientes</h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Administra la base de datos de compradores.</p>
        </div>
        <button
          type="button"
          onClick={() => setPanelAbierto(true)}
          className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-md font-semibold text-sm flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuevo Cliente
        </button>
      </div>

      <TarjetasClientes totalClientes={clientes.length} />

      <div className="mb-4">
        <div className="relative max-w-sm">
          <input
            type="text"
            placeholder="Buscar por nombre, DNI o correo..."
            value={terminoBusqueda}
            onChange={(e) => {
              setTerminoBusqueda(e.target.value);
              setPaginaActual(1);
            }}
            className="w-full rounded-xl px-4 py-2 text-sm outline-none
bg-white border border-gray-300 text-gray-900
focus:ring-2 focus:ring-teal-500
dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100"
          />
        </div>
      </div>

      <TablaClientes
        clientes={clientesFiltrados}
        clientesPaginados={clientesPaginados}
        totalFiltrados={clientesFiltrados.length}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        alEditar={handleEditar}
        alEliminar={handleEliminar}
        alCambiarPagina={(pagina) => setPaginaActual(pagina)}
      />

      <PanelAgregarCliente
        abierto={panelAbierto}
        cerrar={() => setPanelAbierto(false)}
        alGuardar={handleGuardarCliente}
      />
    </div>
  );
}
