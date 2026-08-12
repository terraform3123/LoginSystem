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

    async function getUsers() {
        const response = await api.get("/")

        console.log(response.data)
        setUsers((prevUsers) => [...prevUsers, response.data])
        console.log(users)
        return response.data
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
                    <form>
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder='example@gmail.com' />

                        <label className="form-label">Password</label>
                        <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} className="form-control" placeholder='12345678' />
                    </form>
                </div>
                <div className="footerLogin">
                    <button type="submit">Login</button>
                </div>
                <div className="listUsers">
                    {users.map((user) => (
                        <div key={user.id}>
                            <p>email: {user.email}</p>
                            <p>senha: {user.senha}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}