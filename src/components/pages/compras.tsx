import ComprasHeader from "../features/compras/ComprasHeader";
import ComprasStats from "../features/compras/ComprasStats";
import ComprasTable from "../features/compras/ComprasTable";

const Compras = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">

      <ComprasHeader />

      <ComprasStats />

      <ComprasTable />

    </div>
  );
};

export default Compras;