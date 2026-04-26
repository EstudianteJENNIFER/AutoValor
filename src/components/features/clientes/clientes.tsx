// features/clientes/clientes.tsx
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Trash2, Edit3, X, Plus, TrendingUp, RefreshCcw, Clock, Star } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  initials: string;
  badge: string;
  dni: string;
  phone: string;
  email: string;
  observations: string;
  badgeColor: 'teal' | 'amber' | 'blue' | 'purple';
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Alejandro Rodriguez',
    initials: 'AR',
    badge: 'Cliente Premium',
    badgeColor: 'teal',
    dni: '12345678',
    phone: '+51 987 654 321',
    email: 'a.rodriguez@email.com',
    observations: 'Interesado en SUV 2024. Pendiente de aprobación de crédito bancario.',
  },
  {
    id: '2',
    name: 'Maria Sanchez',
    initials: 'MS',
    badge: 'Lead Reciente',
    badgeColor: 'amber',
    dni: '87654321',
    phone: '+51 912 345 678',
    email: 'm.sanchez@cloud.com',
    observations: 'Agendó test drive para el sábado 14. Busca vehículo eléctrico.',
  },
  {
    id: '3',
    name: 'Juan Villalobos',
    initials: 'JV',
    badge: 'Flotilla Corporativa',
    badgeColor: 'blue',
    dni: '25478963',
    phone: '+51 923 456 789',
    email: 'ventas@villalobos-sl.es',
    observations: 'Requiere cotización por 5 unidades de transporte de carga ligera.',
  },
  {
    id: '4',
    name: 'Lucia Garcia',
    initials: 'LG',
    badge: 'Mantenimiento VIP',
    badgeColor: 'purple',
    dni: '54212365',
    phone: '+51 934 567 890',
    email: 'lucia.g@personal.me',
    observations: 'Cliente recurrente. Compró su tercer vehículo el mes pasado.',
  },
];

export function ClientesFeature() {
  const [clients, setClients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.dni.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este cliente?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    const client = clients.find(c => c.id === id);
    if (!client) return;
    console.log('Editar cliente:', client.name);
  };

  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    
    const newClient: Client = {
      id: Date.now().toString(),
      name,
      initials: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      badge: 'Nuevo Cliente',
      badgeColor: 'teal',
      dni: formData.get('dni') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      observations: formData.get('observations') as string,
    };
    
    setClients([newClient, ...clients]);
    setIsPanelOpen(false);
    form.reset();
  };

  const badgeColors = {
    teal: 'bg-teal-900/30 text-teal-500 border-teal-800/50',
    amber: 'bg-amber-900/30 text-amber-500 border-amber-800/50',
    blue: 'bg-blue-900/30 text-blue-500 border-blue-800/50',
    purple: 'bg-purple-900/30 text-purple-500 border-purple-800/50',
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header de página */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Clientes</h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Administra la base de datos de compradores.</p>
        </div>
        <button
          onClick={() => setIsPanelOpen(true)}
          className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-md font-semibold text-sm flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuevo Cliente
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'TOTAL CLIENTES', value: clients.length, trend: '+12% este mes', icon: TrendingUp },
          { title: 'VENTAS ACTIVAS', value: '42', trend: 'En proceso', icon: RefreshCcw },
          { title: 'LEADS NUEVOS', value: '156', trend: 'Últimos 7 días', icon: Clock },
          { title: 'SATISFACCIÓN', value: '98.4%', trend: 'Puntaje NPS', icon: Star },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
            <p className="text-xs font-bold text-zinc-500">{stat.title}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <div className="flex items-center gap-2 mt-2 text-teal-500 text-xs">
              <stat.icon className="h-4 w-4" />
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Tabla */}
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
              {paginatedClients.map((client) => (
                <tr key={client.id} className="hover:bg-zinc-800/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-md flex items-center justify-center font-bold border ${badgeColors[client.badgeColor]}`}>
                        {client.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{client.name}</p>
                        <p className="text-xs text-zinc-500">{client.badge}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{client.dni}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white">{client.phone}</p>
                    <p className="text-xs text-zinc-500">{client.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400 max-w-xs truncate">
                    {client.observations}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(client.id)}
                      className="p-2 text-zinc-400 hover:text-cyan-400 rounded-md bg-white/5 transition-colors duration-200"
                      aria-label={`Editar ${client.name}`}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="p-2 text-zinc-400 hover:text-red-500 rounded-md bg-white/5 transition-colors duration-200"
                      aria-label={`Eliminar ${client.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {filteredClients.length > 0 && (
          <div className="px-6 py-4 border-t border-zinc-800 flex justify-between items-center">
            <p className="text-xs text-zinc-500">
              Mostrando {paginatedClients.length} de {filteredClients.length} clientes
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-zinc-500 disabled:opacity-30 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
                aria-label="Página anterior"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-zinc-400">Página {currentPage} de {totalPages || 1}</span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 text-zinc-500 disabled:opacity-30 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200"
                aria-label="Página siguiente"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Panel lateral para nuevo cliente */}
      {isPanelOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setIsPanelOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-96 bg-zinc-900 border-l border-zinc-800 z-50 shadow-2xl">
            <form onSubmit={handleAddClient} className="h-full flex flex-col">
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Añadir Nuevo Cliente</h3>
                <button type="button" onClick={() => setIsPanelOpen(false)} className="text-zinc-500 hover:text-white transition-colors duration-200" aria-label="Cerrar panel">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1">NOMBRE COMPLETO *</label>
                  <input name="name" required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-1">DNI *</label>
                    <input name="dni" required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-1">TELÉFONO *</label>
                    <input name="phone" required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1">EMAIL *</label>
                  <input name="email" type="email" required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1">OBSERVACIONES</label>
                  <textarea name="observations" rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
                </div>
              </div>
              <div className="p-6 border-t border-zinc-800 flex gap-4">
                <button type="button" onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-2 border border-zinc-700 rounded-md text-zinc-400">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-md text-white font-semibold">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}