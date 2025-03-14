'use server'
import bcrypt from 'bcryptjs'
import  prisma  from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { revalidatePath } from 'next/cache'


// REGISTER
export async function register(prevState, formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario ya está registrado
    const user = await getUserByEmail(email);

    if (user) {
        return {
            error: 'El email ya está registrado',
            fields: Object.fromEntries(formData.entries())
        }
    }

    // Encriptamos password 
    const hashedPassword = await bcrypt.hash(password, 10)

    // Guardamos credenciales en base datos
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "Registro correcto" }
}



// LOGIN credentials
export async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario está registrado
    const user = await getUserByEmail(email);

    if (!user) {
        return {
            error: 'Usuario no registrado.',
            fields: Object.fromEntries(formData.entries())
        }
    }

    // Comparamos password 
    const matchPassword = await bcrypt.compare(password, user.password)

    if (user && matchPassword) {  // && user.emailVerified
        await signIn('credentials',
            {
                email, password,
                redirectTo: globalThis.callbackUrl
            })
        return { success: "Inicio de sesión correcto" }
    } else {
        return {
            error: 'Credenciales incorrectas.',
            fields: Object.fromEntries(formData.entries())
        }
    }

}

// LOGIN google
export async function loginGoogle() {
    try {
        await signIn('google', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}

// LOGIN github
export async function loginGithub() {
    try {
        await signIn('github', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}


// LOGIN discord
export async function loginDiscord() {
    try {
        await signIn('discord', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}


// LOGIN resend (Magic Link to email)
export async function loginResend(formData) {
    try {
        await signIn("resend", formData)
    } catch (error) {
        console.log(error);
        throw error
    }
}



// LOGOUT
export async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (error) {
        throw error
    }
}

export async function insertarRepartidor(formData) {
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')
    const imagen = formData.get('imagen') || null

    await prisma.repartidor.create({
        data: {
            nombre: nombre,
            telefono: telefono,
            imagen: imagen
        }
    })

    revalidatePath('/repartidores')

}


export async function modificarRepartidor(formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')
    const imagen = formData.get('imagen')


    await prisma.repartidor.update({
        where: {
            id: id
        },
        data: {
            nombre: nombre,
            telefono: telefono,
            imagen: imagen
        }
    })

    revalidatePath('/repartidores')
}



export async function eliminarRepartidor(formData) {
    const id = Number(formData.get('id'))

    await prisma.repartidor.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/repartidores')

}


//  ------------------------ PEDIDOS ------------------------


export async function insertarPedido(prevState, formData) {
    const fecha_hora = new Date(formData.get('fecha_hora'))
    const nombre_cliente = formData.get('nombre_cliente')
    const direccion_cliente = formData.get('direccion_cliente')

    const repartidorId = Number(formData.get('repartidorId')) || null

    const pizzasIDs = await prisma.pizza.findMany({
        select: { id: true }
    })

    const connect = pizzasIDs.filter(p => formData.get(`pizza${p.id}`) !== null)
 

    await prisma.pedido.create({
        data: {
            fecha_hora: fecha_hora,
            nombre_cliente: nombre_cliente,
            direccion_cliente: direccion_cliente,
            repartidorId: repartidorId,
            pizzas: { connect }
        }
    })

    revalidatePath('/pedidos')
    return { success: 'Operación realizada correctamente' }

}



export async function modificarPedido(prevState, formData) {
    const id = Number(formData.get('id'))
    const fecha_hora = new Date(formData.get('fecha_hora'))
    const nombre_cliente = formData.get('nombre_cliente')
    const direccion_cliente = formData.get('direccion_cliente')

    const repartidorId = Number(formData.get('repartidorId')) || null

    const pizzasIDs = await prisma.pizza.findMany({
        select: { id: true }
    })
    // console.log(pizzasIDs);
    const connect = pizzasIDs.filter(p => formData.get(`pizza${p.id}`) !== null)
    const disconnect = pizzasIDs.filter(p => formData.get(`pizza${p.id}`) === null)
    // console.log(connect);

    await prisma.pedido.update({
        where: {
            id: id
        },
        data: {
            fecha_hora: fecha_hora,
            nombre_cliente: nombre_cliente,
            direccion_cliente: direccion_cliente,
            repartidorId: repartidorId,
            pizzas: { connect, disconnect }
        }
    })

    revalidatePath('/pedidos')
    return { success: 'Operación realizada correctamente' }
}



export async function eliminarPedido(prevState, formData) {
    const id = Number(formData.get('id'))

    await prisma.pedido.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/pedidos')
    return { success: 'Operación realizada correctamente' }

}

// ------------------------------- PIZZAS -----------------------


export async function insertarPizza(formData) {
    const nombre = formData.get('nombre')
    const precio = Number(formData.get('precio'))
    const imagen = formData.get('imagen')


    await prisma.pizza.create({
        data: {
            nombre: nombre,
            precio: precio,
        }
    })

    revalidatePath('/pizzas')
    return { success: 'Éxito al realizar la operación' }

}



export async function modificarPizza(formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const precio = Number(formData.get('precio'))
    const imagen = formData.get('imagen')
    
    await prisma.pizza.update({
        where: {
            id: id
        },
        data: {
            nombre: nombre,
            precio: precio,
            imagen: imagen
        }
    })

    revalidatePath('/pizzas')
}



export async function eliminarPizza(formData) {
    const id = Number(formData.get('id'))

    await prisma.pizza.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/pizzas')

}


