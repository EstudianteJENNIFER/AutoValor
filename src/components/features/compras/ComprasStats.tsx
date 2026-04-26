const ComprasStats = () => {
  const stats = [
    { title: "Inversión", value: "$428,500" },
    { title: "Unidades", value: "24" },
    { title: "Pendientes", value: "8" },
    { title: "Proveedores", value: "12" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm"
        >
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {stat.title}
          </p>
          <h2 className="text-xl font-bold">{stat.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default ComprasStats;