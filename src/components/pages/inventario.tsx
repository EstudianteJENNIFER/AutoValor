import React from 'react';
import { InventarioFeature } from '../features/inventario/InventarioFeature';

const InventarioPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <InventarioFeature />
    </div>
  );
};

export default InventarioPage;