export interface Cliente {
  id: string;
  nombre: string;
  iniciales: string;
  etiqueta: string;
  dni: string;
  telefono: string;
  correo: string;
  observaciones: string;
  colorEtiqueta: 'teal' | 'amber' | 'blue' | 'purple';
}

export const clientesMock: Cliente[] = [
  {
    id: '1',
    nombre: 'Alejandro Rodriguez',
    iniciales: 'AR',
    etiqueta: 'Cliente Premium',
    colorEtiqueta: 'teal',
    dni: '12345678',
    telefono: '+51 987 654 321',
    correo: 'a.rodriguez@email.com',
    observaciones: 'Interesado en SUV 2024. Pendiente de aprobación de crédito bancario.',
  },
  {
    id: '2',
    nombre: 'Maria Sanchez',
    iniciales: 'MS',
    etiqueta: 'Lead Reciente',
    colorEtiqueta: 'amber',
    dni: '87654321',
    telefono: '+51 912 345 678',
    correo: 'm.sanchez@cloud.com',
    observaciones: 'Agendó test drive para el sábado 14. Busca vehículo eléctrico.',
  },
  {
    id: '3',
    nombre: 'Juan Villalobos',
    iniciales: 'JV',
    etiqueta: 'Flotilla Corporativa',
    colorEtiqueta: 'blue',
    dni: '25478963',
    telefono: '+51 923 456 789',
    correo: 'ventas@villalobos-sl.es',
    observaciones: 'Requiere cotización por 5 unidades de transporte de carga ligera.',
  },
  {
    id: '4',
    nombre: 'Lucia Garcia',
    iniciales: 'LG',
    etiqueta: 'Mantenimiento VIP',
    colorEtiqueta: 'purple',
    dni: '54212365',
    telefono: '+51 934 567 890',
    correo: 'lucia.g@personal.me',
    observaciones: 'Cliente recurrente. Compró su tercer vehículo el mes pasado.',
  },
];

export const coloresEtiqueta = {
  teal: 'bg-teal-900/30 text-teal-500 border-teal-800/50',
  amber: 'bg-amber-900/30 text-amber-500 border-amber-800/50',
  blue: 'bg-blue-900/30 text-blue-500 border-blue-800/50',
  purple: 'bg-purple-900/30 text-purple-500 border-purple-800/50',
};
