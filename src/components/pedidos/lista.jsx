import { obtenerPedidos, obtenerPizzas, obtenerRepartidores } from "@/lib/data";
import Link from "next/link";
import Modal from "@/components/modal";
import PedidoInsertar from "./insertar";
import PedidoModificar from "./modificar";
import PedidoEliminar from "./eliminar";

export default async function Pedidos() {
    const pedidos = await obtenerPedidos()
    const repartidores = await obtenerRepartidores()
    const pizzas = await obtenerPizzas()

    return (
        <div className="ml-64 p-8 flex flex-col gap-6 max-w-4xl">
            <Modal 
                openElement={
                    <p className="inline-block px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-amber-50 cursor-pointer transition-all font-semibold shadow-md hover:shadow-amber-900/50">
                        Insertar
                    </p>
                }>
                <PedidoInsertar repartidores={repartidores} pizzas={pizzas} />
            </Modal>

            <div className="grid grid-cols-1 gap-6">
                {pedidos.map(pedido => (
                    <div key={pedido.id} className="p-6 bg-red-900/20 rounded-xl border-2 border-amber-900/50 backdrop-blur-sm">
                        <div className="flex flex-col gap-3">
                            <Link 
                                href={`/pedidos/${pedido.id}`} 
                                className="text-xl font-bold text-amber-300 hover:text-amber-400 transition-colors"
                            >
                                {new Date(pedido.fecha_hora).toLocaleString()}
                            </Link>
                            
                            <div className="space-y-2 text-amber-100/80">
                                <p>Cliente: {pedido.nombre_cliente}</p>
                                <p>Dirección: {pedido.direccion_cliente}</p>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <Modal 
                                    openElement={
                                        <span className="px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-amber-100 cursor-pointer transition-colors">
                                            Modificar
                                        </span>
                                    }>
                                    <PedidoModificar pedido={pedido} repartidores={repartidores} pizzas={pizzas} />
                                </Modal>

                                <Modal 
                                    openElement={
                                        <span className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-amber-100 cursor-pointer transition-colors">
                                            Eliminar
                                        </span>
                                    }>
                                    <PedidoEliminar pedido={pedido} />
                                </Modal>
                            </div>
                        </div>
                        <hr className="my-4 border-amber-900/30" />
                    </div>
                ))}
            </div>
        </div>
    );
}