import { obtenerRepartidores } from "@/lib/data";
import Link from "next/link";
import Modal from "@/components/modal";
import RepartidorInsertar from "./insertar";
import RepartidorModificar from "./modificar";
import RepartidorEliminar from "./eliminar";

export default async function Repartidores() {
    const repartidores = await obtenerRepartidores()

    return (
        <div className="ml-64 p-8 flex flex-col gap-6 max-w-4xl">
            <Modal 
                openElement={
                    <p className="inline-block px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-amber-50 cursor-pointer transition-all font-semibold shadow-md hover:shadow-amber-900/50">
                        Insertar
                    </p>
                }>
                <RepartidorInsertar />
            </Modal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repartidores.map(repartidor => (
                    <div key={repartidor.id} className="p-6 bg-red-900/20 rounded-xl border-2 border-amber-900/50 backdrop-blur-sm">
                        <div className="flex flex-col gap-4">
                            <Link 
                                href={`/repartidores/${repartidor.id}`} 
                                className="text-2xl font-bold text-amber-300 hover:text-amber-400 transition-colors cursor-pointer"
                            >
                                {repartidor.nombre}
                            </Link>
                            
                            <p className="text-amber-100/80">Teléfono: {repartidor.telefono}</p>

                            <div className="flex gap-3 mt-4">
                                <Modal 
                                    openElement={
                                        <span className="px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-amber-100 cursor-pointer transition-colors">
                                            Modificar
                                        </span>
                                    }>
                                    <RepartidorModificar repartidor={repartidor} />
                                </Modal>

                                <Modal 
                                    openElement={
                                        <span className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-amber-100 cursor-pointer transition-colors">
                                            Eliminar
                                        </span>
                                    }>
                                    <RepartidorEliminar repartidor={repartidor} />
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