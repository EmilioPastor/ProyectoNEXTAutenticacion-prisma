import Pizzas from "@/components/pizzas/lista";
import Link from "next/link";
import { Suspense } from "react";


function PaginaPizzas() {

    return (
        <div className="bg-cyan-900">
            <Link href="/" className="text-5xl">🏡</Link>

            <Suspense fallback={"Obteniendo pizza ..."}>
                <Pizzas />
            </Suspense>         
        </div>
    )

}

export default PaginaPizzas;

