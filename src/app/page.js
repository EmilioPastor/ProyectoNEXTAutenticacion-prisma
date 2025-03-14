import Link from "next/link";
import { auth } from "@/auth";
import { ShoppingCart, Truck, Pizza } from "lucide-react";
export default async function Home() {
  const session = await auth();

  return (
    <div className="ml-64 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12 bg-cyan-900">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-amber-50 mb-4 transform transition-all duration-300 hover:scale-105">
          <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            PIZZERIA CON AUTENTICACIÓN DE USUARIOS
          </span>
        </h1>
      </header>

      <section className="space-y-8">
        <h2 className="bg-blacktext-3xl font-semibold text-amber-100 border-l-4 border-amber-400 pl-4">Acciones rápidas</h2>

        {session?.user?.role === "ADMIN" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AdminLink href="/admin" icon={<ShoppingCart />} title="Panel de Admin" />
            <AdminLink href="/dashboard" icon={<Pizza />} title="Dashboard" />
            <AdminLink href="/repartidores" icon={<Truck />} title="Repartidores" color="bg-amber-700" />
            <AdminLink href="/pedidos" icon={<ShoppingCart />} title="Pedidos" color="bg-red-700" />
            <AdminLink href="/pizzas" icon={<Pizza />} title="Pizzas" color="bg-amber-800" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UserLink href="/repartidores" icon={<Truck />} title="Repartidores" />
            <UserLink href="/pizzas" icon={<Pizza />} title="Nuestras Pizzas" />
          </div>
        )}
      </section>
    </div>
  );
}

function AdminLink({ href, icon, title, color = "bg-amber-600", simple = false }) {
  return (
    <Link
      href={href}
      className={`group relative p-6 rounded-xl ${color} text-amber-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        simple ? "bg-red-950/30 hover:bg-red-950/50 text-amber-200" : ""
      } shadow-md hover:shadow-amber-900/50`}
    >
      <div className="flex items-center space-x-4">
        {!simple && <span className="p-2 bg-amber-200/10 rounded-lg">{icon}</span>}
        <span className="text-lg font-semibold">{title}</span>
      </div>
      {!simple && (
        <div className="absolute inset-0 border-2 border-amber-200/10 rounded-xl group-hover:border-amber-200/20 transition-colors" />
      )}
    </Link>
  );
}

function UserLink({ href, icon, title }) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center p-8 bg-red-800/30 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-amber-900/50 hover:border-amber-800/70 backdrop-blur-sm"
    >
      <div className="mb-4 p-4 bg-amber-200/10 rounded-full text-amber-300 group-hover:bg-amber-200/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-amber-100 group-hover:text-amber-300 transition-colors">
        {title}
      </h3>
    </Link>
  );
}