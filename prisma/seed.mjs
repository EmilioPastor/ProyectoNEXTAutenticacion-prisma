import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const repartidores = [
    { id: 1, nombre: 'Emilio', telefono: '600000000' },
    { id: 2, nombre: 'Pedro', telefono: '611111111' },
    { id: 3, nombre: 'Jorge', telefono: '622222222' }
]

const pizzas = [
    { id: 1, nombre: 'York', precio: 12.00 },
    { id: 2, nombre: 'Margarita', precio: 10.50 },
    { id: 3, nombre: 'Jamómn', precio: 12.50 },
    { id: 4, nombre: '4 quesos', precio: 14.50 },
]

const pedidos = [
    {
        id: 1, fecha_hora: '2024-06-01T20:00:05.000Z', nombre_cliente: 'Gloria', direccion_cliente: 'C/ Nueva, 1',
        repartidorId: 2,
        pizzas: {
            connect: [{ id: 1 }, { id: 3 }, { id: 4 }]
        }
    },
    {
        id: 2, fecha_hora: '2024-06-01T20:12:05.000Z', nombre_cliente: 'Isabel', direccion_cliente: 'C/ Nueva, 2',
        repartidorId: 3,
        pizzas: {
            connect: [{ id: 2 }, { id: 4 }]
        }
    },
]


// Eliminar contenido de las tablas
const resetDatabase = async () => {
    await prisma.pedido.deleteMany();
    await prisma.repartidor.deleteMany();
    await prisma.pizza.deleteMany();
};


const load = async () => {
    try {
        // reset database
        await resetDatabase();

        await prisma.repartidor.createMany({ data: repartidores });
        console.log(`Repartidores insertados`);

        await prisma.pizza.createMany({ data: pizzas });
        console.log(`Pizzas insertadas`);

        pedidos.forEach(async pedido => {
            await prisma.pedido.create({ data: pedido });
        })
        console.log(`Pedidos insertados`);

    } catch (error) {
        console.error("Error al insertar datos:", error);
    } finally {
        await prisma.$disconnect();
    }
};


load();