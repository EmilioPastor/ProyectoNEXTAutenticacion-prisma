'use client'
import { useActionState } from 'react'
import { register } from '@/lib/actions'


function RegisterForm({ className }) {

    const [state, action, pending] = useActionState(register, {})

    return (
        <form action={action} className={className}>
            <h1 className="text-3xl font-bold mb-4">Registro</h1>
            <div className='flex flex-col gap-4'>
                <label>Nombre
                    <input type='text'
                        name='name'
                        defaultValue={state.fields?.name || ''}
                        placeholder="John Doe"
                        className='block w-full'
                        required
                    />
                </label>
                <label>Email
                    <input type='email'
                        name='email'
                        defaultValue={state.fields?.email || ''}
                        placeholder="john.doe@example.com"
                        className='peer block w-full'
                    />
                    <p className="invisible peer-invalid:visible text-red-300">
                        Por favor, introduce un email válido.
                    </p>
                </label>
                <label>Password
                    <input type="password"
                        name='password'
                        defaultValue={state.fields?.password || ''}
                        placeholder="******"
                        className='block w-full'
                    />
                </label>

                <button type="submit" disabled={pending} className="px-4 py-2 bg-blue-300 disabled:bg-slate-300 disabled:animate-pulse" >
                    {pending ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
                <p className={state?.success ? 'text-green-500' : 'hidden'}> {state.success} </p>
                <p className={state?.error ? 'text-red-500' : 'hidden'}> {state.error} </p>
            </div>


        </form>
    )
}

export default RegisterForm