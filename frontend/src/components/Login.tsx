import { useEffect, useState } from 'react'
import React from '../assets/react.svg'
import api from '../services/api'

interface User {
    id: number;
    email: string;
    senha: string;
}

export function Login() {
    const [users, setUsers] = useState<User[]>([])
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [isLogged, setIsLogged] = useState<boolean>(false)

    async function loginUsers() {
        const response = await api.post("/login", {
            email: email,
            senha: senha,
        })

        console.log(response.data)
        setIsLogged(true)
        setEmail("")
        setSenha("")
    }

    async function getUsers() {
        const response = await api.get<User[]>("/")

        setUsers(response.data)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <div className="card">
                <div className="loginHeader">
                    <img src={React} alt="React Logo" />
                    <p>WELCOME BACK!</p>
                    <p>Sign in to your account</p>
                </div>
                <div className="contentLogin">
                    <form onSubmit={loginUsers}>
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder='example@gmail.com' />

                        <label className="form-label">Password</label>
                        <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} className="form-control" placeholder='12345678' />
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div className="footerLogin">
                </div>

            </div>
            <div className="listUsers">
                {isLogged ? "Sim" : "Nao"}
                {users.map((user) => (
                    <div key={user.id}>
                        <p>{user.email}</p>
                        <p>{user.senha}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}