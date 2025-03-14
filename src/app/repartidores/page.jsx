import Repartidores from "@/components/repartidores/lista";
import Link from "next/link";
import { Suspense } from "react";


function PaginaRepartidores() {

    return (
        <div className=" bg-cyan-900">
            <Link href="/" className="text-5xl">🏡</Link>

            <Suspense fallback={"Obteniendo repartidore ..."}>
                <Repartidores />
            </Suspense>
        </div>
    )

}

export default PaginaRepartidores;

