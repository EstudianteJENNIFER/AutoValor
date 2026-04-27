import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, ShoppingCart, CreditCard, Home, Boxes,
  Wrench, Bell, FileText, UserCog, BarChart3,
  Sun, Moon,
} from "lucide-react";
import LOGO from "../../assets/image.png";
export default function Sidebar({ setPage, dark, setDark }: any) {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Inicio", icon: Home },
    { name: "Clientes", icon: Users },
    { name: "Compras", icon: ShoppingCart },
    { name: "Financiamiento", icon: CreditCard },
    { name: "Inventario", icon: Boxes },
    { name: "Mantenimiento", icon: Wrench },
    { name: "Notificaciones", icon: Bell },
    { name: "Reportes", icon: FileText },
    { name: "Usuarios", icon: UserCog },
    { name: "Ventas", icon: BarChart3 },
  ];

  return (
    <motion.div
  onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => setOpen(false)}
  animate={{
    width: open ? 220 : 70,
  }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
  className="h-screen flex flex-col justify-between shadow-lg
  bg-slate-100 dark:bg-slate-950
  text-cyan-600 dark:text-cyan-400
  transition-colors duration-300"
>
      <div>
        {/* HEADER */}
        <div className="flex items-center gap-2 p-4">
          <img src={LOGO} className="w-8 h-8 rounded-full" alt="Logo" />
          {open && (
            <span className="font-bold text-cyan-400 transition-colors duration-300">
  Mi Sistema
</span>
          )}
        </div>

        {/* MENU */}
        <ul className="mt-4 space-y-2">
          {menu.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={index}
                onClick={() => setPage(item.name)}
                className="flex items-center gap-3 px-4 py-2 cursor-pointer 
                           transition-colors duration-300
                           hover:bg-gray-300 dark:hover:bg-cyan-500/20"
              >
                <Icon size={20} />
                {open && <span>{item.name}</span>}
              </li>
            );
          })}
        </ul>
      </div>

      {/* DARK MODE */}
      <div className="p-4">
        <button
  onClick={() => setDark(!dark)}
  className="flex items-center gap-2 w-full hover:bg-gray-300 dark:hover:bg-cyan-500/20 p-2 rounded transition"
>
  <motion.div
    key={dark ? "sun" : "moon"}
    initial={{ rotate: -90, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    exit={{ rotate: 90, opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {dark ? <Sun size={20} /> : <Moon size={20} />}
  </motion.div>

  {open && <span>{dark ? "Claro" : "Oscuro"}</span>}
</button>
      </div>
    </motion.div>
  );
}