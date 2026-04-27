import { useState, useEffect } from "react";
import Sidebar from "./components/common/sidebar";

// IMPORTAR PÁGINAS
import Clientes from "./components/pages/clientes";
import Compras from "./components/pages/compras";
import Inicio from "./components/pages/inicio";
import Inventario from "./components/pages/inventario";
import Ventas from "./components/pages/ventas";
import MantenimientoSoporte from "./components/pages/mantenimientosoporte";
import Usuarios from "./components/pages/usuarios";
import Notificaciones from "./components/pages/notificaciones";
import Reportes from "./components/pages/reportes";
import Financiamiento from "./components/pages/financiamiento";

function App() {
  const [page, setPage] = useState("Inicio");

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  localStorage.setItem("theme", dark ? "dark" : "light");
}, [dark]);

  const renderPage = () => {
    switch (page) {
      case "Clientes":
        return <Clientes />;
      case "Compras":
        return <Compras />;
      case "Inventario":
        return <Inventario />;
      case "Ventas":
        return <Ventas />;
      case "Mantenimiento":
        return <MantenimientoSoporte />;
      case "Usuarios":
        return <Usuarios />;
      case "Notificaciones":
        return <Notificaciones />;
      case "Reportes":
        return <Reportes />;
      case "Financiamiento":
        return <Financiamiento />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <Sidebar setPage={setPage} dark={dark} setDark={setDark} />

      <main
        className="
          flex-1 overflow-y-auto
          text-gray-900 dark:text-white
          bg-gray-50 dark:bg-zinc-900
          transition-colors duration-300
        "
      >
        {renderPage()}
      </main>
    </div>
  );
}

export default App;