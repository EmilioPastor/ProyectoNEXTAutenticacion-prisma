import { obtenerPizzas } from "@/lib/data";
import Link from "next/link";
import Modal from "@/components/modal";
import PizzaInsertar from "./insertar";
import PizzaModificar from "./modificar";
import PizzaEliminar from "./eliminar";

export default async function Pizzas() {
    const pizzas = await obtenerPizzas()

    return (
        <div className="ml-64 p-8 flex flex-col gap-6 max-w-4xl">
            <Modal 
                openElement={
                    <p className="inline-block px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-amber-50 cursor-pointer transition-all font-semibold shadow-md hover:shadow-amber-900/50">
                        Insertar
                    </p>
                }>
                <PizzaInsertar />
            </Modal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pizzas.map(pizza => (
                    <div key={pizza.id} className="p-6 bg-red-900/20 rounded-xl border-2 border-amber-900/50 backdrop-blur-sm">
                        <div className="flex flex-col gap-4">
                            <Link 
                                href={`/pizzas/${pizza.id}`} 
                                className="text-2xl font-bold text-amber-300 hover:text-amber-400 transition-colors cursor-pointer"
                            >
                                {pizza.nombre}
                            </Link>
                            <p className="text-amber-100/80 text-lg">{pizza.precio} €</p>

                            <div className="flex gap-3 mt-2">
                                <Modal 
                                    openElement={
                                        <span className="px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-amber-100 cursor-pointer transition-colors">
                                            Modificar
                                        </span>
                                    }>
                                    <PizzaModificar pizza={pizza} />
                                </Modal>

                                <Modal 
                                    openElement={
                                        <span className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-amber-100 cursor-pointer transition-colors">
                                            Eliminar
                                        </span>
                                    }>
                                    <PizzaEliminar pizza={pizza} />
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