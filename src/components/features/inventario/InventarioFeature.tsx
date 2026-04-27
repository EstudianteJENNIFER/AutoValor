import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { FiltrosInventario } from './FiltrosInventario';
import { TablaInventario } from './TablaInventario';
import { vehiculosMock } from '../../../hook/datosInventario';

export const InventarioFeature: React.FC = () => {
  const [modoVista, setModoVista] = useState<'grid' | 'list'>('grid');
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('Todas las Marcas');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('Tipo: Todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 6;

  const marcas = useMemo(
    () => ['Todas las Marcas', ...new Set(vehiculosMock.map((vehiculo) => vehiculo.marca))],
    []
  );

  const tipos = useMemo(
    () => ['Tipo: Todos', ...new Set(vehiculosMock.map((vehiculo) => vehiculo.tipo))],
    []
  );

  const vehiculosFiltrados = useMemo(() => {
    return vehiculosMock.filter((vehiculo) => {
      if (marcaSeleccionada !== 'Todas las Marcas' && vehiculo.marca !== marcaSeleccionada) {
        return false;
      }
      if (tipoSeleccionado !== 'Tipo: Todos' && vehiculo.tipo !== tipoSeleccionado) {
        return false;
      }

      const termino = terminoBusqueda.toLowerCase().trim();
      if (!termino) return true;

      return (
        vehiculo.nombre.toLowerCase().includes(termino) ||
        vehiculo.marca.toLowerCase().includes(termino) ||
        vehiculo.vin.toLowerCase().includes(termino) ||
        vehiculo.modelo.toLowerCase().includes(termino)
      );
    });
  }, [marcaSeleccionada, tipoSeleccionado, terminoBusqueda]);

  const totalPaginas = Math.max(1, Math.ceil(vehiculosFiltrados.length / itemsPorPagina));

  const vehiculosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * itemsPorPagina;
    return vehiculosFiltrados.slice(inicio, inicio + itemsPorPagina);
  }, [vehiculosFiltrados, paginaActual]);

  const limpiarFiltros = () => {
    setMarcaSeleccionada('Todas las Marcas');
    setTipoSeleccionado('Tipo: Todos');
    setTerminoBusqueda('');
    setPaginaActual(1);
  };

  const hayFiltrosActivos =
    marcaSeleccionada !== 'Todas las Marcas' ||
    tipoSeleccionado !== 'Tipo: Todos' ||
    terminoBusqueda !== '';

return (
  <div className="
    p-6 lg:p-8 max-w-7xl mx-auto
    bg-gray-50 text-gray-900
    dark:bg-transparent dark:text-white
    transition-colors duration-300
  ">
    <div className="flex flex-wrap justify-between items-end gap-4 mb-6">

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Inventario de Vehículos
        </h2>

        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Administra el stock actual y estados de disponibilidad en tiempo real.
        </p>
      </div>

      <button className="
        bg-teal-600 hover:bg-teal-500 text-white
        font-semibold px-5 py-2 rounded-lg flex items-center gap-2
        transition-all text-sm
      ">
        <Plus size={18} />
        Nuevo Vehículo
      </button>
    </div>

    <FiltrosInventario
      marcas={marcas}
      tipos={tipos}
      marcaSeleccionada={marcaSeleccionada}
      tipoSeleccionado={tipoSeleccionado}
      terminoBusqueda={terminoBusqueda}
      modoVista={modoVista}
      cantidadResultados={vehiculosFiltrados.length}
      alCambiarMarca={(valor) => {
        setMarcaSeleccionada(valor);
        setPaginaActual(1);
      }}
      alCambiarTipo={(valor) => {
        setTipoSeleccionado(valor);
        setPaginaActual(1);
      }}
      alCambiarBusqueda={(valor) => {
        setTerminoBusqueda(valor);
        setPaginaActual(1);
      }}
      alLimpiarFiltros={limpiarFiltros}
      alCambiarVista={(modo) => {
        setModoVista(modo);
        setPaginaActual(1);
      }}
      hayFiltrosActivos={hayFiltrosActivos}
    />

    <TablaInventario
      modoVista={modoVista}
      vehiculosPaginados={vehiculosPaginados}
      vehiculosFiltrados={vehiculosFiltrados}
      paginaActual={paginaActual}
      totalPaginas={totalPaginas}
      alCambiarPagina={setPaginaActual}
      alLimpiarFiltros={limpiarFiltros}
    />
  </div>
);
};
