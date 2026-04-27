const ComprasTable = () => {
  const data = [
    {
      proveedor: "Global Motors",
      marca: "Chevrolet",
      modelo: "Silverado",
      monto: "$54,200",
      stock: 4,
    },
    {
      proveedor: "Executive Autos",
      marca: "BMW",
      modelo: "Series 3",
      monto: "$38,900",
      stock: 2,
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-200 text-gray-600 dark:bg-zinc-800 dark:text-zinc-300">
          <tr className="border-t border-gray-300 hover:bg-gray-100 
               dark:border-zinc-800 dark:hover:bg-zinc-800">
            <th className="p-3 text-left">Proveedor</th>
            <th className="p-3">Marca</th>
            <th className="p-3">Modelo</th>
            <th className="p-3">Monto</th>
            <th className="p-3">Stock</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-t border-gray-300 hover:bg-gray-100 dark:border-zinc-800 dark:hover:bg-zinc-800 transition-colors"
            >
              <td className="p-3">{row.proveedor}</td>
              <td className="p-3 text-center">{row.marca}</td>
              <td className="p-3 text-center">{row.modelo}</td>
              <td className="p-3 text-center text-teal-500">
                {row.monto}
              </td>
              <td className="p-3 text-center">{row.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComprasTable;