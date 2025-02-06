import { insertarPedido } from "@/lib/actions";

function PedidoInsertar({ repartidores, pizzas }) {
    return (
        <form action={insertarPedido}>
            <input name="fecha_hora" type="datetime-local" />
            <input name="nombre_cliente" placeholder="Nombre cliente" />
            <input name="direccion_cliente" placeholder="Dirección cliente" />

            <select name="repartidorId">
                {
                    repartidores.map(repartidor =>
                        <option key={repartidor.id} value={repartidor.id}>
                            {repartidor.nombre}
                        </option>
                    )
                }
            </select>


            {
                pizzas.map(pizza =>
                    <label key={pizza.id}>
                        <input
                            type="checkbox"
                            name={`pizza${pizza.id}`} />

                        {pizza.nombre}

                    </label>
                )
            }

            <button className="border-2 border-black">Insertar pedido</button>
        </form>

    );
}

export default PedidoInsertar;