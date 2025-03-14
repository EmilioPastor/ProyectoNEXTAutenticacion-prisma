import Link from 'next/link';
import { auth } from "@/auth";
import { logout } from '@/lib/actions';
import { Home, User, Shield, Utensils, Truck, Info, LogIn, LogOut } from 'lucide-react';

async function Sidebar() {
    const session = await auth();
    
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-red-800 to-amber-900 text-white shadow-xl rounded-r-xl p-6 flex flex-col">
            <nav className="flex-1 space-y-4">
                <Link href="/" className="flex items-center gap-3 group mb-8">
                    <Home className="h-7 w-7 text-amber-200 group-hover:text-white transition-colors" />
                    <span className="font-bold text-xl">Pizzeria Autenticada</span>
                </Link>
                
                <div className="space-y-2 border-t border-amber-200/20 pt-4">
                    {session?.user?.role === 'ADMIN' && (
                        <Link href="/admin" className="flex items-center gap-3 hover:bg-amber-200/10 p-3 rounded-lg transition-all">
                            <Shield className="h-5 w-5" />
                            <span>Admin</span>
                        </Link>
                    )}
                    {session?.user?.role === 'USER' && (
                        <Link href="/dashboard" className="flex items-center gap-3 hover:bg-amber-200/10 p-3 rounded-lg transition-all">
                            <User className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                    )}
                    <Link href="/pizzas" className="flex items-center gap-3 hover:bg-amber-200/10 p-3 rounded-lg transition-all">
                        <Utensils className="h-5 w-5" />
                        <span>Pizzas</span>
                    </Link>
                    <Link href="/repartidores" className="flex items-center gap-3 hover:bg-amber-200/10 p-3 rounded-lg transition-all">
                        <Truck className="h-5 w-5" />
                        <span>Repartidores</span>
                    </Link>
                    {session?.user?.role === 'ADMIN' && (
                        <Link href="/pedidos" className="flex items-center gap-3 hover:bg-amber-200/10 p-3 rounded-lg transition-all">
                            <LogOut className="h-5 w-5 rotate-180" />
                            <span>Pedidos</span>
                        </Link>
                    )}
                </div>
            </nav>

            <div className="border-t border-amber-200/20 pt-4">
                {session ? (
                    <form>
                        <button 
                            formAction={logout} 
                            className="w-full flex items-center gap-3 hover:bg-amber-200/10 p-3 rounded-lg transition-all group"
                        >
                            <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span>Logout</span>
                        </button>
                    </form>
                ) : (
                    <Link 
                        href="/auth/login" 
                        className="flex items-center gap-3 bg-amber-200 hover:bg-amber-300 text-red-900 p-3 rounded-lg transition-all group"
                    >
                        <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <span>Login</span>
                    </Link>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;