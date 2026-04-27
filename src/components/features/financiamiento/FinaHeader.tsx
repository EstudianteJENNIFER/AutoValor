import { Search, Bell, Settings } from "lucide-react";

export default function FinaHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4 px-4 py-2 rounded-xl w-[400px]
        bg-white dark:bg-[#111]">

        <Search size={18} className="text-gray-400" />

        <input
          placeholder="Buscar acuerdos..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="text-gray-400" />
        <Settings className="text-gray-400" />
      </div>
    </div>
  );
}