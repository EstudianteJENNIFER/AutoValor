import React from "react";
import ComprasHeader from "../features/compras/comprasheader";
import ComprasStats from "../features/compras/ComprasStats";
import ComprasTable from "../features/compras/ComprasTable";

const Compras = () => {
  return (
    <div className="p-6 overflow-y-auto">

      <ComprasHeader />

      <ComprasStats />

      <ComprasTable />

    </div>
  );
};

export default Compras;